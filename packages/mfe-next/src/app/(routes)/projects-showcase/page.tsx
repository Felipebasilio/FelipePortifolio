"use client";

import React from "react";
import { ProjectsScene } from "../../components/3D/scenes/projects";

export default function ProjectsShowcasePage() {
  return (
    <div className="w-full h-screen">
      <ProjectsScene
        onCardClick={() => {}}
        onGoBack={() => {}}
        activeCard={null}
        isExpanded={false}
      />
    </div>
  );
}
