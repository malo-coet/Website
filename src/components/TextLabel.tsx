import React, { useState } from 'react';

interface TextLabelProps {
  text?: string | React.ReactNode;
  className?: string;
  maxWidth?: number;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export default function TextLabel({ text, className = '', maxWidth, editable = false, onChange }: TextLabelProps) {
  const [value, setValue] = useState(typeof text === 'string' ? text : '');

  const handleBlur = () => {
    onChange?.(value);
  };

  if (editable) {
    return (
      <input
        className={`text-label-input ${className}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        style={maxWidth ? { maxWidth } : undefined}
      />
    );
  }

  return (
    <span
      className={`text-label ${className}`}
      style={maxWidth ? { maxWidth, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : undefined}
    >
      {text}
    </span>
  );
}

export { TextLabel };
