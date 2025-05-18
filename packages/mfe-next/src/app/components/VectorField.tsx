"use client";

import React, { useEffect, useRef, useState } from "react";

// Add custom colors for the vector field
const VECTOR_COLORS = {
  line: {
    r: 255,
    g: 255,
    b: 255,
  },
  dot: {
    r: 255, 
    g: 255,
    b: 255,
  }
};

interface Vector {
  x: number;
  y: number;
  angle: number;
  length: number;
  originalLength: number;
}

const VectorField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const vectorsRef = useRef<Vector[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Initialize the canvas and vectors
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });

        // Create vectors
        const spacing = 50;
        const vectors: Vector[] = [];

        for (let x = spacing / 2; x < rect.width; x += spacing) {
          for (let y = spacing / 2; y < rect.height; y += spacing) {
            // Add slight randomization to positions for a more organic feel
            const jitterX = Math.random() * spacing * 0.3 - spacing * 0.15;
            const jitterY = Math.random() * spacing * 0.3 - spacing * 0.15;
            const posX = x + jitterX;
            const posY = y + jitterY;

            // Initialize with vectors pointing in various directions in a more organized pattern
            const angle =
              Math.atan2(posY - rect.height / 2, posX - rect.width / 2) +
              (Math.random() * 0.5 - 0.25); // Add slight randomness
            const length = Math.random() * 5 + 5;
            vectors.push({
              x: posX,
              y: posY,
              angle,
              length,
              originalLength: length,
            });
          }
        }

        vectorsRef.current = vectors;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (canvasRef.current && e.touches.length > 0) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Draw the vector field
  useEffect(() => {
    if (!canvasRef.current || vectorsRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set the start time if not already set
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Calculate animation progress (0 to 1 over 2 seconds)
      const elapsedMs = Date.now() - startTimeRef.current;
      const animProgress = Math.min(1, elapsedMs / 2000);

      // Update and draw each vector
      vectorsRef.current.forEach((vector) => {
        // Fade-in animation scaling factor
        const fadeInScale = animProgress;

        const dx = mousePos.x - vector.x;
        const dy = mousePos.y - vector.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.min(dimensions.width, dimensions.height) / 2;

        // Calculate vector angle based on mouse position
        const targetAngle = Math.atan2(dy, dx);
        // Smooth interpolation between current and target angle
        const angleDiff = targetAngle - vector.angle;
        // Normalize the angle difference to range [-PI, PI]
        const normalizedDiff = Math.atan2(
          Math.sin(angleDiff),
          Math.cos(angleDiff)
        );
        // Smoothly rotate towards the target angle
        vector.angle += normalizedDiff * 0.05;

        // Calculate vector length based on mouse distance
        const distanceFactor = Math.max(0, 1 - distance / maxDistance);
        vector.length =
          (vector.originalLength + distanceFactor * 12) * fadeInScale;

        // Calculate opacity based on mouse distance
        const opacity = (0.15 + distanceFactor * 0.6) * fadeInScale;

        // Calculate end point
        const endX = vector.x + Math.cos(vector.angle) * vector.length;
        const endY = vector.y + Math.sin(vector.angle) * vector.length;

        // Draw the vector
        ctx.beginPath();
        ctx.moveTo(vector.x, vector.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${VECTOR_COLORS.line.r}, ${VECTOR_COLORS.line.g}, ${VECTOR_COLORS.line.b}, ${opacity})`;
        ctx.lineWidth = distanceFactor * 2 + 0.5;
        ctx.stroke();

        // Draw the dot
        ctx.beginPath();
        ctx.arc(vector.x, vector.y, distanceFactor * 2 + 1, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${VECTOR_COLORS.dot.r}, ${VECTOR_COLORS.dot.g}, ${
          VECTOR_COLORS.dot.b
        }, ${opacity * 0.7})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-40 pointer-events-none"
    />
  );
};

export default VectorField;
