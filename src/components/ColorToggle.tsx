import { Palette } from 'lucide-react';
import { useColor } from '../context/ColorContext';
import { useState, useRef, useEffect } from 'react';

const colors = [
  { name: 'emerald', class: 'bg-emerald-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'violet', class: 'bg-violet-500' },
  { name: 'rose', class: 'bg-rose-500' },
  { name: 'amber', class: 'bg-amber-500' },
] as const;

export default function ColorToggle() {
  const { color, setColor } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-gray-500 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
        title="Change theme color"
      >
        <Palette className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-50">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setColor(c.name);
                  setIsOpen(false);
                }}
                className={`
                  w-8 h-8 rounded-full ${c.class}
                  ${color === c.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                  hover:scale-110 transition-transform
                `}
                title={`${c.name} theme`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}