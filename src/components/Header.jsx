import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const { colors } = useTheme();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header" style={{ backgroundColor: colors.cardBg }}>
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/')}>
          МАГАЗИН ВИНИЛА
        </h1>
        
        <nav className="navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) => ({
              color: isActive ? colors.primary : colors.text
            })}
          >
            Главная
          </NavLink>
          
          <NavLink 
            to="/catalog" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) => ({
              color: isActive ? colors.primary : colors.text
            })}
          >
            Каталог
          </NavLink>
          
          <NavLink 
            to="/cart" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) => ({
              color: isActive ? colors.primary : colors.text
            })}
          >
            Корзина ({getTotalItems()})
          </NavLink>
          
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) => ({
              color: isActive ? colors.primary : colors.text
            })}
          >
            Личный кабинет
          </NavLink>
        </nav>

        <div className="header-controls">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;