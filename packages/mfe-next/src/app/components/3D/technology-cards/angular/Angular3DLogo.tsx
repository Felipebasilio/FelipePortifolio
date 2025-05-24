import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ANGULAR_COLOR = "#DD0031";

export const Angular3DLogo: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.4;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <group ref={group}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.2, 1.2, 0.2]} />
        <meshStandardMaterial
          color={ANGULAR_COLOR}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {/* Optionally, add a white 'A' as a 3D text or shape here */}
    </group>
  );
};

export default Angular3DLogo;
