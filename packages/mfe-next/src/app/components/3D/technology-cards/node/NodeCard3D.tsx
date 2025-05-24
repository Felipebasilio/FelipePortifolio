import React from "react";
import { ProjectCard3D } from "../../ProjectCard3D";
import { Node3DLogo } from "./Node3DLogo";

interface NodeCard3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  isActive: boolean;
  onClick: () => void;
  onGoBack: () => void;
  dimmed?: boolean;
  expanded?: boolean;
}

export const NodeCard3D: React.FC<NodeCard3DProps> = (props) => {
  return (
    <ProjectCard3D
      {...props}
      position={props.position ?? [0, 0, 0]}
      color={props.color || "#8CC84B"}
      dimmed={props.dimmed}
      expanded={props.expanded}
    >
      <Node3DLogo />
    </ProjectCard3D>
  );
};
