import React from "react";
import { ProjectCard3D } from "../../ProjectCard3D";
import { Angular3DLogo } from "./Angular3DLogo";

interface AngularCard3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
  dimmed?: boolean;
  expanded?: boolean;
}

export const AngularCard3D: React.FC<AngularCard3DProps> = (props) => {
  return (
    <ProjectCard3D
      {...props}
      position={props.position ?? [0, 0, 0]}
      color={props.color || "#DD0031"}
      dimmed={props.dimmed}
      expanded={props.expanded}
    >
      <Angular3DLogo />
    </ProjectCard3D>
  );
};
