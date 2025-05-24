import React from "react";
import { ProjectCard3D } from "../../ProjectCard3D";
import { Vue3DLogo } from "./Vue3DLogo";

interface VueCard3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
}

export const VueCard3D: React.FC<VueCard3DProps> = (props) => {
  return (
    <ProjectCard3D
      {...props}
      position={props.position ?? [0, 0, 0]}
      color={props.color || "#42B883"}
    >
      <Vue3DLogo />
    </ProjectCard3D>
  );
};
