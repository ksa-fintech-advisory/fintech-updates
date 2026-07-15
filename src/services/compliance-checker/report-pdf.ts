/**
 * CMA Compliance Assessment — PDF report generator
 *
 * Builds a real, text-based, multi-page A4 PDF with jsPDF (selectable text,
 * proper pagination, bilingual EN/AR via the embedded Tajawal font).
 *
 * Arabic: jsPDF's built-in shaper substitutes presentation-form codepoints
 * and its bidi engine handles RTL ordering, so text must be passed in logical
 * order WITHOUT the R2L option. The embedded "-Report" Tajawal variants are
 * patched (scripts/patch-tajawal-report-fonts.py) to cover the isolated
 * presentation forms the stock font lacks — with the stock files jsPDF
 * silently drops characters like standalone alef. The one thing the bidi
 * engine does not do is mirror brackets, so bracket pairs that don't wrap
 * Latin text are swapped before rendering.
 */

import jsPDF from 'jspdf';
import type {
  AssessmentResult,
  ModuleScore,
  ComplianceGap,
  Recommendation,
  SelectedActivities,
} from './assessment-types';
import { getActivityLabels } from './assessment-engine';

// ============================================
// Layout constants (A4 portrait, points)
// ============================================

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_LIMIT = PAGE_H - 72; // keep clear of the footer

// Palette (matches the product UI)
const INK: RGB = [24, 24, 27];
const SUB: RGB = [82, 82, 91];
const FAINT: RGB = [161, 161, 170];
const LINE: RGB = [228, 228, 231];
const EMERALD: RGB = [5, 150, 105];
const AMBER: RGB = [217, 119, 6];
const RED: RGB = [220, 38, 38];
const EMERALD_BG: RGB = [236, 253, 245];
const AMBER_BG: RGB = [255, 251, 235];
const RED_BG: RGB = [254, 242, 242];
const HEADER_BG: RGB = [9, 9, 11];

type RGB = [number, number, number];

// ============================================
// Font loading (Tajawal supports Arabic + Latin)
// ============================================

let fontCache: { regular: string; bold: string } | null = null;

async function fetchFontBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load font ${url}: ${res.status}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

async function loadFonts(): Promise<{ regular: string; bold: string }> {
  if (fontCache) return fontCache;
  const [regular, bold] = await Promise.all([
    fetchFontBase64('/fonts/Tajawal/Tajawal-Regular-Report.ttf'),
    fetchFontBase64('/fonts/Tajawal/Tajawal-Bold-Report.ttf'),
  ]);
  fontCache = { regular, bold };
  return fontCache;
}

// ============================================
// RTL helpers
// ============================================

const ARABIC_RE = /[؀-ۿ]/;

/**
 * jsPDF's bidi engine reorders RTL text but does not mirror bracket glyphs.
 * Swap bracket pairs unless they enclose Latin text (those resolve LTR and
 * render correctly as-is).
 */
function fixArabicLine(line: string): string {
  return line
    .replace(/\(([^()]*)\)/g, (match, inner) =>
      /[A-Za-z]/.test(inner) ? match : `)${inner}(`,
    )
    .replace(/\[([^[\]]*)\]/g, (match, inner) =>
      /[A-Za-z]/.test(inner) ? match : `]${inner}[`,
    );
}

// ============================================
// Report writer
// ============================================

interface TextOptions {
  size?: number;
  bold?: boolean;
  color?: RGB;
  maxWidth?: number;
  indent?: number;
  lineGap?: number;
  spaceAfter?: number;
}

class ReportWriter {
  doc: jsPDF;
  y = MARGIN;
  private readonly rtl: boolean;

  constructor(doc: jsPDF, rtl: boolean) {
    this.doc = doc;
    this.rtl = rtl;
  }

  ensure(height: number) {
    if (this.y + height > BOTTOM_LIMIT) {
      this.doc.addPage();
      this.y = MARGIN;
    }
  }

  private setFont(size: number, bold: boolean, color: RGB) {
    this.doc.setFont('Tajawal', bold ? 'bold' : 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(color[0], color[1], color[2]);
  }

  /** Draw a single line at an absolute position (no cursor advance). */
  lineAt(str: string, x: number, y: number, opts: TextOptions & { align?: 'left' | 'right' | 'center' } = {}) {
    this.setFont(opts.size ?? 10, opts.bold ?? false, opts.color ?? INK);
    this.doc.text(ARABIC_RE.test(str) ? fixArabicLine(str) : str, x, y, {
      align: opts.align ?? (this.rtl ? 'right' : 'left'),
      baseline: 'top',
    });
  }

  /** Write a wrapped paragraph at the cursor and advance it. */
  paragraph(str: string, opts: TextOptions = {}) {
    const size = opts.size ?? 10;
    const lineH = size * (opts.lineGap ?? 1.55);
    const maxWidth = (opts.maxWidth ?? CONTENT_W) - (opts.indent ?? 0);
    this.setFont(size, opts.bold ?? false, opts.color ?? INK);
    const lines: string[] = this.doc.splitTextToSize(str, maxWidth);
    const x = this.rtl ? PAGE_W - MARGIN - (opts.indent ?? 0) : MARGIN + (opts.indent ?? 0);
    for (const line of lines) {
      this.ensure(lineH);
      this.lineAt(line, x, this.y, { size, bold: opts.bold, color: opts.color });
      this.y += lineH;
    }
    this.y += opts.spaceAfter ?? 0;
  }

  /** Numbered section heading with an underline rule. */
  heading(text: string) {
    this.ensure(46);
    this.y += 10;
    this.paragraph(text, { size: 13, bold: true, color: INK });
    this.doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    this.doc.setLineWidth(0.8);
    this.doc.line(MARGIN, this.y + 1, PAGE_W - MARGIN, this.y + 1);
    this.y += 14;
  }

  /** Small filled chip; returns nothing, does not advance the cursor. */
  chipAt(label: string, x: number, y: number, fg: RGB, bg: RGB, align: 'left' | 'right') {
    this.setFont(7.5, true, fg);
    const w = this.doc.getTextWidth(ARABIC_RE.test(label) ? label : label) + 12;
    const boxX = align === 'right' ? x - w : x;
    this.doc.setFillColor(bg[0], bg[1], bg[2]);
    this.doc.roundedRect(boxX, y, w, 13, 3, 3, 'F');
    this.lineAt(label, boxX + w / 2, y + 3.2, { size: 7.5, bold: true, color: fg, align: 'center' });
  }

  /** Horizontal progress bar. */
  bar(x: number, y: number, width: number, percent: number, color: RGB) {
    this.doc.setFillColor(228, 228, 231);
    this.doc.roundedRect(x, y, width, 5, 2.5, 2.5, 'F');
    if (percent > 0) {
      this.doc.setFillColor(color[0], color[1], color[2]);
      this.doc.roundedRect(x, y, Math.max(5, (width * Math.min(percent, 100)) / 100), 5, 2.5, 2.5, 'F');
    }
  }
}

// ============================================
// Localized label helpers
// ============================================

function scoreColor(score: number): RGB {
  return score >= 80 ? EMERALD : score >= 50 ? AMBER : RED;
}

function scoreBg(score: number): RGB {
  return score >= 80 ? EMERALD_BG : score >= 50 ? AMBER_BG : RED_BG;
}

function statusLabel(status: 'compliant' | 'partial' | 'non_compliant', ar: boolean): string {
  const labels = {
    compliant: { en: 'Compliant', ar: 'ملتزم' },
    partial: { en: 'Partially compliant', ar: 'ملتزم جزئياً' },
    non_compliant: { en: 'Non-compliant', ar: 'غير ملتزم' },
  };
  return labels[status][ar ? 'ar' : 'en'];
}

function severityLabel(severity: string, ar: boolean): string {
  const labels: Record<string, { en: string; ar: string }> = {
    High: { en: 'High risk', ar: 'مخاطر عالية' },
    Medium: { en: 'Medium risk', ar: 'مخاطر متوسطة' },
    Low: { en: 'Low risk', ar: 'مخاطر منخفضة' },
  };
  return (labels[severity] ?? { en: severity, ar: severity })[ar ? 'ar' : 'en'];
}

function severityColor(severity: string): { fg: RGB; bg: RGB } {
  if (severity === 'High') return { fg: RED, bg: RED_BG };
  if (severity === 'Medium') return { fg: AMBER, bg: AMBER_BG };
  return { fg: SUB, bg: [244, 244, 245] };
}

function priorityLabel(priority: 'high' | 'medium' | 'low', ar: boolean): string {
  const labels = {
    high: { en: 'High priority', ar: 'أولوية عالية' },
    medium: { en: 'Medium priority', ar: 'أولوية متوسطة' },
    low: { en: 'Low priority', ar: 'أولوية منخفضة' },
  };
  return labels[priority][ar ? 'ar' : 'en'];
}

function effortLabel(effort: 'high' | 'medium' | 'low', ar: boolean): string {
  const labels = {
    high: { en: 'High', ar: 'مرتفع' },
    medium: { en: 'Medium', ar: 'متوسط' },
    low: { en: 'Low', ar: 'منخفض' },
  };
  return labels[effort][ar ? 'ar' : 'en'];
}

// ============================================
// Sections
// ============================================

function drawCoverHeader(
  w: ReportWriter,
  result: AssessmentResult,
  ar: boolean,
  isPartial: boolean,
  coveragePercent: number,
) {
  const doc = w.doc;
  const bandH = 118;
  doc.setFillColor(HEADER_BG[0], HEADER_BG[1], HEADER_BG[2]);
  doc.rect(0, 0, PAGE_W, bandH, 'F');

  const startX = ar ? PAGE_W - MARGIN : MARGIN;
  w.lineAt(ar ? 'مدقق الامتثال — هيئة السوق المالية' : 'CMA COMPLIANCE CHECKER', startX, 26, {
    size: 8.5,
    bold: true,
    color: [52, 211, 153],
  });
  w.lineAt(
    ar
      ? isPartial
        ? 'مسودة تقرير تقييم الامتثال'
        : 'تقرير تقييم الامتثال النهائي'
      : isPartial
        ? 'Draft Compliance Assessment Report'
        : 'Final Compliance Assessment Report',
    startX,
    42,
    { size: 20, bold: true, color: [255, 255, 255] },
  );

  const generated = new Date(result.completedAt);
  const dateStr = generated.toLocaleDateString(ar ? 'ar-u-nu-latn-ca-gregory' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  w.lineAt(
    ar
      ? `تاريخ الإصدار: ${dateStr}  ·  تغطية النطاق: ${coveragePercent}%  ·  ${result.answeredQuestions} من ${result.totalQuestions} بنداً`
      : `Generated: ${dateStr}  ·  Scope coverage: ${coveragePercent}%  ·  ${result.answeredQuestions} of ${result.totalQuestions} checks`,
    startX,
    76,
    { size: 9, color: [161, 161, 170] },
  );

  if (isPartial) {
    w.lineAt(
      ar
        ? 'تنبيه: هذا تقرير جزئي — لم تكتمل جميع وحدات التدقيق بعد.'
        : 'Note: this is a partial report — not all audit modules have been completed.',
      startX,
      92,
      { size: 8.5, bold: true, color: [252, 211, 77] },
    );
  }

  w.y = bandH + 24;
}

function drawSummary(w: ReportWriter, result: AssessmentResult, ar: boolean) {
  const doc = w.doc;
  w.heading(ar ? '١. الملخص التنفيذي' : '1. Executive summary');

  // Score block: big number + status chip
  const blockTop = w.y;
  const color = scoreColor(result.overallScore);
  const scoreX = ar ? PAGE_W - MARGIN : MARGIN;
  doc.setFont('Tajawal', 'bold');
  doc.setFontSize(42);
  doc.setTextColor(color[0], color[1], color[2]);
  doc.text(`${result.overallScore}%`, scoreX, blockTop, {
    align: ar ? 'right' : 'left',
    baseline: 'top',
  });
  const scoreW = doc.getTextWidth(`${result.overallScore}%`);

  const chipX = ar ? PAGE_W - MARGIN - scoreW - 14 : MARGIN + scoreW + 14;
  w.chipAt(
    statusLabel(result.overallStatus, ar),
    chipX,
    blockTop + 8,
    color,
    scoreBg(result.overallScore),
    ar ? 'right' : 'left',
  );
  w.lineAt(
    ar ? 'درجة الجاهزية التنظيمية الإجمالية' : 'Overall regulatory readiness score',
    chipX,
    blockTop + 27,
    { size: 8.5, color: SUB },
  );

  w.y = blockTop + 58;

  // Stat boxes
  const stats: { label: string; value: string; color?: RGB }[] = [
    {
      label: ar ? 'البنود المدققة' : 'Checks audited',
      value: `${result.answeredQuestions}/${result.totalQuestions}`,
    },
    {
      label: ar ? 'إجمالي الفجوات' : 'Total gaps',
      value: `${result.totalGaps}`,
      color: result.totalGaps > 0 ? AMBER : EMERALD,
    },
    {
      label: ar ? 'فجوات عالية المخاطر' : 'High-risk gaps',
      value: `${result.highRiskGaps}`,
      color: result.highRiskGaps > 0 ? RED : EMERALD,
    },
    {
      label: ar ? 'الوحدات المشمولة' : 'Modules in scope',
      value: `${result.moduleScores.length}`,
    },
  ];
  const gap = 10;
  const boxW = (CONTENT_W - gap * 3) / 4;
  const boxH = 52;
  w.ensure(boxH + 10);
  stats.forEach((stat, i) => {
    const x = MARGIN + i * (boxW + gap);
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, w.y, boxW, boxH, 4, 4, 'S');
    const valueColor = stat.color ?? INK;
    w.lineAt(stat.value, x + boxW / 2, w.y + 9, {
      size: 16,
      bold: true,
      color: valueColor,
      align: 'center',
    });
    w.lineAt(stat.label, x + boxW / 2, w.y + 32, { size: 7.5, color: SUB, align: 'center' });
  });
  w.y += boxH + 16;
}

function drawScope(w: ReportWriter, activities: SelectedActivities, ar: boolean) {
  w.heading(ar ? '٢. نطاق التقييم' : '2. Assessment scope');
  w.paragraph(
    ar
      ? 'الأنشطة المرخصة المشمولة في هذا التقييم:'
      : 'Licensed activities included in this assessment:',
    { size: 9.5, color: SUB, spaceAfter: 4 },
  );
  const labels = getActivityLabels();
  (Object.keys(labels) as (keyof SelectedActivities)[])
    .filter((key) => activities[key])
    .forEach((key) => {
      const label = labels[key];
      w.paragraph(
        `•  ${label[ar ? 'ar' : 'en']} — ${label.description[ar ? 'ar' : 'en']}`,
        { size: 9.5, indent: 6, spaceAfter: 2 },
      );
    });
  w.y += 8;
}

function drawModuleBreakdown(
  w: ReportWriter,
  modules: ModuleScore[],
  ar: boolean,
  isPartial: boolean,
) {
  const doc = w.doc;
  w.heading(ar ? '٣. نتائج الوحدات' : '3. Module results');

  const audited = modules.filter((m) => m.answeredQuestions > 0);
  const pending = modules.filter((m) => m.answeredQuestions === 0);

  // Column geometry (mirrored for Arabic)
  const nameW = 200;
  const colScore = nameW + 66;
  const colBarStart = nameW + 80;
  const colBarW = 110;
  const colAudited = colBarStart + colBarW + 44;
  const colGaps = colAudited + 50;
  const xFor = (offset: number) => (ar ? PAGE_W - MARGIN - offset : MARGIN + offset);

  // Header row
  w.ensure(20);
  const headY = w.y;
  doc.setFillColor(244, 244, 245);
  doc.rect(MARGIN, headY - 3, CONTENT_W, 17, 'F');
  w.lineAt(ar ? 'الوحدة' : 'Module', xFor(4), headY, { size: 7.5, bold: true, color: SUB });
  w.lineAt(ar ? 'الدرجة' : 'Score', xFor(colScore), headY, {
    size: 7.5,
    bold: true,
    color: SUB,
    align: ar ? 'left' : 'right',
  });
  w.lineAt(ar ? 'المدقق' : 'Audited', xFor(colAudited), headY, {
    size: 7.5,
    bold: true,
    color: SUB,
    align: ar ? 'left' : 'right',
  });
  w.lineAt(ar ? 'الفجوات' : 'Gaps', xFor(colGaps), headY, {
    size: 7.5,
    bold: true,
    color: SUB,
    align: ar ? 'left' : 'right',
  });
  w.y = headY + 20;

  audited.forEach((module) => {
    w.ensure(22);
    const rowY = w.y;
    const color = scoreColor(module.score);
    w.lineAt(module.moduleLabel[ar ? 'ar' : 'en'], xFor(4), rowY, { size: 9, bold: true });
    w.lineAt(`${module.score}%`, xFor(colScore), rowY, {
      size: 9,
      bold: true,
      color,
      align: ar ? 'left' : 'right',
    });
    w.bar(ar ? PAGE_W - MARGIN - colBarStart - colBarW : MARGIN + colBarStart, rowY + 3.5, colBarW, module.score, color);
    w.lineAt(`${module.answeredQuestions}/${module.totalQuestions}`, xFor(colAudited), rowY, {
      size: 9,
      color: SUB,
      align: ar ? 'left' : 'right',
    });
    w.lineAt(`${module.gaps.length}`, xFor(colGaps), rowY, {
      size: 9,
      bold: module.gaps.length > 0,
      color: module.gaps.length > 0 ? RED : EMERALD,
      align: ar ? 'left' : 'right',
    });
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, rowY + 15, PAGE_W - MARGIN, rowY + 15);
    w.y = rowY + 21;
  });

  if (isPartial && pending.length > 0) {
    w.y += 4;
    w.paragraph(
      ar
        ? `وحدات لم يتم تدقيقها بعد (${pending.length}): ${pending.map((m) => m.moduleLabel.ar).join('، ')}`
        : `Modules not yet audited (${pending.length}): ${pending.map((m) => m.moduleLabel.en).join(', ')}`,
      { size: 8.5, color: FAINT },
    );
  }
  w.y += 8;
}

function drawGap(w: ReportWriter, gap: ComplianceGap, ar: boolean) {
  const { fg, bg } = severityColor(gap.severity);
  w.ensure(56);
  const topY = w.y;

  // Rule id + severity chip + current score on one line
  const startX = ar ? PAGE_W - MARGIN : MARGIN;
  w.lineAt(gap.ruleId, startX, topY, { size: 9.5, bold: true, color: INK });
  const idW = w.doc.getTextWidth(gap.ruleId);
  w.chipAt(
    severityLabel(gap.severity, ar),
    ar ? startX - idW - 10 : startX + idW + 10,
    topY,
    fg,
    bg,
    ar ? 'right' : 'left',
  );
  w.lineAt(
    ar ? `الدرجة الحالية: ${gap.currentScore}%` : `Current score: ${gap.currentScore}%`,
    ar ? MARGIN : PAGE_W - MARGIN,
    topY + 2,
    { size: 8, color: FAINT, align: ar ? 'left' : 'right' },
  );
  w.y = topY + 18;

  w.paragraph(gap.description[ar ? 'ar' : 'en'], { size: 9.5, indent: 6, spaceAfter: 3 });
  w.paragraph(
    `${ar ? 'الإجراء المطلوب:' : 'Required action:'} ${gap.requiredAction[ar ? 'ar' : 'en']}`,
    { size: 9, color: SUB, indent: 6, spaceAfter: 3 },
  );

  const evidence = gap.evidence?.[ar ? 'ar' : 'en'] ?? [];
  if (evidence.length > 0) {
    w.paragraph(ar ? 'المستندات الداعمة المطلوبة:' : 'Supporting evidence to prepare:', {
      size: 8.5,
      bold: true,
      color: SUB,
      indent: 6,
      spaceAfter: 1,
    });
    evidence.forEach((item) => {
      w.paragraph(`–  ${item}`, { size: 8.5, color: SUB, indent: 14, spaceAfter: 1 });
    });
  }
  w.y += 10;
}

function drawFindings(w: ReportWriter, modules: ModuleScore[], ar: boolean) {
  w.heading(ar ? '٤. الفجوات المرصودة' : '4. Detailed findings');

  const withGaps = modules.filter((m) => m.answeredQuestions > 0 && m.gaps.length > 0);
  if (withGaps.length === 0) {
    w.paragraph(
      ar
        ? 'لم يتم رصد أي فجوات امتثال في الوحدات التي تم تدقيقها.'
        : 'No compliance gaps were identified in the audited modules.',
      { size: 9.5, color: EMERALD, bold: true },
    );
    w.y += 8;
    return;
  }

  withGaps.forEach((module) => {
    w.ensure(40);
    w.paragraph(
      `${module.moduleLabel[ar ? 'ar' : 'en']} — ${module.score}%`,
      { size: 11, bold: true, color: scoreColor(module.score), spaceAfter: 4 },
    );
    module.gaps.forEach((gap) => drawGap(w, gap, ar));
  });
}

function drawRecommendations(w: ReportWriter, recommendations: Recommendation[], ar: boolean) {
  w.heading(ar ? '٥. التوصيات ذات الأولوية' : '5. Prioritized recommendations');

  if (recommendations.length === 0) {
    w.paragraph(
      ar ? 'لا توجد توصيات — لم يتم رصد فجوات.' : 'No recommendations — no gaps were identified.',
      { size: 9.5, color: EMERALD, bold: true },
    );
    w.y += 8;
    return;
  }

  recommendations.forEach((rec, i) => {
    w.ensure(44);
    const topY = w.y;
    const startX = ar ? PAGE_W - MARGIN : MARGIN;
    const priorityColors: Record<string, { fg: RGB; bg: RGB }> = {
      high: { fg: RED, bg: RED_BG },
      medium: { fg: AMBER, bg: AMBER_BG },
      low: { fg: SUB, bg: [244, 244, 245] },
    };
    const { fg, bg } = priorityColors[rec.priority];
    w.lineAt(`${i + 1}.`, startX, topY, { size: 10, bold: true });
    w.chipAt(
      priorityLabel(rec.priority, ar),
      ar ? startX - 18 : startX + 18,
      topY,
      fg,
      bg,
      ar ? 'right' : 'left',
    );
    w.y = topY + 18;
    w.paragraph(rec.action[ar ? 'ar' : 'en'], { size: 9.5, indent: 18, spaceAfter: 2 });
    w.paragraph(
      ar
        ? `القواعد ذات الصلة: ${rec.relatedRuleIds.join('، ')}  ·  الجهد المقدر: ${effortLabel(rec.estimatedEffort, ar)}`
        : `Related rules: ${rec.relatedRuleIds.join(', ')}  ·  Estimated effort: ${effortLabel(rec.estimatedEffort, ar)}`,
      { size: 8, color: FAINT, indent: 18, spaceAfter: 6 },
    );
  });
}

function drawDisclaimer(w: ReportWriter, ar: boolean) {
  w.ensure(60);
  w.y += 8;
  w.doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
  w.doc.setLineWidth(0.8);
  w.doc.line(MARGIN, w.y, PAGE_W - MARGIN, w.y);
  w.y += 10;
  w.paragraph(
    ar
      ? 'إخلاء مسؤولية: هذا التقرير ناتج عن أداة تقييم ذاتي آلية لأغراض استرشادية فقط، ولا يُعد استشارة قانونية أو تنظيمية، ولا يمثل قراراً أو موقفاً رسمياً من هيئة السوق المالية. يُنصح بمراجعة مستشار قانوني مختص قبل اتخاذ أي إجراء تنظيمي.'
      : 'Disclaimer: This report is generated by an automated self-assessment tool for guidance purposes only. It does not constitute legal or regulatory advice and does not represent an official determination by the Capital Market Authority (CMA). Consult a qualified legal adviser before taking regulatory action.',
    { size: 7.5, color: FAINT, lineGap: 1.5 },
  );
}

function drawFooters(doc: jsPDF, ar: boolean, generatedDate: string) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i += 1) {
    doc.setPage(i);
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, PAGE_H - 46, PAGE_W - MARGIN, PAGE_H - 46);
    doc.setFont('Tajawal', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(FAINT[0], FAINT[1], FAINT[2]);

    const brand = ar
      ? `مدقق الامتثال — تقرير تقييم ذاتي · ${generatedDate}`
      : `CMA Compliance Checker — Self-assessment report · ${generatedDate}`;
    const pageLabel = ar ? `صفحة ${i} من ${pages}` : `Page ${i} of ${pages}`;

    doc.text(brand, ar ? PAGE_W - MARGIN : MARGIN, PAGE_H - 34, {
      align: ar ? 'right' : 'left',
    });
    doc.text(pageLabel, ar ? MARGIN : PAGE_W - MARGIN, PAGE_H - 34, {
      align: ar ? 'left' : 'right',
    });
  }
}

// ============================================
// Entry point
// ============================================

export async function generateAssessmentPdf(
  result: AssessmentResult,
  locale: string,
): Promise<void> {
  const ar = locale === 'ar';
  const fonts = await loadFonts();

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
    compress: true,
    putOnlyUsedFonts: true,
  });

  doc.addFileToVFS('Tajawal-Regular.ttf', fonts.regular);
  doc.addFont('Tajawal-Regular.ttf', 'Tajawal', 'normal');
  doc.addFileToVFS('Tajawal-Bold.ttf', fonts.bold);
  doc.addFont('Tajawal-Bold.ttf', 'Tajawal', 'bold');
  doc.setFont('Tajawal', 'normal');

  const isPartial = result.answeredQuestions < result.totalQuestions;
  const coveragePercent =
    result.totalQuestions > 0
      ? Math.round((result.answeredQuestions / result.totalQuestions) * 100)
      : 0;

  doc.setProperties({
    title: ar ? 'تقرير تقييم الامتثال' : 'CMA Compliance Assessment Report',
    subject: 'CMA compliance self-assessment',
    creator: 'CMA Compliance Checker',
  });

  const w = new ReportWriter(doc, ar);

  drawCoverHeader(w, result, ar, isPartial, coveragePercent);
  drawSummary(w, result, ar);
  drawScope(w, result.selectedActivities, ar);
  drawModuleBreakdown(w, result.moduleScores, ar, isPartial);
  drawFindings(w, result.moduleScores, ar);
  drawRecommendations(w, result.recommendations, ar);
  drawDisclaimer(w, ar);

  const generatedDate = new Date(result.completedAt).toLocaleDateString(
    ar ? 'ar-u-nu-latn-ca-gregory' : 'en-GB',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );
  drawFooters(doc, ar, generatedDate);

  doc.save(
    `CMA-Compliance-${isPartial ? 'DRAFT' : 'FINAL'}-${new Date().toISOString().split('T')[0]}.pdf`,
  );
}
