"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import type { Product } from "@/lib/types";

function WheelItem({ index, total, label, color }: { index: number; total: number; label: string; color: string }) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <group position={[x, 0, z]} rotation={[0, -angle, 0]}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh>
          <boxGeometry args={[1.5, 2, 0.12]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
        </mesh>
        <Html center distanceFactor={8} transform>
          <div className="w-32 rounded-2xl border border-white/15 bg-black/75 px-3 py-2 text-center text-xs font-bold uppercase text-white shadow-2xl backdrop-blur-md">
            {label}
          </div>
        </Html>
      </Float>
    </group>
  );
}

export function ProductWheel({ products }: { products: Product[] }) {
  const wheelItems = products.filter((p) => p.wheel);

  return (
    <div className="relative h-[32rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]">
      <Canvas camera={{ position: [0, 0.2, 8.2], fov: 42 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 4, 5]} intensity={2.1} color="#A67C52" />
        <directionalLight position={[-4, 2, -4]} intensity={1.15} color="#cfd6ff" />
        <group rotation={[0, 0.55, 0]}>
          {wheelItems.map((item, index) => (
            <WheelItem key={item.id} index={index} total={wheelItems.length} label={item.shortName} color={item.color} />
          ))}
        </group>
      </Canvas>
    </div>
  );
}
