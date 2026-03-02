import { useState, useEffect } from 'react';

const AppleLogo = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="black" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 8.5c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.7C2.3 3.7.8 4.7.1 6.2c-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.6.6 2.6.6s1.7-.9 2.4-1.9c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.3-.9-2.3-3.5z"/>
    <path d="M9.1 2.1C9.7 1.4 10.1.4 10 0c-.9.1-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.7-1.8z"/>
  </svg>
);

export default function MenuBar() {
  const [time, setTime] = useState('');

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

  return (
    <div className="mac-menubar select-none">
      <span className="flex items-center cursor-default">
        <AppleLogo />
      </span>
      <span className="text-xs font-bold cursor-default">File</span>
      <span className="text-xs font-bold cursor-default">Edit</span>
      <span className="text-xs font-bold cursor-default">View</span>
      <span className="text-xs font-bold cursor-default">Special</span>
      <span className="ml-auto text-xs font-bold">{time}</span>
    </div>
  );
}
