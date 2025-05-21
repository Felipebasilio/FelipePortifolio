"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import DescriptionScene from "./DescriptionScene";

const CardsDescriptionScene: React.FC = () => {
  const cameraPosition: [number, number, number] = [0, 0, 10];
  const router = useRouter();

  return (
    <div className="w-full h-full flex-1">
      {/* Go back button */}
      <button
        onClick={() => router.back()}
        className="z-20 bg-white/80 hover:bg-white text-black px-4 py-2 rounded shadow"
      >
        ← Go Back
      </button>

      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows>
        <DescriptionScene />
      </Canvas>
    </div>
  );
};

export default CardsDescriptionScene;
