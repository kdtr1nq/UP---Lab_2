import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Ошибка работы с провайдером');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? true : saved === 'light' ? false : true;
  });

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? 
      {
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        text: '#ecf0f1',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        primary: '#3498db',
        primaryHover: '#2980b9',
        secondary: '#2ecc71',
        secondaryHover: '#27ae60',
        danger: '#e74c3c',
        dangerHover: '#c0392b',
        warning: '#f39c12',
        warningHover: '#e67e22',
        success: '#2ecc71',
        info: '#3498db'
      } : 
      {
        background: 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
        text: '#2c3e50',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(210, 215, 221, 0.2)',
        primary: '#473f46ff',
        primaryHover: '#9b92e6ff',
        secondary: '#27ae60',
        secondaryHover: '#2ecc71',
        danger: '#c02b98ff',
        dangerHover: '#c55397ff',
        warning: '#c7c66bff',
        warningHover: '#ecdfa5ff',
        success: '#9bd4b3ff',
        info: '#2980b9'
      }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ 
        background: theme.colors.background,
        color: theme.colors.text,
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};