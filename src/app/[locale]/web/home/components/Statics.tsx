'use client';

import { StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiUsers, FiCode, FiServer, FiGlobe, FiActivity } from 'react-icons/fi';

// Helper to map generic labels to technical icons (optional, if you want to override emojis)
const getIconForStat = (index: number) => {
    const icons = [<FiUsers />, <FiCode />, <FiServer />, <FiGlobe />];
    return icons[index % icons.length];
};

export default function StatisticsSection({ statistics }: { statistics: any[] }) {

    return (
        <section className="relative bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-zinc-800">

            {/* 1. Technical Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">

                {/* 2. The Data Grid */}
                {/* We use bg-zinc-200/800 for the gap color to create perfect 1px grid lines */}
                <StaggerContainer className="bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden grid grid-cols-2 md:grid-cols-4 gap-px">

                    {statistics.map((stat: any, index: number) => (
                        <StaggerItem key={stat.id} className="h-full">
                            <div
                                className="group relative bg-white dark:bg-zinc-900/60 backdrop-blur-sm p-8 h-full flex flex-col items-center text-center transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            >
                                {/* Hover Effect: Technical Corner Markers */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Icon: Muted & Small */}
                                <div className="mb-4 text-zinc-400 group-hover:text-primary-500 transition-colors duration-300">
                                    {/* If stat.icon is an Emoji, consider replacing it with the Feather Icon helper below for a cleaner look */}
                                    <div className="text-2xl">
                                        {/* {stat.icon} */}
                                        {getIconForStat(index)}
                                    </div>
                                </div>

                                {/* Value: Monospace & Big */}
                                <div className="relative">
                                    <span className="text-4xl md:text-5xl font-bold font-mono text-zinc-900 dark:text-white tracking-tighter">
                                        {stat.value}
                                    </span>
                                    {/* Optional: Live Status Dot */}
                                    <span className="absolute -top-1 -right-3 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                </div>

                                {/* Label: Technical Uppercase */}
                                <div className="mt-2 text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                                    {stat.label}
                                </div>

                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}