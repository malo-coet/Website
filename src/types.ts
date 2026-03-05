export interface IconItem {
  id: string;
  label: string;
  icon: React.ReactNode | string;
}

export interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  width: number;
  height: number;
}

