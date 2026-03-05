import { useState } from 'react';
import TextLabel from './TextLabel';

interface IconProps {
  id?: string;
  label?: string | React.ReactNode;
  icon?: React.ReactNode | string;
  onDoubleClick?: () => void;
  onClick?: () => void;
  className?: string;
  title?: string;
  editableLabel?: boolean;
  onRename?: (id: string | undefined, newLabel: string) => void;
}

export default function Icon({ id, label, icon, onDoubleClick, onClick, className = '', title, editableLabel = false, onRename }: IconProps) {
  const [selected, setSelected] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(true);
    onClick?.();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(false);
    onDoubleClick?.();
  };

  const handleLabelDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editableLabel) setEditing(true);
  };

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img src={icon} alt={typeof label === 'string' ? label : 'icon'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />;
    }
    return icon;
  };

  const handleRename = (newValue: string) => {
    onRename?.(id, newValue);
    setEditing(false);
  };

  return (
    <button
      className={`mac-icon flex flex-col items-center justify-start cursor-pointer p-1 bg-transparent border-none ${selected ? 'mac-icon-selected' : ''} ${className}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title={title ?? (typeof label === 'string' ? label : undefined)}
      aria-label={typeof label === 'string' ? label : undefined}
      type="button"
    >
      <div
        style={{
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="icon-visual flex items-center justify-center"
      >
        {renderIcon()}
      </div>

      <div style={{ height: 6 }} />

      {editing ? (
        <TextLabel
          editable
          text={typeof label === 'string' ? label : ''}
          className="mac-icon-label"
          maxWidth={80}
          onChange={handleRename}
        />
      ) : (
        <div onDoubleClick={handleLabelDoubleClick} style={{ width: '100%' }}>
          <TextLabel text={label} className="mac-icon-label" />
        </div>
      )}
    </button>
  );
}
