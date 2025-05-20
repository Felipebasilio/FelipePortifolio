"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Showcase3DCard } from "./Showcase3DCard";
import { Group } from "three";
import { useRouter } from "next/navigation";

interface CardConfig {
  technology: string;
  color: string;
  object3D: React.ReactNode;
}

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

interface ProjectsSceneProps {
  onCardClick: (technology: string) => void;
  onGoBack: () => void;
  activeCard: string | null;
  isExpanded: boolean;
}

const spacingY = 6;
const cardsPerRow = 4;

const Scene: React.FC<ProjectsSceneProps> = ({
  onCardClick,
  onGoBack,
  activeCard,
  isExpanded,
}) => {
  const groupRef = useRef<Group>(null);
  const controlsRef = useRef<any>(null);
  const router = useRouter();
  const { camera } = useThree();

  // Calculate Y bounds
  const numRows = Math.ceil(cardConfigs.length / cardsPerRow);
  const minY = -((numRows - 1) * spacingY); // last row
  const maxY = 0; // first row

  // Listen to scroll and move camera Y
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!controlsRef.current) return;
      // Get current camera position
      const currentY = controlsRef.current._camera.position.y;
      // Calculate new Y, clamp to bounds
      let newY = currentY - e.deltaY * 0.01;
      newY = Math.max(minY, Math.min(maxY, newY));
      controlsRef.current.setLookAt(0, newY, camera.position.z, 0, newY, 0, true);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera.position.z, minY, maxY]);

  useFrame(({ clock }) => {
    if (groupRef.current && !isExpanded) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  const handleGoBack = () => {
    onGoBack();
    setTimeout(() => {
      router.push('/projects-showcase');
    }, 300);
  };

  // Responsive grid: 4 per row
  const spacingX = 4.5;
  return (
    <group ref={groupRef}>
      {cardConfigs.map((card, idx) => {
        const row = Math.floor(idx / cardsPerRow);
        const col = idx % cardsPerRow;
        const x = (col - 1.5) * spacingX; // Center 4 cards
        const y = -row * spacingY;
        return (
          <Showcase3DCard
            key={card.technology}
            position={[x, y, idx * 0.05]}
            color={card.color}
            isActive={activeCard === card.technology}
            onClick={() => onCardClick(card.technology)}
            onGoBack={handleGoBack}
          >
            {card.object3D}
          </Showcase3DCard>
        );
      })}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <CameraControls
        ref={controlsRef}
        makeDefault
        minAzimuthAngle={0}
        maxAzimuthAngle={0}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        truckSpeed={0}
        dollySpeed={0}
        verticalDragToForward={false}
      />
    </group>
  );
};

// The main component that will be used by ProjectsContainer
export const ProjectsScene: React.FC<ProjectsSceneProps> = (props) => {
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
        <Scene {...props} />
      </Canvas>
    </div>
  );
};
