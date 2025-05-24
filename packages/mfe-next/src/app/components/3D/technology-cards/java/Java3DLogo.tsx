import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const JAVA_COLOR = "#F89820";

export const Java3DLogo: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.4;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <group ref={group}>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.5, 0.5, 1.8, 32]} />
        <meshStandardMaterial
          color={JAVA_COLOR}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

export default Java3DLogo;
