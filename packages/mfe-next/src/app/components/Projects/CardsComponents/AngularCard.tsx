'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { projectCard } from '../projectCard';

interface CardProps {
  fadeTimeInterval: number;
}

const AngularCardBase: React.FC<CardProps> = ({ fadeTimeInterval }) => {
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => {
      router.push("/angular");
    }, fadeTimeInterval);
  };

  return (
    <div className="cursor-pointer" onClick={handleClick} data-testid="angular-card-wrapper">
      <div className="h-48 flex items-center justify-center">
        <span className="text-4xl">🅰️</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">Angular Project</h3>
        <p className="text-gray-400 mb-4">A brief description of the Angular project and technologies used.</p>
        <a href="#" className="text-blue-400 hover:underline">View Details →</a>
      </div>
    </div>
  );
};

export default projectCard(AngularCardBase, 'hover:bg-[var(--color-angular)]'); 