'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// 1. Data Bits: جزيئات البيانات (أنظف وأصغر)
// تمثل تدفق البيانات الخام (Raw Data Flow)
function DataStreamParticles({ count = 600 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.002 + Math.random() / 1000; // حركة بطيئة جداً وثابتة
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // دوران بطيء جداً للمشهد
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

      // حجم الجزيئات صغير جداً لتبدو كالغبار الرقمي
      const scale = Math.max(0.1, s * 0.4);
      dummy.scale.set(scale, scale, scale);

      // دوران عشوائي لكل مكعب
      dummy.rotation.set(s * 2, s * 2, s * 2);
      dummy.updateMatrix();

      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {/* مكعبات صغيرة جداً */}
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      {/* لون رمادي فاتح (Zinc-300) بدلاً من الأخضر */}
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

// 2. The Core Assets: الأشكال الهندسية المركزية
// تمثل "البنية التحتية" و "الشفافية"
function AbstractArchitecture() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (group.current) {
      // تفاعل بسيط جداً مع الماوس
      const x = (mouse.x * window.innerWidth) / 100;
      const y = (mouse.y * window.innerHeight) / 100;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.0002, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.0002, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>

        {/* الشكل الرئيسي: زجاجي بلوري (Crystal Icosahedron) */}
        {/* يرمز للشفافية والصلابة */}
        <mesh position={[3, 0, -5]} rotation={[0, 0.5, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          {/* مادة زجاجية متطورة */}
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.05} // انكسار ضوئي خفيف جداً
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0}
            color="#ffffff" // زجاج نقي
            metalness={0.1}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>

        {/* الشكل الثانوي: شبكة سلكية دقيقة (Wireframe) */}
        {/* يرمز للاتصال والشبكة */}
        <mesh position={[-2, 1.5, -6]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[1.8, 0]} />
          <meshStandardMaterial
            color="#71717a" // Zinc-500
            wireframe
            transparent
            opacity={0.2} // شفاف جداً
          />
        </mesh>

        {/* عنصر ثالث: كرة معدنية مصقولة (Polished Sphere) */}
        <mesh position={[-1, -2, -4]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#a1a1aa" // Zinc-400
            roughness={0.2}
            metalness={1}
          />
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
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

        {/* Lighting: Clean Studio Setup */}
        {/* إضاءة محيطة خافتة جداً */}
        <ambientLight intensity={0.4} color="#ffffff" />

        {/* ضوء رئيسي أبيض بارد */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

        {/* ضوء خافت أزرق (Acccent) من الخلف لإعطاء عمق */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

        {/* النجوم: بعيدة جداً وخافتة */}
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.2} />

        <DataStreamParticles count={400} />
        <AbstractArchitecture />

        {/* الضباب: مهم جداً لدمج الـ 3D مع خلفية الموقع */}
        {/* نستخدم لوناً داكناً (Zinc-950) ليتناسب مع الثيم الداكن، أو يمكن تغييره لشفاف إذا لزم الأمر */}
        <fog attach="fog" args={['#09090b', 5, 20]} />
      </Canvas>
    </div>
  );
}