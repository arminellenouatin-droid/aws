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
      {/* Central Glowing Core - Deep Sapphire & Pure Blue */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#0f2b5c"
          emissive="#0052ff"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Sacred Geometric Icosahedron Wireframe - Bleu Ciel */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer Astrolabe Ring 1 - Bleu Pure */}
      <group ref={outerRingRef} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#0052ff"
            emissive="#38bdf8"
            emissiveIntensity={0.85}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Outer Astrolabe Ring 2 - Bleu Ciel Vibrant */}
      <group ref={innerRingRef} rotation={[-0.6, -0.3, 0]}>
        <mesh>
          <torusGeometry args={[2.0, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0052ff"
            emissiveIntensity={0.65}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  );
}

function StarfieldDust() {
  return (
    <Sparkles
      count={150}
      scale={8}
      size={2.5}
      speed={0.3}
      color="#38bdf8"
      opacity={0.8}
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
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#e0f2fe" />
        <pointLight position={[-4, -3, -2]} intensity={1.2} color="#0052ff" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <SacredOrb />
        </Float>

        <StarfieldDust />
        <InteractiveCamera />
      </Canvas>
    </div>
  );
}
