"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, Html } from "@react-three/drei";
import * as THREE from "three";

interface ProjectCard3DProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
  children?: React.ReactNode;
  dimmed?: boolean;
  expanded?: boolean;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  position,
  rotation = [0, 0, 0],
  color,
  isActive,
  onClick,
  onGoBack,
  children,
  dimmed = false,
  expanded = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  // Refs for animated objects
  const contentRef = useRef<THREE.Group>(null);

  // Change cursor on hover
  useCursor(hovered);

  // Handle hover animation and active state animation
  useFrame((state) => {
    if (!meshRef.current) return;
    // Animate the content inside the card
    if (contentRef.current) {
      contentRef.current.rotation.y += 0.01;
      contentRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
    // If card is active, animate to center position
    if (isActive) {
      // Only animate scale and rotation for active state
      meshRef.current.scale.set(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1.25, 0.05),
        THREE.MathUtils.lerp(meshRef.current.scale.y, 1.25, 0.05),
        THREE.MathUtils.lerp(meshRef.current.scale.z, 1.25, 0.05)
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
    } else {
      // Return to original position if not active
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

      // Subtle hover animation
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

    // Add a subtle floating effect
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
      {/* Card base */}
      <boxGeometry args={[3, 4.2, 0.2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        opacity={dimmed ? 0.15 : 1}
        transparent={dimmed}
      />

      {/* Technology-specific 3D objects with animation */}
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
