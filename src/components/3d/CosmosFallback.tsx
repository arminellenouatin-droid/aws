import React from "react";

export function CosmosFallback() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-gold-500/15 via-cosmos-900/40 to-transparent blur-3xl pointer-events-none" />

      {/* SVG Celestial Rings & Sacred Geometry */}
      <svg
        className="w-72 h-72 sm:w-96 sm:h-96 text-gold-400 animate-spin-slow"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animationDuration: "35s" }}
      >
        {/* Outer Ring */}
        <circle
          cx="200"
          cy="200"
          r="180"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="opacity-40"
        />

        {/* Orbit Ring 1 (Tilted) */}
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="65"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-60"
          transform="rotate(-25 200 200)"
        />

        {/* Orbit Ring 2 (Counter-tilted) */}
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="65"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-40"
          transform="rotate(35 200 200)"
        />

        {/* Inner Ring with Sacred Marks */}
        <circle
          cx="200"
          cy="200"
          r="110"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="16 12"
          className="opacity-70"
        />

        {/* Core Radiance */}
        <circle
          cx="200"
          cy="200"
          r="55"
          fill="url(#coreGradient)"
          className="opacity-90 animate-pulse-slow"
        />

        {/* Central Sacred Symbol (Sun/Eye/Cosmos) */}
        <circle cx="200" cy="200" r="14" fill="#04050c" stroke="currentColor" strokeWidth="2" />
        <circle cx="200" cy="200" r="5" fill="#fde087" />

        {/* Concentric Cardinal Marks */}
        <line x1="200" y1="10" x2="200" y2="40" stroke="currentColor" strokeWidth="2" className="opacity-60" />
        <line x1="200" y1="360" x2="200" y2="390" stroke="currentColor" strokeWidth="2" className="opacity-60" />
        <line x1="10" y1="200" x2="40" y2="200" stroke="currentColor" strokeWidth="2" className="opacity-60" />
        <line x1="360" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="2" className="opacity-60" />

        <defs>
          <radialGradient
            id="coreGradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(200 200) rotate(90) scale(60)"
          >
            <stop stopColor="#f5c042" stopOpacity="0.85" />
            <stop offset="0.6" stopColor="#c48312" stopOpacity="0.4" />
            <stop offset="1" stopColor="#070916" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Constellation Stars */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-gold-300 shadow-[0_0_12px_#f5c042] -translate-x-32 -translate-y-24 animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#f5c042] translate-x-36 translate-y-20 animate-pulse delay-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_#f5c042] translate-x-28 -translate-y-36 animate-pulse delay-300" />
        <div className="w-1 h-1 rounded-full bg-gold-200 shadow-[0_0_6px_#f5c042] -translate-x-40 translate-y-28 animate-pulse delay-1000" />
      </div>
    </div>
  );
}
