"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene, { SceneProps } from "./Scene";
import DetailsPanel3D from "../../../DetailsPanel/DetailsPanel3D";
import Footer3D from "../../../Footer3D";
import BlankSheet3D from "../../../BlankSheet3D";

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
  const [expanded, setExpanded] = useState(false);

  // Calculate the appropriate camera position based on the scene state
  const cameraPosition: [number, number, number] = [0, 0, 13];

  // Handle card click
  const handleCardClick = (id: string) => {
    setOpenCard(id);
    setTimeout(() => setExpanded(true), 400); // allow for scale-up animation
  };
  const handleGoBack = () => {
    setExpanded(false);
    setTimeout(() => setOpenCard(null), 400); // allow for scale-down animation
  };

  return (
    <div className="relative w-full h-full transition-all duration-1000 ease-in-out">
      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows>
        <Scene
          layout="grid"
          {...props}
          openCard={openCard}
          expanded={expanded}
          onCardClick={handleCardClick}
        >
          {technologyCards.map(({ Component, id }) => (
            <Component
              key={id}
              isActive={openCard === id}
              dimmed={!!openCard && openCard !== id}
              expanded={expanded && openCard === id}
              onClick={() => handleCardClick(id)}
              onGoBack={handleGoBack}
            />
          ))}
          {expanded && openCard && <BlankSheet3D />}
          {expanded && openCard && (
            <DetailsPanel3D cardId={openCard} onGoBack={handleGoBack} />
          )}
          <Footer3D />
        </Scene>
      </Canvas>
    </div>
  );
};