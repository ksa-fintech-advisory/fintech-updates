'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

function DataStreamParticles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.002 + Math.random() / 1000;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.0002;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      t = particle.t += speed / 2;
      const s = Math.cos(t);

      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const scale = Math.max(0.1, s * 0.4);
      dummy.scale.set(scale, scale, scale);

      dummy.rotation.set(s * 2, s * 2, s * 2);
      dummy.updateMatrix();

      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial
        color="#d4d4d8"
        roughness={0.5}
        metalness={0.5}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

function AbstractArchitecture({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (group.current) {
      const x = (mouse.x * window.innerWidth) / 100;
      const y = (mouse.y * window.innerHeight) / 100;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.0002, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.0002, 0.1);
    }
  });

  const sphereSegs = lowPower ? 12 : 32;

  return (
    <group ref={group}>
      <Float speed={lowPower ? 1 : 1.5} rotationIntensity={0.2} floatIntensity={lowPower ? 0.35 : 0.5}>
        <mesh position={[3, 0, -5]} rotation={[0, 0.5, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          {lowPower ? (
            <meshStandardMaterial
              color="#d4d4d8"
              roughness={0.25}
              metalness={0.45}
              transparent
              opacity={0.88}
            />
          ) : (
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0}
              color="#ffffff"
              metalness={0.1}
              roughness={0.1}
              clearcoat={1}
            />
          )}
        </mesh>

        <mesh position={[-2, 1.5, -6]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[1.8, 0]} />
          <meshStandardMaterial color="#71717a" wireframe transparent opacity={0.2} />
        </mesh>

        <mesh position={[-1, -2, -4]}>
          <sphereGeometry args={[0.3, sphereSegs, sphereSegs]} />
          <meshStandardMaterial color="#a1a1aa" roughness={0.2} metalness={1} />
        </mesh>
      </Float>
    </group>
  );
}

function Hero3DCanvas({ lowPower }: { lowPower: boolean }) {
  const starsCount = lowPower ? 350 : 1200;
  const particleCount = lowPower ? 160 : 380;
  const dpr: [number, number] = lowPower ? [1, 1] : [1, 2];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-100">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

        <ambientLight intensity={0.4} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

        <Stars radius={100} depth={50} count={starsCount} factor={4} saturation={0} fade speed={0.2} />

        <DataStreamParticles count={particleCount} />
        <AbstractArchitecture lowPower={lowPower} />

        <fog attach="fog" args={['#09090b', 5, 20]} />
      </Canvas>
    </div>
  );
}

const STATIC_HERO_BG = (
  <div
    className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_15%,#27272a_0%,#09090b_55%,#09090b_100%)]"
    aria-hidden
  />
);

/**
 * Defers WebGL until the hero is near/in view; skips entirely for reduced motion.
 * Uses a lighter scene on small viewports (no transmission shader, fewer instances).
 */
export default function Hero3D() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [lowPower, setLowPower] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    const mobileMq = window.matchMedia('(max-width: 767px)');
    const syncLow = () => setLowPower(mobileMq.matches);
    syncLow();
    mobileMq.addEventListener('change', syncLow);

    const el = rootRef.current;
    if (!el) {
      return () => mobileMq.removeEventListener('change', syncLow);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setMountCanvas(true);
      },
      { root: null, rootMargin: '100px 0px 160px 0px', threshold: 0 }
    );
    io.observe(el);

    return () => {
      mobileMq.removeEventListener('change', syncLow);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      {STATIC_HERO_BG}
      {mountCanvas ? <Hero3DCanvas lowPower={lowPower} /> : null}
    </div>
  );
}
