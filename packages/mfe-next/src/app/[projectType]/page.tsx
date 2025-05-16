"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Define data for each project type
const projectData = {
  angular: {
    name: "Angular Project",
    color: "var(--color-angular)",
    description:
      "A comprehensive SPA built with Angular, featuring state management with NgRx, lazy loading modules, and Angular Material components.",
    features: [
      "Component-based architecture",
      "Reactive forms with validation",
      "HTTP interceptors for authentication",
      "RxJS for handling asynchronous operations",
    ],
    technologies: ["Angular", "TypeScript", "RxJS", "NgRx", "Angular Material"],
  },
  react: {
    name: "React Project",
    color: "var(--color-react)",
    description:
      "A modern React application leveraging functional components and hooks, with a focus on performance optimization and clean code architecture.",
    features: [
      "Custom hooks for shared logic",
      "Context API for state management",
      "Suspense and code splitting",
      "CSS-in-JS styling with Styled Components",
    ],
    technologies: [
      "React",
      "TypeScript",
      "React Router",
      "Styled Components",
      "Jest",
    ],
  },
  vue: {
    name: "Vue Project",
    color: "var(--color-vue)",
    description:
      "A Vue.js application utilizing the Composition API and Vue 3 features, with a focus on component reusability and maintainability.",
    features: [
      "Vue 3 Composition API",
      "Vuex for state management",
      "Vue Router with navigation guards",
      "Vite for fast development",
    ],
    technologies: ["Vue.js", "JavaScript", "Vuex", "Vue Router", "Vite"],
  },
  node: {
    name: "Node.js Project",
    color: "var(--color-node)",
    description:
      "A Node.js backend service using Express, featuring a RESTful API design, database integration, and comprehensive error handling.",
    features: [
      "RESTful API endpoints",
      "MongoDB integration with Mongoose",
      "JWT authentication",
      "Error middleware and logging",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Jest"],
  },
  java: {
    name: "Java Project",
    color: "var(--color-java)",
    description:
      "An enterprise-grade Java application built with Spring Boot, featuring microservices architecture and robust data handling.",
    features: [
      "Microservices with Spring Boot",
      "Spring Security for authentication",
      "JPA/Hibernate for ORM",
      "Kafka for messaging",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JPA/Hibernate",
      "Kafka",
    ],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const projectType = params.projectType as string;
  const project = projectData[projectType as keyof typeof projectData];

  // Fallback if project type doesn't exist
  if (!project) {
    return (
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Project Not Found
          </h1>
          <p className="mb-6">
            Sorry, the project you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {/* Header */}
        <div
          className="p-8 relative"
          style={{ backgroundColor: project.color }}
        >
          <h1 className="text-4xl font-bold text-white">{project.name}</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-300 mb-8">{project.description}</p>

          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc pl-6 mb-8">
            {project.features.map((feature, index) => (
              <li key={index} className="text-gray-300 mb-2">
                {feature}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href="/"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 inline-block"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
