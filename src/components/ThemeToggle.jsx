import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      style={{
        backgroundColor: colors.primary,
        color: 'white',
        border: `1px solid ${colors.border}`
      }}
    >
      {isDark ? 'Светлая' : 'Тёмная'}
    </button>
  );
};

export default ThemeToggle;