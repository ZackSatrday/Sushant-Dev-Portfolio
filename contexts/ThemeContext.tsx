import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('swiss');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'void') {
      document.documentElement.setAttribute('data-theme', 'void');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Delay theme switch to match the "cover" animation timing
    setTimeout(() => {
      setTheme(prev => prev === 'swiss' ? 'void' : 'swiss');
    }, 500); // Halfway through the 1s animation

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
