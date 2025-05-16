'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { projectCard } from '../projectCard';

// Props from container
interface CardProps { fadeTimeInterval: number; }

const ReactCardBase: React.FC<CardProps> = ({ fadeTimeInterval }) => {
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => router.push("/react"), fadeTimeInterval);
  };
  
  return (
    <div className="cursor-pointer" onClick={handleClick} data-testid="react-card-wrapper">
      <div className="h-48 flex items-center justify-center">
        <span className="text-4xl">⚛️</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">React Project</h3>
        <p className="text-gray-400 mb-4">A brief description of the React project and technologies used.</p>
        <a href="#" className="text-blue-400 hover:underline">View Details →</a>
      </div>
    </div>
  );
};

export default projectCard(ReactCardBase, 'hover:bg-[var(--color-react)]'); 