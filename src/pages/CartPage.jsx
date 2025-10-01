import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const CartPage = () => {
  const { colors } = useTheme();
  const { 
    items, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    plusItem,
    minusItem
  } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page" style={{ color: colors.text }}>
        <div className="empty-cart">
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
          <button 
            onClick={() => navigate('/catalog')}
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ color: colors.text }}>
      <div className="cart-header">
        <h1>Корзина покупок</h1>
        <button 
          className="clear-cart-btn"
          onClick={clearCart}
          style={{
            backgroundColor: colors.danger,
            color: 'white'
          }}
        >
          Очистить корзину
        </button>
      </div>

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item" style={{ backgroundColor: colors.cardBg }}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{item.genre} • {item.year}</p>
            </div>
            
            <div className="cart-item-controls">
              <button 
                className="quantity-btn"
                onClick={() => minusItem(item.id)}
                style={{
                  backgroundColor: colors.danger,
                  color: 'white',
                  borderRadius: '4px 0 0 4px',
                  padding: '5px 12px',
                  fontSize: '16px'
                }}
              >
                -
              </button>
              
              <span 
                className="quantity-display" 
                style={{
                  padding: '0 10px',
                  fontWeight: 'bold',
                  color: colors.text,
                  fontSize: '16px'
                }}
              >
                {item.quantity}
              </span>
              
              <button 
                className="quantity-btn"
                onClick={() => plusItem(item.id)}
                style={{
                  backgroundColor: colors.success,
                  color: 'white',
                  borderRadius: '0 4px 4px 0',
                  padding: '5px 12px',
                  fontSize: '16px'
                }}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>

            <button 
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
              style={{
                backgroundColor: colors.danger,
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary" style={{ backgroundColor: colors.cardBg }}>
        <div className="summary-row">
          <span>Товаров: {getTotalItems()}</span>
          <span>Общая сумма: ${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <div className="cart-actions">
          <button 
            onClick={() => navigate('/catalog')}
            style={{
              backgroundColor: 'transparent',
              color: colors.text,
              border: `1px solid ${colors.primary}`,
              padding: '10px 20px'
            }}
          >
            Продолжить покупки
          </button>
          
          <button 
            className="checkout-btn"
            style={{
              backgroundColor: colors.success,
              color: 'white',
              padding: '10px 20px'
            }}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;