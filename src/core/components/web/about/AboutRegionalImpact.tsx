'use client';

type Props = {
  isArabic: boolean;
  heading: string;
  sub: string;
};

// Generic network nodes representing regional hubs
const NODES = [
  { id: 'n1', x: 280, y: 140, size: 6 },
  { id: 'n2', x: 450, y: 110, size: 5 },
  { id: 'n3', x: 380, y: 130, size: 4 },
  { id: 'n4', x: 320, y: 90, size: 4 },
  { id: 'n5', x: 200, y: 180, size: 5 },
  { id: 'n6', x: 150, y: 220, size: 4 },
];

const CONNECTIONS = [
  { from: 'n1', to: 'n2', cp: { x: 360, y: 100 } },
  { from: 'n1', to: 'n3', cp: { x: 330, y: 110 } },
  { from: 'n1', to: 'n4', cp: { x: 300, y: 100 } },
  { from: 'n1', to: 'n5', cp: { x: 240, y: 150 } },
  { from: 'n5', to: 'n6', cp: { x: 175, y: 200 } },
  { from: 'n2', to: 'n3', cp: { x: 415, y: 105 } },
];

export function AboutRegionalImpact({ isArabic,  heading, sub }: Props) {
  return (
    <section
      id="about-regional"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-zinc-950 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Glowing backdrop */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
          <p className={`mt-4 text-sm text-zinc-500 md:text-base ${isArabic ? 'font-arabic' : ''}`}>{sub}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl h-[300px] md:h-[400px] w-full rounded-2xl border border-white/10 bg-zinc-800/80 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* SVG Map Canvas */}
          <svg viewBox="0 0 600 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            
            {/* Arcs / Routes */}
            {CONNECTIONS.map((route, i) => {
              const start = NODES.find((h) => h.id === route.from)!;
              const end = NODES.find((h) => h.id === route.to)!;
              const pathD = `M ${start.x} ${start.y} Q ${route.cp.x} ${route.cp.y} ${end.x} ${end.y}`;
              
              return (
                <g key={`route-${i}`}>
                  <path d={pathD} fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
                  <path d={pathD} fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="4" />
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle r={node.size} fill="#10b981" />
                <circle r={node.size + 4} fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
