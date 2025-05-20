"use client";

import React, { useRef, useState, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, Html } from "@react-three/drei";
import * as THREE from "three";

interface Showcase3DCardProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
  children?: ReactNode; // External 3D object
}

export const Showcase3DCard: React.FC<Showcase3DCardProps> = ({
  position,
  rotation = [0, 0, 0],
  color,
  isActive,
  onClick,
  onGoBack,
  children,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const contentRef = useRef<THREE.Group>(null);

  useCursor(hovered);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Animate the content inside the card
    if (contentRef.current) {
      contentRef.current.rotation.y += 0.01;
      contentRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
    if (isActive) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        0,
        0.05
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        1,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        0.05
      );
      meshRef.current.scale.set(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1.25, 0.05),
        THREE.MathUtils.lerp(meshRef.current.scale.y, 1.25, 0.05),
        THREE.MathUtils.lerp(meshRef.current.scale.z, 1.25, 0.05)
      );
    } else {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        position[0],
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        position[1],
        0.05
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        position[2],
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        rotation[0],
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1],
        0.05
      );
      if (hovered) {
        meshRef.current.scale.set(
          THREE.MathUtils.lerp(meshRef.current.scale.x, 1.08, 0.1),
          THREE.MathUtils.lerp(meshRef.current.scale.y, 1.08, 0.1),
          THREE.MathUtils.lerp(meshRef.current.scale.z, 1.08, 0.1)
        );
      } else {
        meshRef.current.scale.set(
          THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1),
          THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1),
          THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1)
        );
      }
    }
    if (!isActive) {
      meshRef.current.position.y +=
        Math.sin(state.clock.getElapsedTime() * 1.5) * 0.002;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      castShadow
    >
      <boxGeometry args={[3, 4.2, 0.2]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      {/* Animated 3D content */}
      <group ref={contentRef} position={[0, 0, 0.2]}>
        {children}
      </group>
      {/* Back button - only visible when card is active */}
      {isActive && (
        <Html position={[0, -1.8, 0.2]} transform>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGoBack();
            }}
            className="px-4 py-2 bg-white text-black font-medium rounded-md shadow-lg transform-gpu transition-transform hover:scale-105"
          >
            Back to Projects
          </button>
        </Html>
      )}
    </mesh>
  );
};
