"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, Html } from "@react-three/drei";
import * as THREE from "three";

interface ProjectCard3DProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  technology: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  position,
  rotation = [0, 0, 0],
  color,
  technology,
  isActive,
  onClick,
  onGoBack,
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
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />

      {/* Technology-specific 3D objects with animation */}
      {technology === "React" && (
        <group ref={contentRef} position={[0, 0, 0.2]}>
          <mesh position={[0, 0, 0.7]}>
            <torusGeometry args={[0.8, 0.3, 16, 100]} />
            <meshStandardMaterial
              color="#61DAFB"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}

      {technology === "Angular" && (
        <group ref={contentRef} position={[0, 0, 0.2]}>
          <mesh position={[0, 0, 0.7]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1.2, 1.2, 0.2]} />
            <meshStandardMaterial
              color="#DD0031"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}

      {technology === "Vue" && (
        <group ref={contentRef} position={[0, 0, 0.2]}>
          <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 6, 0, 0]}>
            <coneGeometry args={[0.8, 1.8, 32]} />
            <meshStandardMaterial
              color="#42B883"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}

      {technology === "Node" && (
        <group ref={contentRef} position={[0, 0, 0.2]}>
          <mesh position={[0, 0, 0.7]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
              color="#8CC84B"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}

      {technology === "Java" && (
        <group ref={contentRef} position={[0, 0, 0.2]}>
          <mesh position={[0, 0, 0.7]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.5, 0.5, 1.8, 32]} />
            <meshStandardMaterial
              color="#F89820"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}

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
