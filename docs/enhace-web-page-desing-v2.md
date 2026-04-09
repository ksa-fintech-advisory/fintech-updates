Role:
You are a World-Class Creative Frontend Developer (Awwwards-winning level). Your task is to build a high-end, premium personal portfolio landing page for a Fintech Software Architect.

Design Vibe & Reference:

Inspiration: GitHub's homepage (data streams, glowing node graphs, high-tech feel), Vercel, and Linear.

Theme: Dark mode exclusively. Deep blacks, sleek dark grays, with subtle glowing accents (e.g., Emerald Green or Cyan) to represent Fintech, trust, and secure data flow.

Typography: Use a clean, modern Arabic font (e.g., 'Tajawal' or 'IBM Plex Sans Arabic') for the text, and a Monospace font (e.g., 'Fira Code') for the technical/terminal elements.

Tech Stack Requirement: React (Next.js preferred), Tailwind CSS, and framer-motion for complex animations. Use custom SVG animations or lightweight Canvas/Three.js if necessary for the Node Graph.

Core Sections & Animation Requirements:

1. Hero Section (The Context Switcher):

UI: A glowing, minimalist dark hero section. Center aligned.

Component: Implement a "Glassmorphism" Toggle/Switcher at the top ([ منظور الأعمال ] / [ المنظور الهندسي ]).

Animation: When switching, the <h1> and <p> text should crossfade using framer-motion (AnimatePresence).

Background: A subtle, moving grid background or flowing data lines (similar to GitHub's globe/lines) that react slightly to mouse movement.

Text (Arabic):

Title: نفهم التقنية المالية.. ونبنيها صح.

Subtitle: مهندس أنظمة مالية (Fintech Architect) | بناء معمارية تقبل التوسع وتجتاز تدقيق المشرّع.

2. About Me (Split-Screen Sticky Scroll):

UI: A 2-column layout.

Animation: The left column is sticky while the right column scrolls.

Left Column: A beautiful, macOS-style IDE/Code Editor window showing syntax-highlighted mock code (React/Node.js microservices code).

Right Column: Glassmorphic cards scrolling up. They reveal with a fade-up-blur effect on scroll.

Text (Arabic):

Card 1: مهندس برمجيات بخبرة +5 سنوات.

Card 2: أركز على تقاطع الهندسة مع التشريعات والامتثال.

Card 3: المبدأ: جودة الكود تعتمد على معمارية تدعم الامتثال وتسمح بالتوسع.

3. Projects & Architecture (The Interactive Node Graph):

UI: This is the "Wow" factor. Instead of a normal list, build an interactive Network/Node Graph using SVGs and framer-motion or React Flow.

Animation: Nodes pulse gently. Lines connecting nodes show animated "data packets" flowing along the paths.

Interaction: Hovering over a node highlights it, dims the rest, and opens a sleek tooltip.

Data:

Node 1: محرك الاستثمار الآلي (Robo-advisor)

Node 2: بنية تحتية للمدفوعات (Payment Gateway)

Node 3: إدارة الهوية والوصول (IAM)

4. Experience & Companies (Dynamic Bento Grid):

UI: A Bento Box grid layout (asymmetric grid).

Animation: Implement "Mouse Spotlight" hover effects (where a soft glow follows the cursor inside the card's border - inspired by Linear's website).

Content:

Box 1 (Large): Logos of companies worked with (rendered in monochrome/white with low opacity, lighting up on hover).

Box 2 (Small): A fake real-time chart (SVG) pulsing, labeled: System Uptime: 99.99%.

Box 3: "سنوات من العمل لتمكين منتجات مالية في بيئات عالية التنظيم."

5. The Blog Teaser (Terminal View):

UI: A realistic Terminal/CLI window.

Animation: A typewriter effect typing out commands. Blinking cursor.

Text (Arabic):
> cat latest_insights.md
[1] بناء الـ MVP في الفنتك: موازنة التكلفة والامتثال.
[2] هندسة ما بعد الإطلاق والـ APIs.
> تصفح المذكرات الميدانية_ (Make this line a clickable link).

6. Contact (The Command Palette):

UI: Ditch the standard form. Build a UI that looks like a macOS Spotlight search or Raycast command palette.

Interaction: Input field that says // ابدأ مساحة العمل المشترك. Below it, list 3 actionable ghost buttons with hover animations:

[ اطلب استشارة لتطوير الـ MVP ]

[ مراجعة معمارية النظام ]

[ تواصل مباشر عبر واتساب ]

Execution Rules for the Agent:

Write clean, modular React components.

Do NOT use generic, cheap-looking shadows. Use subtle borders (border-white/10) and very diffused drop shadows.

Ensure all animations feel smooth, premium, and performant (use hardware acceleration).

Generate the complete, copy-pasteable code for the main page structure and the key animated components.