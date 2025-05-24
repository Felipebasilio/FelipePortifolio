import React from "react";
import { ProjectCard3D } from "../../ProjectCard3D";
import { React3DLogo } from "./React3DLogo";

interface ReactCard3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
}

export const ReactCard3D: React.FC<ReactCard3DProps> = (props) => {
  return (
    <ProjectCard3D
      {...props}
      position={props.position ?? [0, 0, 0]}
      color={props.color || "#61DAFB"}
    >
      <React3DLogo />
    </ProjectCard3D>
  );
};
