"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Showcase3DCard } from "../../Showcase3DCard";
import { Group } from "three";
import { useRouter } from "next/navigation";
import { useCardDetailsStore } from "../../../../../store/slices/cardDetails";
import type { CardDetailsState } from "../../../../../store/slices/cardDetails";

export interface CardConfig {
  technology: string;
  color: string;
  object3D: React.ReactNode;
}

export interface SceneProps {
  cardConfigs?: CardConfig[];
  layout?: "grid" | "single";
  background?: ReactNode;
  extraLights?: ReactNode;
  onCardClick?: (technology: string) => void;
  onGoBack?: () => void;
  activeCard?: string | null;
  openCard?: string | null;
  children?: ReactNode;
}

const spacingY = 6;
const cardsPerRow = 4;

const Scene: React.FC<SceneProps> = ({
  cardConfigs,
  layout = "grid",
  background,
  extraLights,
  onCardClick,
  onGoBack = () => {},
  activeCard,
  openCard,
  children,
}) => {
  const groupRef = useRef<Group>(null);
  const controlsRef = useRef<any>(null);
  const router = useRouter();
  const { camera } = useThree();
  const setCardDetails = useCardDetailsStore(
    (state: CardDetailsState) => state.setCardDetails
  );

  // Calculate Y bounds for grid
  const numRows = Math.ceil(React.Children.count(children) / cardsPerRow);
  const minY = -((numRows - 1) * spacingY); // last row
  const maxY = 0; // first row

  // Listen to scroll and move camera Y (only for grid layout)
  useEffect(() => {
    if (layout !== "grid") return;
    const handleWheel = (e: WheelEvent) => {
      if (!controlsRef.current) return;
      // Get current camera position
      const currentY = controlsRef.current._camera.position.y;
      // Calculate new Y, clamp to bounds
      let newY = currentY - e.deltaY * 0.01;
      newY = Math.max(minY, Math.min(maxY, newY));
      controlsRef.current.setLookAt(
        0,
        newY,
        camera.position.z,
        0,
        newY,
        0,
        true
      );
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera.position.z, minY, maxY, layout]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
      groupRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  // Responsive grid: 4 per row
  const spacingX = 4.5;

  return (
    <group ref={groupRef}>
      {background}
      {layout === "grid"
        ? React.Children.toArray(children).map((child, idx) => {
            const row = Math.floor(idx / cardsPerRow);
            const col = idx % cardsPerRow;
            const x = (col - 1.5) * spacingX;
            const y = -row * spacingY;
            // Clone the child and inject position prop
            return React.cloneElement(child as React.ReactElement<any>, {
              position: [x, y, idx * 0.05],
            });
          })
        : children}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      {extraLights}
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

export default Scene;
