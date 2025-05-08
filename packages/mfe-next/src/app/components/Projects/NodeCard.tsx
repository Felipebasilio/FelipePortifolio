'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { projectCard } from './projectCard';

// Props from container
interface CardProps { fadeTimeInterval: number; }

const NodeCardBase: React.FC<CardProps> = ({ fadeTimeInterval }) => {
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => router.push('/node-project'), fadeTimeInterval);
  };
  
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div className="h-48 flex items-center justify-center">
        <span className="text-4xl">🟢</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">Node.js Project</h3>
        <p className="text-gray-400 mb-4">A brief description of the Node.js project and technologies used.</p>
        <a href="#" className="text-blue-400 hover:underline">View Details →</a>
      </div>
    </div>
  );
};

export default projectCard(NodeCardBase, 'hover:bg-[var(--color-node)]'); 