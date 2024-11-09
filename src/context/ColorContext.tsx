import { createContext, useContext, useEffect, useState } from 'react';

type ColorTheme = 'emerald' | 'blue' | 'violet' | 'rose' | 'amber';

interface ColorContextType {
  color: ColorTheme;
  setColor: (color: ColorTheme) => void;
}

const ColorContext = createContext<ColorContextType | null>(null);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('colorTheme');
    return (saved as ColorTheme) || 'emerald';
  });

  useEffect(() => {
    localStorage.setItem('colorTheme', color);
    // Remove all existing color classes
    document.documentElement.classList.remove(
      'theme-emerald',
      'theme-blue',
      'theme-violet',
      'theme-rose',
      'theme-amber'
    );
    // Add new color class
    document.documentElement.classList.add(`theme-${color}`);
  }, [color]);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
}