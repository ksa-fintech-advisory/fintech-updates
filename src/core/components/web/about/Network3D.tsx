'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/** Deterministic pseudo-random in [0, 1) — stable across SSR/hydration */
function rnd(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function makePoints(count: number, seed: number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    out.push(
      new THREE.Vector3(
        (rnd(i * 3, seed) - 0.5) * 10,
        (rnd(i * 3 + 1, seed) - 0.5) * 10,
        (rnd(i * 3 + 2, seed) - 0.5) * 10
      )
    );
  }
  return out;
}

function NetworkNodes({ count = 36, seed = 42 }: { count?: number; seed?: number }) {
  const points = useMemo(() => makePoints(count, seed), [count, seed]);

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    const maxDist = 4;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) {
          lines.push([points[i], points[j]]);
        }
      }
    }
    return lines;
  }, [points]);

  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
      group.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={group}>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={2} />
        </mesh>
      ))}
      {connections.map((line, i) => (
        <Line key={i} points={line} color="#34D399" transparent opacity={0.2} lineWidth={1} />
      ))}
    </group>
  );
}

export default function Network3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-40">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#34D399" />
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.8}>
          <NetworkNodes />
        </Float>
        <Stars radius={80} depth={40} count={800} factor={3} saturation={0} fade speed={0.4} />
        <fog attach="fog" args={['#0f172a', 6, 22]} />
      </Canvas>
    </div>
  );
}
