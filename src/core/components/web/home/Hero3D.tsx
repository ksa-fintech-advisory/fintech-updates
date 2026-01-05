'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Environment, Text } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

// 1. Data Particles: تمثيل البيانات المالية المتدفقة
// غيرنا الشكل من Dodecahedron إلى Box صغير ليوحي بالـ "Digital Bits"
function DataStreamParticles({ count = 800 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // توزيع الجزيئات ليكون "عريضاً" كأنه شبكة عالمية
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 500; // أبطأ وأكثر رزانة
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -20 + Math.random() * 40; // تقليل الارتفاع للتركيز على العرض
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // حركة الكاميرا البطيئة جداً لإعطاء شعور "سينمائي"
    mesh.current.rotation.y += 0.0005;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      // معادلة الحركة (Wave Function) لتبدو كتموجات السوق
      t = particle.t += speed / 3;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // تغيير الحجم بناءً على القرب (Pulsing Effect)
      const scale = Math.max(0.1, s * 0.5);
      dummy.scale.set(scale, scale, scale);

      dummy.rotation.set(s * 2, s * 2, s * 2);
      dummy.updateMatrix();

      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {/* BoxGeometry looks more like data blocks/pixels */}
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      {/* لون الزمرد المضيء - Emerald Glow */}
      <meshStandardMaterial
        color="#34d399"
        emissive="#064e3b"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// 2. The Assets: الأشكال العائمة التي تمثل "الأصول" و "العملات"
function FloatingAssets() {
  const { mouse } = useThree();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // تفاعل طفيف مع الماوس (Parallax)
      const x = (mouse.x * window.innerWidth) / 50;
      const y = (mouse.y * window.innerHeight) / 50;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.0005, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.0005, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* The Golden Standard: يمثل الذهب أو العملات المستقرة */}
        <mesh position={[2, 0, -5]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#d97706" // Gold/Bronze
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            emissive="#78350f"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* The Network Structure: يمثل الشبكة والبنية التحتية */}
        <mesh position={[-3, 2, -8]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial
            color="#064e3b"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Small Satellite Element */}
        <mesh position={[-1.5, -2, -3]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#10b981" roughness={0.4} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

// 3. The Composition
export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full opacity-100 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />

        {/* Lighting: Moody and Cinematic */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#34d399" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#d97706" /> {/* إضاءة خلفية ذهبية */}
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />

        {/* Environment */}
        <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <DataStreamParticles count={400} />
        <FloatingAssets />

        {/* Fog matches the new Dark Blue-Black background (#0B1120) */}
        <fog attach="fog" args={['#0B1120', 8, 25]} />
      </Canvas>
    </div>
  );
}