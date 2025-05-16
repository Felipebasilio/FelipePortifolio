'use client';

import React from 'react';
import {
  AngularCard,
  ReactCard,
  VueCard,
  NodeCard,
  JavaCard,
} from "./CardsComponents";

const ProjectsContainer: React.FC = () => {
  const cards = [
    AngularCard,
    ReactCard,
    VueCard,
    NodeCard,
    JavaCard,
  ];

  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((Card, idx) => (
          <Card key={idx} fadeTimeInterval={2000} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsContainer; 