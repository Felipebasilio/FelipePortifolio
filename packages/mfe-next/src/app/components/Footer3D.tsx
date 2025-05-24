import React from "react";
import Footer from "./Footer";
import { Html } from "@react-three/drei";

const Footer3D = () => (
  <group position={[0, -Math.ceil(5 / 4) * 6, 0]}>
    <Html
      center
      style={{
        width: "1000vw",
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute",
        bottom: 0,
        margin: 0,
        padding: 0,
        zIndex: 20,
      }}
      pointerEvents="auto"
    >
      <Footer noMargin />
    </Html>
  </group>
);

export default Footer3D;
