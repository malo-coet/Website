import { useState, useEffect } from 'react';

interface MenuBarProps {
  onItemClick?: (id: string) => void;
}

const AppleLogo = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 8.5c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.7C2.3 3.7.8 4.7.1 6.2c-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.6.6 2.6.6s1.7-.9 2.4-1.9c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.3-.9-2.3-3.5z"/>
    <path d="M9.1 2.1C9.7 1.4 10.1.4 10 0c-.9.1-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.7-1.8z"/>
  </svg>
);

export default function MenuBar({ onItemClick }: MenuBarProps) {
  const [time, setTime] = useState('');
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      setTime(`${h12}:${m} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClick = (id: string) => {
    setActive(id);
    onItemClick?.(id);
  };

  return (
    <nav className="mac-menubar select-none" role="navigation" aria-label="Main menu">
      <button
        className={`menubar-item ${active === 'apple' ? 'active' : ''}`}
        onClick={() => handleClick('apple')}
        aria-label="Apple menu"
        aria-pressed={active === 'apple'}
      >
        <AppleLogo />
      </button>

      <button className={`menubar-item ${active === 'file' ? 'active' : ''}`} onClick={() => handleClick('file')}>File</button>
      <button className={`menubar-item ${active === 'edit' ? 'active' : ''}`} onClick={() => handleClick('edit')}>Edit</button>
      <button className={`menubar-item ${active === 'view' ? 'active' : ''}`} onClick={() => handleClick('view')}>View</button>
      <button className={`menubar-item ${active === 'special' ? 'active' : ''}`} onClick={() => handleClick('special')}>Special</button>

      <button className={`ml-auto menubar-time ${active === 'time' ? 'active' : ''}`} onClick={() => handleClick('time')}>{time}</button>
    </nav>
  );
}
