import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Ошибка работы с провайдером');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };


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
        cardBg: 'rgba(44, 62, 80, 0.1)',
        border: 'rgba(44, 62, 80, 0.2)',
        
        primary: '#2980b9',
        primaryHover: '#3498db',
        secondary: '#27ae60',
        secondaryHover: '#2ecc71',
        danger: '#c0392b',
        dangerHover: '#e74c3c',
        warning: '#e67e22',
        warningHover: '#f39c12',
        
        success: '#27ae60',
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