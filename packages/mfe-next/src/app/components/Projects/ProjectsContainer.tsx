'use client';

import React, { useState, useEffect } from "react";
import { ProjectsScene } from "../3D/scenes/projects/ProjectsScene";
import { useRouter } from "next/navigation";

const ProjectsContainer: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // Handle card click
  const handleCardClick = (technology: string) => {
    if (activeCard === technology) {
      setActiveCard(null);
      setIsExpanded(false);
    } else {
      setActiveCard(technology);
      setIsExpanded(true);
    }
  };

  // Handle going back to all cards
  const handleGoBack = () => {
    setActiveCard(null);
    setIsExpanded(false);
  };

  // Add a timer to animate the 3D card when a user clicks a 2D card
  useEffect(() => {
    if (activeCard) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeCard]);

  return (
    <section id="projects" className="py-16 w-full">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        Featured Projects
      </h2>
      <ProjectsScene
        onCardClick={handleCardClick}
        onGoBack={handleGoBack}
        activeCard={activeCard}
      />
      {activeCard && (
        <button
          onClick={handleGoBack}
          className="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md shadow-lg z-10"
        >
          Close
        </button>
      )}
    </section>
  );
};

export default ProjectsContainer; 