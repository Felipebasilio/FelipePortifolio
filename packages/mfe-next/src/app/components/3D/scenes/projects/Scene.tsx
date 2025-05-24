"use client";

import React, { useRef, useEffect, ReactNode, isValidElement } from "react";
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
  expanded?: boolean;
  children?: ReactNode;
}

const spacingY = 6;
const cardsPerRow = 4;

// Add a type guard for ReactElement with isActive
function isCardElement(child: unknown): child is React.ReactElement<{ isActive: boolean }> {
  return React.isValidElement(child) && typeof (child.props as any).isActive === 'boolean';
}

const Scene: React.FC<SceneProps> = ({
  cardConfigs,
  layout = "grid",
  background,
  extraLights,
  onCardClick,
  onGoBack = () => {},
  activeCard,
  openCard,
  expanded,
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
      if (openCard) {
        e.preventDefault();
        return;
      }
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
  }, [camera.position.z, minY, maxY, layout, openCard]);

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

  // Camera centering logic for open card
  useEffect(() => {
    if (!controlsRef.current || !openCard) return;
    // Find the index of the open card
    const childrenArray = React.Children.toArray(children);
    const openIdx = childrenArray.findIndex(
      (child: any) => child.props && child.props.isActive
    );
    if (openIdx === -1) return;
    const row = Math.floor(openIdx / cardsPerRow);
    let y = -row * spacingY;
    // Always move camera to the left when a card is open
    const x = -8;
    controlsRef.current.setLookAt(x, y, camera.position.z, x, y, 0, true);
  }, [openCard, children, camera.position.z]);

  return (
    <group ref={groupRef}>
      {background}
      {layout === "grid"
        ? React.Children.toArray(children).map((child, idx) => {
            const row = Math.floor(idx / cardsPerRow);
            const col = idx % cardsPerRow;
            let x = (col - 1.5) * spacingX;
            let y = -row * spacingY;
            let z = idx * 0.05;
            // If expanded, move unselected cards far away, and selected card to left
            if (expanded) {
              if (isCardElement(child)) {
                if (child.props.isActive) {
                  x = -8;
                  z = 2;
                } else {
                  x = 1000; // move offscreen
                }
              } else {
                x = 1000; // move offscreen
              }
            }
            return React.cloneElement(child as React.ReactElement<any>, {
              position: [x, y, z],
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
