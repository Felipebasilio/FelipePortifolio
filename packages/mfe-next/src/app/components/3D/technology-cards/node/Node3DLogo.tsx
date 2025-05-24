import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COLOR = "#8CC84B";

export const Node3DLogo: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.4;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={NODE_COLOR}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

export default Node3DLogo;
