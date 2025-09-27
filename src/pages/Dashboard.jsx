import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const Dashboard = () => {
  const { colors } = useTheme();
  const { items, getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate('/dashboard', { replace: true });
  };

  if (!isLoggedIn) {
    return (
      <div className="page" style={{ color: colors.text }}>
        <div className="login-form" style={{ backgroundColor: colors.cardBg }}>
          <h2>Вход в личный кабинет</h2>
          <p>Для доступа к персональным данным требуется авторизация</p>
          <button 
            onClick={handleLogin}
            style={{
              backgroundColor: colors.primary,
              color: 'white',
              width: '100%'
            }}
          >
            Войти в систему
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ color: colors.text }}>
      <h1>Личный кабинет</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card" style={{ backgroundColor: colors.cardBg }}>
          <h3>Товаров в корзине</h3>
          <span className="stat-number">{getTotalItems()}</span>
        </div>
        <div className="stat-card" style={{ backgroundColor: colors.cardBg }}>
          <h3>Общая сумма</h3>
          <span className="stat-number">${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {items.length > 0 && (
        <div className="recent-items">
          <h2>Недавно добавленные</h2>
          <div className="recent-list">
            {items.slice(0, 3).map(item => (
              <div key={item.id} className="recent-item" style={{ backgroundColor: colors.cardBg }}>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <button 
          onClick={() => navigate('/catalog')}
          style={{
            backgroundColor: colors.primary,
            color: 'white'
          }}
        >
          Перейти в каталог
        </button>
        <button 
          onClick={() => navigate('/cart')}
          style={{
            backgroundColor: colors.success,
            color: 'white'
          }}
        >
          Перейти в корзину
        </button>
      </div>
    </div>
  );
};

export default Dashboard;