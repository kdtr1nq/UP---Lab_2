import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const ADD = 'ADD';
const DELETE= 'DELETE';
const CLEAR = 'CLEAR';

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

    case DELETE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case CLEAR:
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

const initialState = {
  items: []
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Ошибка работы с провайдером');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: DELETE, payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR });
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
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};