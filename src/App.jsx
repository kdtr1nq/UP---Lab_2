import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import CartPage from './pages/CartPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Navigate to="/catalog" replace />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;