import { motion } from 'framer-motion';
import { useState } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  zIndex?: number;
  onFocus?: () => void;
}

export default function Window({
  title,
  children,
  onClose,
  initialPosition = { x: 100, y: 60 },
  width = 320,
  height = 240,
  zIndex = 10,
  onFocus,
}: WindowProps) {
  const [active, setActive] = useState(true);

  const handleFocus = () => {
    setActive(true);
    onFocus?.();
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: initialPosition.x, y: initialPosition.y, scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={handleFocus}
      style={{ position: 'absolute', width, zIndex }}
      className="mac-window select-none"
    >
      {/* Title bar */}
      <div
        className={active ? 'mac-title-bar' : 'mac-title-bar mac-title-bar-inactive'}
        style={{ position: 'relative' }}
      >
        <button
          className="mac-close-btn"
          onMouseDown={(e) => { e.stopPropagation(); onClose(); }}
          title="Close"
        />
        <span className="mac-title-text text-xs font-bold">{title}</span>
      </div>

      {/* Window content */}
      <div
        style={{ height: height - 20, overflow: 'auto' }}
        className="mac-scrollbar bg-white p-2"
      >
        {children}
      </div>
    </motion.div>
  );
}
