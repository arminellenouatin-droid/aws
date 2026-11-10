"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function SacredOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    // Gentle sacred rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.15;
      wireframeRef.current.rotation.x += delta * 0.08;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.12;
      outerRingRef.current.rotation.x += delta * 0.05;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.18;
      innerRingRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      {/* Central Glowing Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#1a1205"
          emissive="#c48312"
          emissiveIntensity={0.65}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Sacred Geometric Icosahedron Wireframe */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial
          color="#f5c042"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Outer Golden Astrolabe Ring 1 */}
      <group ref={outerRingRef} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#fde087"
            emissive="#f5c042"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Outer Golden Astrolabe Ring 2 */}
      <group ref={innerRingRef} rotation={[-0.6, -0.3, 0]}>
        <mesh>
          <torusGeometry args={[2.0, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#f5c042"
            emissive="#c48312"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

function StarfieldDust() {
  return (
    <Sparkles
      count={140}
      scale={8}
      size={2.5}
      speed={0.3}
      color="#fde087"
      opacity={0.7}
    />
  );
}

function InteractiveCamera() {
  useFrame(({ camera, pointer }) => {
    // Subtle parallax response to pointer
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.8 + 0.2, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function CosmosHeroScene() {
  return (
    <div className="w-full h-full min-h-[420px] relative">
      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.8]}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} color="#fde087" />
        <pointLight position={[-4, -3, -2]} intensity={0.8} color="#059669" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <SacredOrb />
        </Float>

        <StarfieldDust />
        <InteractiveCamera />
      </Canvas>
    </div>
  );
}
