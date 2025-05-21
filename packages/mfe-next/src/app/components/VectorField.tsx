"use client";

import React, { useEffect, useRef, useState } from "react";

// Define color gradient sets for different field types
const COLOR_GRADIENTS = {
  // For ROTATIONAL and DIVERGENT
  set1: [
    { r: 0, g: 100, b: 200 }, // Blue (low magnitude)
    { r: 0, g: 100, b: 0 }, // Green (medium magnitude)
    { r: 155, g: 50, b: 50 }, // Red (high magnitude)
  ],
  // For GRADIENT and SADDLE
  set2: [
    { r: 0, g: 100, b: 0 }, // Green (low magnitude)
    { r: 155, g: 50, b: 50 }, // Red (medium magnitude)
    { r: 0, g: 100, b: 200 }, // Blue (high magnitude)
  ],
  // For SINK and CUSTOM
  set3: [
    { r: 155, g: 50, b: 50 }, // Red (low magnitude)
    { r: 0, g: 100, b: 200 }, // Blue (medium magnitude)
    { r: 0, g: 100, b: 0 }, // Green (high magnitude)
  ],
};

interface Vector {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  magnitude: number;
}

// Vector field types
enum VectorFieldType {
  ROTATIONAL = "rotational", // Curl field (∇ × F)
  DIVERGENT = "divergent", // Divergence field (∇ · F)
  GRADIENT = "gradient", // Gradient field (∇f)
  SADDLE = "saddle", // Saddle point
  SINK = "sink", // Sink/source points
  CUSTOM = "custom", // Custom combinations
}

const VectorField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const vectorsRef = useRef<Vector[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Current and next field type to enable smooth transitions
  const currentFieldTypeRef = useRef<VectorFieldType>(
    VectorFieldType.ROTATIONAL
  );
  const nextFieldTypeRef = useRef<VectorFieldType>(VectorFieldType.DIVERGENT);
  const lastFieldChangeRef = useRef<number>(0);
  const fieldDurationRef = useRef<number>(16000); // ms before changing field type
  const transitionDurationRef = useRef<number>(5000); // ms for transition duration

  // Initialize the canvas and vectors
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });

        // Generate vector field
        generateVectorField(rect.width, rect.height);
      }
    };

    const generateVectorField = (width: number, height: number) => {
      const spacing = 40; // Adjust density of vectors
      const vectors: Vector[] = [];

      // Create normalized coordinates for mathematical functions
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          // Add slight jitter to positions for organic feel
          const jitterX = Math.random() * spacing * 0.2 - spacing * 0.1;
          const jitterY = Math.random() * spacing * 0.2 - spacing * 0.1;
          const posX = x + jitterX;
          const posY = y + jitterY;

          // Initialize with dummy vectors - actual vector calculation will be done in animation loop
          const vector = {
            x: posX,
            y: posY,
            vx: 0,
            vy: 0,
            length: 0,
            magnitude: 0,
          };

          vectors.push(vector);
        }
      }

      vectorsRef.current = vectors;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Get color gradient based on current field type
  const getColorGradientForFieldType = (
    fieldType: VectorFieldType,
    transitionProgress: number
  ) => {
    // Determine which color set to use based on field type
    let colorSet;

    if (
      fieldType === VectorFieldType.ROTATIONAL ||
      fieldType === VectorFieldType.DIVERGENT
    ) {
      colorSet = COLOR_GRADIENTS.set1;
    } else if (
      fieldType === VectorFieldType.GRADIENT ||
      fieldType === VectorFieldType.SADDLE
    ) {
      colorSet = COLOR_GRADIENTS.set2;
    } else {
      // SINK or CUSTOM
      colorSet = COLOR_GRADIENTS.set3;
    }

    return colorSet;
  };

  // Interpolate between two color sets during transitions
  const getTransitionColorGradient = (
    currentType: VectorFieldType,
    nextType: VectorFieldType,
    progress: number
  ) => {
    const currentSet = getColorGradientForFieldType(currentType, 0);
    const nextSet = getColorGradientForFieldType(nextType, 1);

    // If they're from the same color set, no need to transition
    if (
      (currentType === VectorFieldType.ROTATIONAL &&
        nextType === VectorFieldType.DIVERGENT) ||
      (currentType === VectorFieldType.DIVERGENT &&
        nextType === VectorFieldType.ROTATIONAL) ||
      (currentType === VectorFieldType.GRADIENT &&
        nextType === VectorFieldType.SADDLE) ||
      (currentType === VectorFieldType.SADDLE &&
        nextType === VectorFieldType.GRADIENT) ||
      (currentType === VectorFieldType.SINK &&
        nextType === VectorFieldType.CUSTOM) ||
      (currentType === VectorFieldType.CUSTOM &&
        nextType === VectorFieldType.SINK)
    ) {
      return currentSet;
    }

    // Create a blended color set for smooth transitions
    return currentSet.map((color, index) => {
      return {
        r: Math.round(color.r * (1 - progress) + nextSet[index].r * progress),
        g: Math.round(color.g * (1 - progress) + nextSet[index].g * progress),
        b: Math.round(color.b * (1 - progress) + nextSet[index].b * progress),
      };
    });
  };

  // Interpolate between gradient colors based on magnitude
  const getColorForMagnitude = (
    magnitude: number,
    fieldType: VectorFieldType,
    transitionProgress: number
  ) => {
    // Get appropriate color gradient for the current state
    const colorGradient = getTransitionColorGradient(
      currentFieldTypeRef.current,
      nextFieldTypeRef.current,
      transitionProgress
    );

    // Convert magnitude from 0-1 to an index in our gradient array
    const scaledMagnitude =
      Math.min(0.99, Math.max(0, magnitude)) * (colorGradient.length - 1);
    const lowerIndex = Math.floor(scaledMagnitude);
    const upperIndex = Math.min(colorGradient.length - 1, lowerIndex + 1);
    const blend = scaledMagnitude - lowerIndex;

    // Interpolate between colors
    const lowerColor = colorGradient[lowerIndex];
    const upperColor = colorGradient[upperIndex];

    return {
      r: Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * blend),
      g: Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * blend),
      b: Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * blend),
    };
  };

  // Generate smoothly varying parameters for animation
  const getSmoothTimeVariation = (
    time: number,
    frequency: number = 1,
    amplitude: number = 1,
    phase: number = 0,
    offset: number = 0
  ) => {
    return offset + amplitude * Math.sin(time * frequency + phase);
  };

  // Animation loop to render and update vector field
  useEffect(() => {
    if (!canvasRef.current || vectorsRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set the start time if not already set
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
      lastFieldChangeRef.current = Date.now();
    }

    const animate = (timestamp: number) => {
      timeRef.current = timestamp / 500; // Convert to seconds
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Check if we should change field type
      const currentTime = Date.now();
      const timeSinceLastChange = currentTime - lastFieldChangeRef.current;

      if (timeSinceLastChange > fieldDurationRef.current) {
        // Rotate through field types
        const fieldTypes = Object.values(VectorFieldType);
        const currentIndex = fieldTypes.indexOf(nextFieldTypeRef.current);
        const nextIndex = (currentIndex + 1) % fieldTypes.length;

        // Update field types
        currentFieldTypeRef.current = nextFieldTypeRef.current;
        nextFieldTypeRef.current = fieldTypes[nextIndex] as VectorFieldType;
        lastFieldChangeRef.current = currentTime;
      }

      // Calculate animation progress (fade-in)
      const elapsedMs = currentTime - startTimeRef.current;
      const animProgress = Math.min(1, elapsedMs / 2000);

      // Calculate transition progress
      const transitionProgress = Math.min(
        1,
        timeSinceLastChange / transitionDurationRef.current
      );

      // Update all vectors based on current field type and time
      updateVectorField(transitionProgress);

      // Render all vectors
      vectorsRef.current.forEach((vector) => {
        const fadeInScale = animProgress;

        // Calculate end point - apply normalized vector direction
        const length = vector.length * fadeInScale;
        const endX =
          vector.x + (vector.vx / (vector.magnitude || 0.01)) * length;
        const endY =
          vector.y + (vector.vy / (vector.magnitude || 0.01)) * length;

        // Apply subtle pulsing to opacity based on time and position
        const positionFactor =
          (Math.sin(vector.x * 0.01 + vector.y * 0.01 + timeRef.current * 0.5) +
            1) *
          0.15;

        // Calculate opacity based on magnitude with subtle pulsing
        const opacity =
          (0.3 + vector.magnitude * 0.5 + positionFactor) * fadeInScale;

        // Get color based on magnitude and current field type
        const color = getColorForMagnitude(
          vector.magnitude,
          currentFieldTypeRef.current,
          transitionProgress
        );

        // Draw the vector line with gradient color
        ctx.beginPath();
        ctx.moveTo(vector.x, vector.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        ctx.lineWidth = vector.magnitude * 2 + 0.5;
        ctx.stroke();

        // Draw the dot with gradient color
        ctx.beginPath();
        ctx.arc(vector.x, vector.y, vector.magnitude * 2 + 1, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${
          opacity * 0.9
        })`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const updateVectorField = (transitionProgress: number) => {
      const time = timeRef.current;
      const vectors = vectorsRef.current;

      if (!vectors.length || !dimensions.width) return;

      // Calculate vector components for current and next field types
      vectors.forEach((vector) => {
        // Normalize coordinates to [-1, 1] for mathematical functions
        const nx = (vector.x / dimensions.width) * 2 - 1;
        const ny = (vector.y / dimensions.height) * 2 - 1;

        // Calculate vector components for current and next field types
        const current = calculateFieldVector(
          currentFieldTypeRef.current,
          nx,
          ny,
          time
        );
        const next = calculateFieldVector(
          nextFieldTypeRef.current,
          nx,
          ny,
          time
        );

        // Smoothly interpolate between current and next field vectors
        const vx =
          current.vx * (1 - transitionProgress) + next.vx * transitionProgress;
        const vy =
          current.vy * (1 - transitionProgress) + next.vy * transitionProgress;

        // Calculate magnitude and normalize
        const magnitude = Math.sqrt(vx * vx + vy * vy);
        const normalizedMagnitude = Math.min(1, magnitude);

        // Update vector properties
        vector.vx = vx;
        vector.vy = vy;
        vector.magnitude = normalizedMagnitude;

        // Add subtle variation to vector length based on time and position
        const lengthVariation = 0.2 * Math.sin(nx * 5 + ny * 5 + time * 0.5);
        vector.length = 5 + normalizedMagnitude * 15 + lengthVariation;
      });
    };

    // Calculate vector components for a specific field type
    const calculateFieldVector = (
      fieldType: VectorFieldType,
      nx: number,
      ny: number,
      time: number
    ) => {
      let vx = 0;
      let vy = 0;

      // Time-based factors for animation
      const t = time * 0.3;

      // Primary oscillations with different frequencies
      const sinT1 = Math.sin(t * 0.2);
      const cosT1 = Math.cos(t * 0.3);
      const sinT2 = Math.sin(t * 0.5);
      const cosT2 = Math.cos(t * 0.4);

      // Secondary oscillations for more complex movement
      const sinT3 = Math.sin(t * 0.7 + nx * 2);
      const cosT3 = Math.cos(t * 0.6 + ny * 2);

      switch (fieldType) {
        case VectorFieldType.ROTATIONAL:
          // Enhanced curl field with time-varying rotation centers and speeds

          // Create multiple rotation centers that move over time
          const rotCenter1x = 0.3 * Math.sin(t * 0.15);
          const rotCenter1y = 0.2 * Math.cos(t * 0.17);
          const rotCenter2x = -0.4 * Math.cos(t * 0.12);
          const rotCenter2y = -0.3 * Math.sin(t * 0.14);

          // Distance from rotation centers
          const rdx1 = nx - rotCenter1x;
          const rdy1 = ny - rotCenter1y;
          const rdx2 = nx - rotCenter2x;
          const rdy2 = ny - rotCenter2y;

          // Calculate rotation intensities that vary with time
          const rot1Intensity = 1 + 0.5 * sinT1;
          const rot2Intensity = 0.7 + 0.3 * cosT2;

          // First rotation field
          const rx1 = -rdy1 * rot1Intensity;
          const ry1 = rdx1 * rot1Intensity;

          // Second rotation field
          const rx2 = -rdy2 * rot2Intensity;
          const ry2 = rdx2 * rot2Intensity;

          // Blend the two rotation fields with time-varying weights
          const rotBlend = 0.5 + 0.3 * sinT3;
          vx = rx1 * rotBlend + rx2 * (1 - rotBlend);
          vy = ry1 * rotBlend + ry2 * (1 - rotBlend);

          // Add small wave-like perturbation
          vx += 0.2 * Math.sin(ny * 5 + t);
          vy += 0.2 * Math.sin(nx * 5 + t * 1.1);
          break;

        case VectorFieldType.DIVERGENT:
          // Enhanced divergence field - vectors point outward/inward from multiple centers

          // Create multiple divergence centers that move over time
          const centers = [
            {
              x: 0.3 * Math.cos(t * 0.15),
              y: 0.3 * Math.sin(t * 0.23),
              strength: 0.8 + 0.4 * Math.sin(t * 0.31), // Oscillating strength
              isSource: true, // Outward flow
            },
            {
              x: -0.4 * Math.sin(t * 0.17),
              y: -0.3 * Math.cos(t * 0.19),
              strength: 0.6 + 0.3 * Math.cos(t * 0.29), // Oscillating strength
              isSource: false, // Inward flow
            },
            {
              x: 0.1 * Math.cos(t * 0.27),
              y: -0.5 * Math.sin(t * 0.21),
              strength: 0.5 + 0.3 * Math.sin(t * 0.43), // Oscillating strength
              isSource: true, // Outward flow
            },
          ];

          // Combined vector from all centers
          vx = 0;
          vy = 0;

          centers.forEach((center) => {
            // Calculate distance from center
            const dx = nx - center.x;
            const dy = ny - center.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Calculate influence with smooth falloff
            const influence = center.strength / (dist + 0.1);

            // Add vector component - direction based on source/sink
            const direction = center.isSource ? 1 : -1;
            vx += dx * influence * direction;
            vy += dy * influence * direction;
          });

          // Add spiraling effect
          const spiralFactor = 0.3 * sinT2;
          const spiralX = -vy * spiralFactor;
          const spiralY = vx * spiralFactor;

          vx += spiralX;
          vy += spiralY;
          break;

        case VectorFieldType.GRADIENT:
          // Enhanced gradient field with evolving potential function

          // Create a more complex time-varying potential function
          const potentialFn = (x: number, y: number) => {
            // Multiple frequency components
            const freqX1 = 3 + 0.5 * sinT1;
            const freqY1 = 2 + 0.5 * cosT2;
            const freqX2 = 2 + 0.5 * sinT3;
            const freqY2 = 3 + 0.5 * cosT3;

            // Phase shifts
            const phaseShift1 = t * 0.1;
            const phaseShift2 = t * 0.15;

            // Amplitude modulation
            const amp1 = 1 + 0.2 * sinT2;
            const amp2 = 1 + 0.3 * cosT3;

            return (
              amp1 *
                Math.sin(x * freqX1 + phaseShift1) *
                Math.cos(y * freqY1 + phaseShift1) +
              amp2 * Math.sin(x * freqX2 + y * freqY2 + phaseShift2)
            );
          };

          // Calculate gradient using finite differences
          const h = 0.01;
          const gradX =
            (potentialFn(nx + h, ny) - potentialFn(nx - h, ny)) / (2 * h);
          const gradY =
            (potentialFn(nx, ny + h) - potentialFn(nx, ny - h)) / (2 * h);

          // Apply time-varying scaling to gradient
          const gradScale = 1 + 0.3 * Math.sin(t * 0.25);
          vx = gradX * gradScale;
          vy = gradY * gradScale;
          break;

        case VectorFieldType.SADDLE:
          // Enhanced saddle point field with evolving parameters

          // Create dynamic saddle behavior
          const saddleAngle = t * 0.1; // Rotating saddle
          const saddleScale = 1 + 0.4 * Math.sin(t * 0.17); // Pulsing scale

          // Basic saddle along rotating axes
          const cos_angle = Math.cos(saddleAngle);
          const sin_angle = Math.sin(saddleAngle);

          // Rotate coordinates for the saddle
          const rx = nx * cos_angle - ny * sin_angle;
          const ry = nx * sin_angle + ny * cos_angle;

          // Calculate saddle pattern in rotated coordinates
          vx = rx * saddleScale;
          vy = -ry * saddleScale;

          // Rotate vector back to original coordinates
          const temp_vx = vx * cos_angle + vy * sin_angle;
          const temp_vy = -vx * sin_angle + vy * cos_angle;
          vx = temp_vx;
          vy = temp_vy;

          // Add spatial distortion effect
          vx += 0.3 * Math.sin(ny * 4 + t * 0.3);
          vy += 0.3 * Math.sin(nx * 4 + t * 0.35);
          break;

        case VectorFieldType.SINK:
          // Enhanced sink/source field with dynamic behavior

          // Create dynamic sink/source points with varying parameters
          const points = [
            {
              x: 0.5 * Math.sin(t * 0.11),
              y: 0.3 * Math.cos(t * 0.13),
              strength: Math.sin(t * 0.17), // Oscillates between source and sink
              radius: 0.2 + 0.1 * Math.sin(t * 0.21), // Pulsing radius
            },
            {
              x: -0.3 * Math.cos(t * 0.09),
              y: 0.4 * Math.sin(t * 0.15),
              strength: Math.cos(t * 0.19), // Oscillates between source and sink
              radius: 0.15 + 0.1 * Math.cos(t * 0.23), // Pulsing radius
            },
            {
              x: 0.2 * Math.sin(t * 0.14),
              y: -0.5 * Math.cos(t * 0.12),
              strength: Math.sin(t * 0.31), // Oscillates between source and sink
              radius: 0.25 + 0.1 * Math.sin(t * 0.27), // Pulsing radius
            },
          ];

          vx = 0;
          vy = 0;

          points.forEach((point) => {
            const dx = nx - point.x;
            const dy = ny - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Dynamic influence function with smooth falloff based on pulsing radius
            const falloff = Math.exp(-dist / point.radius);
            const influence = point.strength * falloff;

            // Add vector component
            vx += dx * influence;
            vy += dy * influence;
          });

          // Add spiraling effect that varies with position
          const positionDependentSpin = (nx * nx + ny * ny) * 0.5;
          const spinFactor = 0.4 * Math.sin(t * 0.29 + positionDependentSpin);
          const spinX = -vy * spinFactor;
          const spinY = vx * spinFactor;

          vx += spinX;
          vy += spinY;
          break;

        case VectorFieldType.CUSTOM:
          // Enhanced custom field with multiple interacting components

          // Create multiple interacting fields that evolve over time

          // 1. Rotational component
          const rot_strength = 0.5 + 0.2 * sinT1;
          const rot_x = -ny * rot_strength;
          const rot_y = nx * rot_strength;

          // 2. Wave component with varying frequency and amplitude
          const waveFreqX = 3 + 2 * Math.sin(t * 0.31);
          const waveFreqY = 2 + 2 * Math.cos(t * 0.27);
          const waveAmpX = 0.7 + 0.3 * sinT2;
          const waveAmpY = 0.5 + 0.3 * cosT2;

          const wave_x = waveAmpX * Math.sin(ny * waveFreqX + t * 0.41);
          const wave_y = waveAmpY * Math.cos(nx * waveFreqY + t * 0.37);

          // 3. Divergence component with moving center
          const divCenterX = 0.2 * Math.sin(t * 0.17);
          const divCenterY = 0.2 * Math.cos(t * 0.19);
          const dx = nx - divCenterX;
          const dy = ny - divCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const divStrength = 0.3 + 0.2 * sinT3;
          const div_x = (dx * divStrength) / (dist + 0.1);
          const div_y = (dy * divStrength) / (dist + 0.1);

          // Blend components with time-varying weights
          const weight_rot = 0.4 + 0.2 * Math.sin(t * 0.23);
          const weight_wave = 0.4 + 0.2 * Math.cos(t * 0.19);
          const weight_div = 1 - weight_rot - weight_wave;

          vx = rot_x * weight_rot + wave_x * weight_wave + div_x * weight_div;
          vy = rot_y * weight_rot + wave_y * weight_wave + div_y * weight_div;
          break;

        default:
          break;
      }

      return { vx, vy };
    };

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-70 pointer-events-none"
    />
  );
};

export default VectorField;
