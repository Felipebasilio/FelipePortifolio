export interface CardConfig {
  technology: string;
  color: string;
  object3D: React.ReactNode;
}

export interface SceneProps {
  onCardClick: (technology: string) => void;
  onGoBack: () => void;
  activeCard: string | null;
  isExpanded: boolean;
}
