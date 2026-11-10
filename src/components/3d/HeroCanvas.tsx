"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CosmosFallback } from "./CosmosFallback";

// Lazy-load the Three.js scene strictly on the client
const CosmosHeroScene = dynamic(() => import("./CosmosHeroScene"), {
  ssr: false,
  loading: () => <CosmosFallback />,
});

export function HeroCanvas() {
  const [shouldRender3D, setShouldRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    // 2. Check Save-Data mode (bandwidth economy on mobile 3G/4G)
    const nav = navigator as any;
    if (nav.connection?.saveData) {
      setShouldRender3D(false);
      return;
    }

    // 3. Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setShouldRender3D(!!gl);
    } catch {
      setShouldRender3D(false);
    }
  }, []);

  // During SSR or initial mount
  if (shouldRender3D === null) {
    return <CosmosFallback />;
  }

  // Graceful fallback for mobile low-power or non-WebGL devices
  if (!shouldRender3D) {
    return <CosmosFallback />;
  }

  return <CosmosHeroScene />;
}
