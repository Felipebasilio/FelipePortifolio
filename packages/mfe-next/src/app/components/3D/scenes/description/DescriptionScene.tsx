"use client";

import React from "react";
import { useCardDetailsStore } from "../../../../../store/slices/cardDetails";
import { Sky } from "@react-three/drei";
import Scene, { CardConfig } from "../projects/Scene";

const stackMap: Record<string, React.ReactNode> = {
  React: (
    <mesh position={[0, 0, 0.5]}>
      <torusGeometry args={[0.8, 0.3, 16, 100]} />
      <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
    </mesh>
  ),
  Angular: (
    <mesh position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 4]}>
      <boxGeometry args={[1.2, 1.2, 0.2]} />
      <meshStandardMaterial color="#DD0031" metalness={0.8} roughness={0.2} />
    </mesh>
  ),
  Vue: (
    <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 6, 0, 0]}>
      <coneGeometry args={[0.8, 1.8, 32]} />
      <meshStandardMaterial color="#42B883" metalness={0.8} roughness={0.2} />
    </mesh>
  ),
  Node: (
    <mesh position={[0, 0, 0.5]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#8CC84B" metalness={0.8} roughness={0.2} />
    </mesh>
  ),
  Java: (
    <mesh position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 6]}>
      <cylinderGeometry args={[0.5, 0.5, 1.8, 32]} />
      <meshStandardMaterial color="#F89820" metalness={0.8} roughness={0.2} />
    </mesh>
  ),
};

const DescriptionScene: React.FC = () => {
  const { stackKey } = useCardDetailsStore();

  const cardConfigs: CardConfig[] = stackKey
    ? [
        { technology: stackKey, color: "#fff", object3D: stackMap[stackKey] },
        {
          technology: stackKey + "-content",
          color: "#fff",
          object3D: stackMap[stackKey],
        },
      ]
    : [];

  return (
    <Scene
      cardConfigs={cardConfigs}
      layout="single"
      background={<Sky sunPosition={[100, 20, 100]} />}
      />
  );
};

export default DescriptionScene;
