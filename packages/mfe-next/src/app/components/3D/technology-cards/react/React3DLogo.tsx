import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A 3D React atom logo: three ellipses (torus) rotated, and a central sphere
const ATOM_COLOR = "#7FDBFF"; // Lighter blue
const ATOM_METALNESS = 0.8;
const ATOM_ROUGHNESS = 0.15;

export const React3DLogo: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      // Smooth, subtle rotation animation
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.5;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.3;
      group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return (
    <group ref={group}>
      {/* Three ellipses (torus) rotated */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={ATOM_COLOR}
          metalness={ATOM_METALNESS}
          roughness={ATOM_ROUGHNESS}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={ATOM_COLOR}
          metalness={ATOM_METALNESS}
          roughness={ATOM_ROUGHNESS}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={ATOM_COLOR}
          metalness={ATOM_METALNESS}
          roughness={ATOM_ROUGHNESS}
        />
      </mesh>
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.27, 32, 32]} />
        <meshStandardMaterial
          color={ATOM_COLOR}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

export default React3DLogo;
