import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', isLight);
  }, [isLight]);

  const toggleTheme = () => setIsLight(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
