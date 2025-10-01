import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const CLEAR = 'CLEAR';
const PLUS = 'PLUS';
const MINUS = 'MINUS';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case REMOVE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case CLEAR:
      return {
        ...state,
        items: []
      };

    case PLUS:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };

    case MINUS:
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0)
      };

    default:
      return state;
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Ошибка работы с провайдером');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: ADD, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE, payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR });
  };

  const plusItem = (productId) => {
    dispatch({ type: PLUS, payload: productId });
  };

  const minusItem = (productId) => {
    dispatch({ type: MINUS, payload: productId });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    clearCart,
    plusItem,
    minusItem,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};