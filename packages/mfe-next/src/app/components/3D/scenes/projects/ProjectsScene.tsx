"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene, { SceneProps } from "./Scene";
import Footer from "../../../Footer";

// Import all technology cards
import {
  ReactCard3D,
  AngularCard3D,
  VueCard3D,
  NodeCard3D,
  JavaCard3D,
} from "../../technology-cards";

// Add new imports here as you add new technologies

const technologyCards = [
  { Component: ReactCard3D, id: "react" },
  { Component: AngularCard3D, id: "angular" },
  { Component: VueCard3D, id: "vue" },
  { Component: NodeCard3D, id: "node" },
  { Component: JavaCard3D, id: "java" },
  // Add new cards here
];

export const ProjectsScene: React.FC<
  Omit<SceneProps, "cardConfigs" | "layout">
> = (props) => {
  const [openCard, setOpenCard] = useState<string | null>(null);

  // Calculate the appropriate camera position based on the scene state
  const cameraPosition: [number, number, number] = [0, 0, 13];

  return (
    <div className="relative w-full h-full transition-all duration-1000 ease-in-out">
      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows>
        <Scene
          layout="grid"
          {...props}
          openCard={openCard}
          onCardClick={setOpenCard}
        >
          {technologyCards.map(({ Component, id }) => (
            <Component
              key={id}
              isActive={openCard === id}
              onClick={() => setOpenCard(id)}
              onGoBack={() => setOpenCard(null)}
            />
          ))}
          <Footer3D />
        </Scene>
      </Canvas>
    </div>
  );
};

// 3D Footer overlay at the end of the grid
import { Html } from "@react-three/drei";
const Footer3D = () => (
  <group position={[0, -Math.ceil(technologyCards.length / 4) * 6, 0]}>
    <Html
      center
      style={{
        width: "100vw",
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute",
        bottom: 0,
        margin: 0,
        padding: 0,
        zIndex: 20,
      }}
      pointerEvents="auto"
    >
      <Footer noMargin />
    </Html>
  </group>
);
 