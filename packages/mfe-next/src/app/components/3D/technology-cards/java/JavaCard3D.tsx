import React from "react";
import { ProjectCard3D } from "../../ProjectCard3D";
import { Java3DLogo } from "./Java3DLogo";

interface JavaCard3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
}

export const JavaCard3D: React.FC<JavaCard3DProps> = (props) => {
  return (
    <ProjectCard3D
      {...props}
      position={props.position ?? [0, 0, 0]}
      color={props.color || "#F89820"}
    >
      <Java3DLogo />
    </ProjectCard3D>
  );
};
