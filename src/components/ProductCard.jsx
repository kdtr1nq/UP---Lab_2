import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { colors, isDark } = useTheme();

  return (
    <div 
      className="product-card" 
      style={{ 
        backgroundColor: colors.cardBg,
        borderColor: colors.border
      }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-content">
        <h3 className="product-title" style={{ color: colors.text }}>
          {product.name}
        </h3>
        
        <div className="product-details">
          <span 
            className="product-year" 
            style={{ 
              backgroundColor: isDark ? 'rgba(231, 76, 60, 0.2)' : 'rgba(231, 76, 60, 0.1)',
              color: '#e74c3c',
              borderColor: 'rgba(231, 76, 60, 0.3)'
            }}
          >
            {product.year}
          </span>
          <span 
            className="product-genre"
            style={{ 
              backgroundColor: isDark ? 'rgba(52, 152, 219, 0.2)' : 'rgba(52, 152, 219, 0.1)',
              color: '#3498db',
              borderColor: 'rgba(52, 152, 219, 0.3)'
            }}
          >
            {product.genre}
          </span>
        </div>

        <div 
          className="product-price"
          style={{ 
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
            borderColor: colors.border
          }}
        >
          <span className="price-amount" style={{ color: isDark ? '#2ecc71' : '#27ae60' }}>
            ${product.price}
          </span>
          <span className="price-label" style={{ color: colors.text }}>
            ЦЕНА
          </span>
        </div>

        <div className="product-actions">
          <button 
            onClick={() => onAddToCart(product)}
            className="add-to-cart-btn"
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;