import React from "react";

const BlankSheet3D: React.FC = () => (
  <group position={[0, 0, 0.5]}>
    <mesh>
      <planeGeometry args={[window.innerWidth * 10, window.innerHeight * 10]} />
      <meshBasicMaterial color="black" opacity={1} transparent />
    </mesh>
  </group>
);

export default BlankSheet3D;
