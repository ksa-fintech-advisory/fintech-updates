'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    FiHash, FiServer, FiShield, FiDollarSign,
    FiCopy, FiCheck, FiChevronRight, FiCode,
    FiBox, FiCpu, FiKey, FiGlobe,
    FiActivity
} from 'react-icons/fi';

// --- Mock Data: Documentation Structure ---
const DOCS_NAV = [
    {
        category: 'Getting Started',
        items: [
            { id: 'intro', title: 'Introduction', icon: <FiGlobe /> },
            { id: 'auth', title: 'Authentication', icon: <FiKey /> },
            { id: 'errors', title: 'Handling Errors', icon: <FiAlert /> },
        ]
    },
    {
        category: 'Core APIs',
        items: [
            { id: 'compliance', title: 'Compliance Engine', icon: <FiShield /> },
            { id: 'fees', title: 'Fee Calculator', icon: <FiDollarSign /> },
            { id: 'market', title: 'Market Data', icon: <FiActivity /> },
        ]
    }
];

// --- Mock Data: Code Snippets ---
const CODE_SNIPPETS = {
    auth: {
        curl: `curl -X GET https://api.fintech-platform.com/v1/me \\
  -H "Authorization: Bearer sk_test_51Mz..."`,
        node: `const stripe = require('fintech-sdk')('sk_test_...');

const user = await client.auth.me();
console.log(user);`
    },
    compliance: {
        curl: `curl -X POST https://api.fintech-platform.com/v1/compliance/check \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "activity": "crowdfunding",
    "region": "SA",
    "annual_volume": 5000000
  }'`,
        node: `const report = await client.compliance.check({
  activity: 'crowdfunding',
  region: 'SA',
  annual_volume: 5000000
});

if (report.status === 'compliant') {
  console.log('Ready to launch!');
}`
    }
};

// --- Helper Components ---
function FiAlert(props: any) {
    return <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
}

export default function DocsPage({ params: { locale } }: { params: { locale: string } }) {
    const isArabic = locale === 'ar';
    const [activeSection, setActiveSection] = useState('intro');
    const [copied, setCopied] = useState(false);
    const [codeLang, setCodeLang] = useState<'curl' | 'node'>('curl');

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 selection:bg-blue-500/30">

            {/* 1. Top Navigation (Minimal) */}
            <div className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <FiCode className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">DevHub</span>
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-500 border border-zinc-200 dark:border-zinc-700">v2.1.0</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                        <Link href={`/${locale}/web/products`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {isArabic ? 'المنتجات' : 'Products'}
                        </Link>
                        <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {isArabic ? 'حالة النظام' : 'Status'}
                        </Link>
                        <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
                            {isArabic ? 'تسجيل الدخول' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 py-8 items-start">

                {/* 2. Sidebar Navigation (Sticky) */}
                <aside className="hidden lg:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
                    <nav className="space-y-8">
                        {DOCS_NAV.map((group) => (
                            <div key={group.category}>
                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 px-2">
                                    {group.category}
                                </h3>
                                <ul className="space-y-1">
                                    {group.items.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => setActiveSection(item.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === item.id
                                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* 3. Main Content */}
                <main className="flex-1 min-w-0 max-w-4xl">

                    {/* Hero Section */}
                    <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-10">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                            {isArabic ? 'وثائق المطورين' : 'Developer Documentation'}
                        </h1>
                        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                            {isArabic
                                ? 'قم بدمج محركات الامتثال وحاسبات الرسوم الخاصة بنا مباشرة في تطبيقاتك المالية باستخدام واجهات برمجة التطبيقات (APIs) الموحدة.'
                                : 'Integrate our compliance engines and fee calculators directly into your financial applications using our unified REST APIs.'}
                        </p>
                        <div className="flex gap-4 mt-8">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                {isArabic ? 'الحصول على مفتاح API' : 'Get API Key'}
                            </button>
                            <button className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                                {isArabic ? 'تجربة في Postman' : 'Run in Postman'}
                            </button>
                        </div>
                    </div>

                    {/* Content: Authentication */}
                    <section id="auth" className="mb-16 scroll-mt-24">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500"><FiKey /></div>
                            <h2 className="text-2xl font-bold">Authentication</h2>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                            The API uses API keys to authenticate requests. You can view and manage your API keys in the Dashboard.
                            Your API keys carry many privileges, so be sure to keep them secure!
                        </p>

                        {/* Code Block Component */}
                        <div className="rounded-2xl bg-[#0d1117] border border-zinc-800 overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCodeLang('curl')}
                                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${codeLang === 'curl' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        cURL
                                    </button>
                                    <button
                                        onClick={() => setCodeLang('node')}
                                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${codeLang === 'node' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        Node.js
                                    </button>
                                </div>
                                <button onClick={() => handleCopy(CODE_SNIPPETS.auth[codeLang])} className="text-zinc-400 hover:text-white">
                                    {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                                </button>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="font-mono text-sm text-zinc-300">
                                    <code>{CODE_SNIPPETS.auth[codeLang]}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Content: Compliance API */}
                    <section id="compliance" className="mb-16 scroll-mt-24">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg text-emerald-600"><FiShield /></div>
                            <h2 className="text-2xl font-bold">Compliance Engine</h2>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                            Programmatically check your product's compliance status against SAMA regulations.
                            The engine returns a readiness score and a list of gaps.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Endpoint</div>
                                <div className="font-mono text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit">
                                    POST /v1/compliance/check
                                </div>
                            </div>
                            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Rate Limit</div>
                                <div className="font-mono text-sm text-zinc-900 dark:text-white">
                                    100 req / minute
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#0d1117] border border-zinc-800 overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                                <span className="text-xs font-mono text-zinc-500">Example Request</span>
                                <button onClick={() => handleCopy(CODE_SNIPPETS.compliance[codeLang])} className="text-zinc-400 hover:text-white">
                                    {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                                </button>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="font-mono text-sm text-zinc-300">
                                    <code>{CODE_SNIPPETS.compliance[codeLang]}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                </main>

                {/* 4. On This Page (Table of Contents) */}
                <aside className="hidden xl:block w-64 shrink-0 sticky top-24">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
                        {isArabic ? 'في هذه الصفحة' : 'On This Page'}
                    </h4>
                    <ul className="space-y-3 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                        <li>
                            <a href="#auth" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors block">Authentication</a>
                        </li>
                        <li>
                            <a href="#compliance" className="text-sm text-blue-600 font-bold block border-l-2 border-blue-600 -ml-[17px] pl-4">Compliance Engine</a>
                        </li>
                        <li>
                            <a href="#fees" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors block">Fee Calculator</a>
                        </li>
                        <li>
                            <a href="#errors" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors block">Error Codes</a>
                        </li>
                    </ul>

                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                        <h5 className="font-bold text-blue-800 dark:text-blue-300 text-sm mb-1">Need Help?</h5>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                            Join our Slack community for direct support from our engineers.
                        </p>
                        <button className="text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 w-full">
                            Join Community
                        </button>
                    </div>
                </aside>

            </div>
        </div>
    );
}