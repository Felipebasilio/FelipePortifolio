import React from "react";
import { Html } from "@react-three/drei";

const DetailsPanel3D = ({
  cardId,
  onGoBack,
}: {
  cardId: string;
  onGoBack: () => void;
}) => (
  <Html
    position={[6, 0, 1]}
    style={{
      width: "40vw",
      minHeight: "40vh",
      background: "rgba(0,0,0,0.95)",
      borderRadius: 16,
      padding: 32,
      color: "white",
      boxShadow: "0 0 32px #000",
    }}
    center
  >
    <h2 style={{ fontSize: 32, marginBottom: 16 }}>
      {cardId.toUpperCase()} Project
    </h2>
    <p style={{ marginBottom: 24 }}>
      This is a placeholder for the {cardId} technology description, links, and
      more. You can customize this per technology.
    </p>
    <a href="#" style={{ color: "#61dafb", marginRight: 16 }}>
      View Repo
    </a>
    <button
      onClick={onGoBack}
      style={{
        marginLeft: 16,
        padding: "8px 24px",
        background: "#fff",
        color: "#000",
        borderRadius: 8,
      }}
    >
      Back
    </button>
  </Html>
);

export default DetailsPanel3D;
