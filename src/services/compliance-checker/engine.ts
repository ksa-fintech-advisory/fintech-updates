/**
 * CMA Compliance Checker Engine
 * Pure compliance logic for Saudi Capital Market Authority regulations
 * 
 * NO HTTP or framework logic - deterministic, data-driven compliance intelligence
 */

import type {
  ComplianceDataset,
  ComplianceRule,
  RegulatedActivity,
  DecisionFlow,
  Checklist,
  ComplianceModule,
  ComplianceScenario,
  RiskScoreSummary,
  ModuleSummary,
  ScenarioMapping,
  BilingualText,
  RiskLevel,
} from './types';
import { parseRiskLevel, isMandatory } from './types';
import complianceData from '@/data/cma_compliance_dataset.json';

// ============================================
// Scenario to Rule Mappings
// ============================================

/**
 * Maps business scenarios to relevant compliance rule IDs
 * Based on CMA regulations article references
 */
const SCENARIO_MAPPINGS: ScenarioMapping[] = [
  {
    scenario: 'CLIENT_ONBOARDING',
    label: { ar: 'قبول العملاء', en: 'Client Onboarding' },
    description: { 
      ar: 'متطلبات التصنيف واعرف عميلك والملاءمة', 
      en: 'Classification, KYC, and suitability requirements' 
    },
    ruleIds: ['OPS-001', 'OPS-002', 'OPS-003', 'OPS-004', 'OPS-005', 'GOV-006'],
    checklistId: 'CL-002',
    decisionFlowId: 'DF-001',
  },
  {
    scenario: 'LICENSING',
    label: { ar: 'الترخيص', en: 'Licensing' },
    description: { 
      ar: 'متطلبات الترخيص والشكل القانوني ورأس المال', 
      en: 'License, legal form, and capital requirements' 
    },
    ruleIds: ['LIC-001', 'LIC-002', 'LIC-003', 'LIC-004', 'LIC-005', 'LIC-006', 'LIC-007', 'LIC-008', 'LIC-009', 'LIC-010', 'LIC-011', 'LIC-012', 'LIC-013', 'LIC-014'],
    checklistId: 'CL-001',
    decisionFlowId: 'DF-002',
  },
  {
    scenario: 'CLIENT_MONEY',
    label: { ar: 'أموال العملاء', en: 'Client Money' },
    description: { 
      ar: 'متطلبات الفصل والتسوية والحماية', 
      en: 'Segregation, reconciliation, and protection requirements' 
    },
    ruleIds: ['CLM-001', 'CLM-002', 'BKR-001', 'RPT-003'],
  },
  {
    scenario: 'GOVERNANCE',
    label: { ar: 'الحوكمة', en: 'Governance' },
    description: { 
      ar: 'متطلبات مجلس الإدارة والالتزام والرقابة', 
      en: 'Board, compliance, and oversight requirements' 
    },
    ruleIds: ['GOV-001', 'GOV-002', 'GOV-003', 'GOV-004', 'GOV-005', 'GOV-006'],
  },
  {
    scenario: 'AML_CFT',
    label: { ar: 'مكافحة غسل الأموال', en: 'AML/CFT' },
    description: { 
      ar: 'متطلبات مكافحة غسل الأموال وتمويل الإرهاب', 
      en: 'Anti-money laundering and counter-terrorist financing' 
    },
    ruleIds: ['OPS-002', 'GOV-005'],
  },
  {
    scenario: 'REPORTING',
    label: { ar: 'التقارير والإخطارات', en: 'Reporting' },
    description: { 
      ar: 'متطلبات الإخطار والتقارير للهيئة', 
      en: 'CMA notification and reporting requirements' 
    },
    ruleIds: ['RPT-001', 'RPT-002', 'RPT-003'],
    checklistId: 'CL-003',
  },
  {
    scenario: 'OUTSOURCING',
    label: { ar: 'الإسناد الخارجي', en: 'Outsourcing' },
    description: { 
      ar: 'متطلبات الإسناد الخارجي والأطراف الثالثة', 
      en: 'Outsourcing and third-party requirements' 
    },
    ruleIds: ['OUT-001'],
  },
  {
    scenario: 'DATA_SECURITY',
    label: { ar: 'أمن البيانات', en: 'Data Security' },
    description: { 
      ar: 'متطلبات السرية وحواجز المعلومات', 
      en: 'Confidentiality and information barrier requirements' 
    },
    ruleIds: ['DAT-001', 'DAT-002'],
  },
  {
    scenario: 'MARGIN_TRADING',
    label: { ar: 'تداول الهامش', en: 'Margin Trading' },
    description: { 
      ar: 'متطلبات الهامش للأسهم المدرجة', 
      en: 'Margin requirements for listed shares' 
    },
    ruleIds: ['OPS-006'],
  },
  {
    scenario: 'ADVISORY',
    label: { ar: 'تقديم المشورة', en: 'Advisory' },
    description: { 
      ar: 'متطلبات تقديم المشورة الاستثمارية', 
      en: 'Investment advice requirements' 
    },
    ruleIds: ['OPS-003', 'OPS-004', 'OPS-005'],
  },
];

/**
 * Module labels in bilingual format
 */
const MODULE_LABELS: Record<string, BilingualText> = {
  'Licensing': { ar: 'الترخيص', en: 'Licensing' },
  'Governance': { ar: 'الحوكمة', en: 'Governance' },
  'Operations': { ar: 'العمليات', en: 'Operations' },
  'Reporting & Notifications': { ar: 'التقارير والإخطارات', en: 'Reporting & Notifications' },
  'Outsourcing & Third Parties': { ar: 'الإسناد الخارجي والأطراف الثالثة', en: 'Outsourcing & Third Parties' },
  'Data & Cybersecurity': { ar: 'البيانات والأمن السيبراني', en: 'Data & Cybersecurity' },
  'Capital & Financials': { ar: 'رأس المال والشؤون المالية', en: 'Capital & Financials' },
};

// ============================================
// Data Access Functions
// ============================================

/**
 * Get the complete compliance dataset
 */
export function getComplianceData(): ComplianceDataset {
  return complianceData as ComplianceDataset;
}

/**
 * Get all compliance rules
 */
export function getAllRules(): ComplianceRule[] {
  return getComplianceData().compliance_rules;
}

/**
 * Get a specific rule by ID
 */
export function getRuleById(ruleId: string): ComplianceRule | undefined {
  return getAllRules().find(rule => rule.rule_id === ruleId);
}

/**
 * Get rules filtered by module
 */
export function getRulesByModule(moduleName: string): ComplianceRule[] {
  return getAllRules().filter(rule => 
    rule.module.en.toLowerCase() === moduleName.toLowerCase() ||
    rule.module.ar === moduleName
  );
}

/**
 * Get all regulated activities
 */
export function getActivities(): RegulatedActivity[] {
  return getComplianceData().regulated_activities;
}

/**
 * Get a specific activity by ID
 */
export function getActivityById(activityId: string): RegulatedActivity | undefined {
  return getActivities().find(activity => activity.activity_id === activityId);
}

/**
 * Get all decision flows
 */
export function getDecisionFlows(): DecisionFlow[] {
  return getComplianceData().decision_flows;
}

/**
 * Get a specific decision flow by ID
 */
export function getDecisionFlowById(flowId: string): DecisionFlow | undefined {
  return getDecisionFlows().find(flow => flow.flow_id === flowId);
}

/**
 * Get all checklists
 */
export function getChecklists(): Checklist[] {
  return getComplianceData().checklists;
}

/**
 * Get a specific checklist by ID
 */
export function getChecklistById(checklistId: string): Checklist | undefined {
  return getChecklists().find(checklist => checklist.checklist_id === checklistId);
}

// ============================================
// Risk & Scoring Functions
// ============================================

/**
 * Calculate risk score summary for a set of rules
 */
export function calculateRiskScore(rules: ComplianceRule[]): RiskScoreSummary {
  const summary: RiskScoreSummary = { high: 0, medium: 0, low: 0, total: rules.length };
  
  rules.forEach(rule => {
    const level = parseRiskLevel(rule.risk_level);
    if (level === 'High') summary.high++;
    else if (level === 'Medium') summary.medium++;
    else summary.low++;
  });
  
  return summary;
}

/**
 * Get all high-risk rules
 */
export function getHighRiskRules(): ComplianceRule[] {
  return getAllRules().filter(rule => parseRiskLevel(rule.risk_level) === 'High');
}

/**
 * Get all mandatory rules
 */
export function getMandatoryRules(): ComplianceRule[] {
  return getAllRules().filter(rule => isMandatory(rule.enforcement_type));
}

/**
 * Get rules by risk level
 */
export function getRulesByRiskLevel(level: RiskLevel): ComplianceRule[] {
  return getAllRules().filter(rule => parseRiskLevel(rule.risk_level) === level);
}

// ============================================
// Module Functions
// ============================================

/**
 * Get unique module names from rules
 */
export function getUniqueModules(): string[] {
  const modules = new Set<string>();
  getAllRules().forEach(rule => modules.add(rule.module.en));
  return Array.from(modules);
}

/**
 * Get module summaries for dashboard display
 */
export function getModuleSummaries(): ModuleSummary[] {
  const modules = getUniqueModules();
  
  return modules.map(moduleName => {
    const rules = getRulesByModule(moduleName);
    return {
      module: moduleName as ComplianceModule,
      moduleLabel: MODULE_LABELS[moduleName] || { ar: moduleName, en: moduleName },
      ruleCount: rules.length,
      highRiskCount: rules.filter(r => parseRiskLevel(r.risk_level) === 'High').length,
      mandatoryCount: rules.filter(r => isMandatory(r.enforcement_type)).length,
    };
  });
}

// ============================================
// Scenario Functions
// ============================================

/**
 * Get all scenario mappings
 */
export function getScenarioMappings(): ScenarioMapping[] {
  return SCENARIO_MAPPINGS;
}

/**
 * Get rules for a specific scenario
 */
export function getRulesForScenario(scenario: ComplianceScenario): ComplianceRule[] {
  const mapping = SCENARIO_MAPPINGS.find(m => m.scenario === scenario);
  if (!mapping) return [];
  
  return mapping.ruleIds
    .map(id => getRuleById(id))
    .filter((rule): rule is ComplianceRule => rule !== undefined);
}

/**
 * Get checklist for a specific scenario
 */
export function getChecklistForScenario(scenario: ComplianceScenario): Checklist | undefined {
  const mapping = SCENARIO_MAPPINGS.find(m => m.scenario === scenario);
  if (!mapping?.checklistId) return undefined;
  
  return getChecklistById(mapping.checklistId);
}

/**
 * Get decision flow for a specific scenario
 */
export function getDecisionFlowForScenario(scenario: ComplianceScenario): DecisionFlow | undefined {
  const mapping = SCENARIO_MAPPINGS.find(m => m.scenario === scenario);
  if (!mapping?.decisionFlowId) return undefined;
  
  return getDecisionFlowById(mapping.decisionFlowId);
}

// ============================================
// Search & Filter Functions
// ============================================

/**
 * Search rules by text (searches description, article reference, required action)
 */
export function searchRules(query: string, locale: 'en' | 'ar' = 'en'): ComplianceRule[] {
  const normalizedQuery = query.toLowerCase();
  
  return getAllRules().filter(rule => {
    const searchFields = [
      rule.description[locale],
      rule.article_reference[locale],
      rule.required_action[locale],
      rule.rule_id,
    ];
    
    return searchFields.some(field => 
      field.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Get overall compliance statistics
 */
export function getComplianceStats() {
  const rules = getAllRules();
  const riskScore = calculateRiskScore(rules);
  const mandatoryCount = getMandatoryRules().length;
  
  return {
    totalRules: rules.length,
    riskScore,
    mandatoryCount,
    totalActivities: getActivities().length,
    totalChecklists: getChecklists().length,
    totalDecisionFlows: getDecisionFlows().length,
    metadata: getComplianceData().metadata,
  };
}
