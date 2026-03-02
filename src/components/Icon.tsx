import { useState } from 'react';

interface IconProps {
  label: string;
  icon: React.ReactNode;
  onDoubleClick?: () => void;
}

export default function Icon({ label, icon, onDoubleClick }: IconProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(false);
    onDoubleClick?.();
  };

  return (
    <div
      className={`mac-icon flex flex-col items-center cursor-default w-16 p-1 ${selected ? 'mac-icon-selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div
        style={{
          width: 40,
          height: 40,
          filter: selected ? 'invert(1)' : 'none',
        }}
        className="flex items-center justify-center"
      >
        {icon}
      </div>
      <span className="mac-icon-label">{label}</span>
    </div>
  );
}
