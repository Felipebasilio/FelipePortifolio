"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene, { CardConfig, SceneProps } from "./Scene";

const cardConfigs: CardConfig[] = [
  {
    technology: "React",
    color: "#61DAFB",
    object3D: (
      <mesh position={[0, 0, 0.5]}>
        <torusGeometry args={[0.8, 0.3, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
      </mesh>
    ),
  },
  {
    technology: "Angular",
    color: "#DD0031",
    object3D: (
      <mesh position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#DD0031" metalness={0.8} roughness={0.2} />
      </mesh>
    ),
  },
  {
    technology: "Vue",
    color: "#42B883",
    object3D: (
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 6, 0, 0]}>
        <coneGeometry args={[0.8, 1.8, 32]} />
        <meshStandardMaterial color="#42B883" metalness={0.8} roughness={0.2} />
      </mesh>
    ),
  },
  {
    technology: "Node",
    color: "#8CC84B",
    object3D: (
      <mesh position={[0, 0, 0.5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#8CC84B" metalness={0.8} roughness={0.2} />
      </mesh>
    ),
  },
  {
    technology: "Java",
    color: "#F89820",
    object3D: (
      <mesh position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.5, 0.5, 1.8, 32]} />
        <meshStandardMaterial color="#F89820" metalness={0.8} roughness={0.2} />
      </mesh>
    ),
  },
];

export const ProjectsScene: React.FC<
  Omit<SceneProps, "cardConfigs" | "layout">
> = (props) => {
  // Calculate the appropriate camera position based on the scene state
  const cameraPosition: [number, number, number] = props.isExpanded
    ? [0, 0, 10]
    : [0, 0, 13];

  return (
    <div
      className={`relative w-full transition-all duration-1000 ease-in-out ${
        props.isExpanded ? "h-[700px]" : "h-[500px]"
      }`}
    >
      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows>
        <Scene cardConfigs={cardConfigs} layout="grid" {...props} />
      </Canvas>
    </div>
  );
};
 