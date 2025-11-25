'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Wave Field 3D Component
 * Creates an animated wave field with floating particles
 * Perfect for blog/content pages
 */

interface WaveFieldProps {
  gridSize?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
}

function WaveField({ gridSize = 40, waveAmplitude = 0.8, waveSpeed = 0.5 }: WaveFieldProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Create grid geometry for the wave
  const { positions, count } = useMemo(() => {
    const positions = new Float32Array(gridSize * gridSize * 3);
    let index = 0;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        positions[index++] = (i - gridSize / 2) * 0.5;
        positions[index++] = 0;
        positions[index++] = (j - gridSize / 2) * 0.5;
      }
    }
    
    return { positions, count: gridSize * gridSize };
  }, [gridSize]);

  // Animate the wave
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime * waveSpeed;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      
      // Create wave pattern using sine and cosine
      const distance = Math.sqrt(x * x + z * z);
      const wave1 = Math.sin(distance * 0.5 - time) * waveAmplitude;
      const wave2 = Math.cos(distance * 0.3 + time * 0.7) * waveAmplitude * 0.5;
      const y = wave1 + wave2;
      
      positionAttribute.setY(i, y);
    }
    
    positionAttribute.needsUpdate = true;
    
    // Rotate the entire field slowly
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#10B981"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Floating particles component
function FloatingParticles({ count = 50 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positionAttribute = particlesRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      
      // Float up and down
      const newY = Math.sin(time + i) * 2;
      positionAttribute.setY(i, newY);
    }
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#34D399"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function WaveField3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full opacity-50">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 10]} fov={60} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#10B981" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#059669" />
        
        <WaveField gridSize={50} waveAmplitude={1.2} waveSpeed={0.6} />
        <FloatingParticles count={80} />
        
        <fog attach="fog" args={['#065f46', 8, 30]} />
      </Canvas>
    </div>
  );
}
