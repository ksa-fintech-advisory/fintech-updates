'use client';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F8A5F" />
          <stop offset="50%" stopColor="#15A86E" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer Hexagon Frame */}
      <path
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        fill="url(#logoGradient)"
        opacity="0.15"
      />
      
      {/* Inner Diamond/Network Design */}
      <g filter="url(#glow)">
        {/* Center Node */}
        <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" />
        
        {/* Top Node */}
        <circle cx="50" cy="25" r="6" fill="url(#logoGradient)" opacity="0.9" />
        
        {/* Right Node */}
        <circle cx="70" cy="50" r="6" fill="url(#logoGradient)" opacity="0.9" />
        
        {/* Bottom Node */}
        <circle cx="50" cy="75" r="6" fill="url(#logoGradient)" opacity="0.9" />
        
        {/* Left Node */}
        <circle cx="30" cy="50" r="6" fill="url(#logoGradient)" opacity="0.9" />
        
        {/* Connecting Lines */}
        <line x1="50" y1="25" x2="50" y2="42" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="50" x2="58" y2="50" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="75" x2="50" y2="58" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="50" x2="42" y2="50" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Diagonal Connections for Network Effect */}
        <line x1="44" y1="44" x2="36" y2="36" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <line x1="56" y1="44" x2="64" y2="36" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <line x1="56" y1="56" x2="64" y2="64" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <line x1="44" y1="56" x2="36" y2="64" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        
        {/* Corner Nodes */}
        <circle cx="35" cy="35" r="4" fill="#D4AF37" opacity="0.8" />
        <circle cx="65" cy="35" r="4" fill="#D4AF37" opacity="0.8" />
        <circle cx="65" cy="65" r="4" fill="#D4AF37" opacity="0.8" />
        <circle cx="35" cy="65" r="4" fill="#D4AF37" opacity="0.8" />
      </g>

      {/* Outer Border Enhancement */}
      <path
        d="M50 8 L82 29 L82 71 L50 92 L18 71 L18 29 Z"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}
