'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { projectCard } from './projectCard';

// Props from container
interface CardProps { fadeTimeInterval: number; }

const VueCardBase: React.FC<CardProps> = ({ fadeTimeInterval }) => {
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => router.push('/vue-project'), fadeTimeInterval);
  };
  
  return (
    <div className="cursor-pointer" onClick={handleClick} data-testid="vue-card-wrapper">
      <div className="h-48 flex items-center justify-center">
        <span className="text-4xl">🖖</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">Vue Project</h3>
        <p className="text-gray-400 mb-4">A brief description of the Vue project and technologies used.</p>
        <a href="#" className="text-blue-400 hover:underline">View Details →</a>
      </div>
    </div>
  );
};

export default projectCard(VueCardBase, 'hover:bg-[var(--color-vue)]'); 