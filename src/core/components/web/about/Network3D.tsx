'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function NetworkNodes({ count = 30 }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    }
    return p;
  }, [count]);

  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
      group.current.rotation.x += 0.001;
    }
  });

  // Create connections between close points
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 4) {
          lines.push([points[i], points[j]]);
        }
      }
    }
    return lines;
  }, [points]);

  return (
    <group ref={group}>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={2} />
        </mesh>
      ))}
      {connections.map((line, i) => (
        <Line
          key={i}
          points={line}
          color="#34D399"
          transparent
          opacity={0.2}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

export default function () {
  return (
    <div className="absolute inset-0 z-0 w-full h-full opacity-40">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#34D399" />
        
        <NetworkNodes />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <NetworkNodes count={15} />
        </Float>
        
        <fog attach="fog" args={['#0f172a', 5, 25]} />
      </Canvas>
    </div>
  );
}
