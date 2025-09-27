import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Pages.css';

const Catalog = () => {
  const { colors } = useTheme();
  const { addToCart, getTotalItems } = useCart();
  const navigate = useNavigate();

  const vinylRecords = [
    {
      id: 1,
      name: "My Bloody Valentine - Loveless",
      price: 29.99,
      image: "https://upload.wikimedia.org/wikipedia/ru/a/a6/MyBloodyValentineLoveless.jpg",
      year: 1991,
      genre: "Shoegaze"
    },
    {
      id: 2,
      name: "Radiohead - OK Computer",
      price: 35.99,
      image: "https://upload.wikimedia.org/wikipedia/ru/9/93/RadioheadOkComputer.jpg",
      year: 1997,
      genre: "Alternative Rock"
    },
    {
      id: 3,
      name: "Cocteau Twins - Heaven or Las Vegas",
      price: 27.99,
      image: "https://images.genius.com/e0ca36fdae09db5522836e89eec4d71b.1000x1000x1.png",
      year: 1990,
      genre: "Alternative Rock"
    },
    {
      id: 4,
      name: "Curve - Doppelgänger",
      price: 19.99,
      image: "https://upload.wikimedia.org/wikipedia/en/1/18/Curve_Doppelganger_Cover.jpg",
      year: 1992,
      genre: "Alternative Rock"
    },
    {
      id: 5,
      name: "Imogen Heap - Speak for Yourself",
      price: 25.99,
      image: "https://upload.wikimedia.org/wikipedia/en/d/d9/Imogen_Heap_-_Speak_For_Yourself.jpg",
      year: 2005,
      genre: "Electronic"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="page" style={{ color: colors.text }}>
      <div className="page-header">
        <h1>Каталог виниловых пластинок</h1>
        <p>Выберите ваши любимые альбомы</p>
        
        {getTotalItems() > 0 && (
          <button 
            className="view-cart-btn"
            onClick={() => navigate('/cart')}
            style={{
              backgroundColor: colors.success,
              color: 'white'
            }}
          >
            Перейти в корзину ({getTotalItems()})
          </button>
        )}
      </div>

      <div className="products-grid">
        {vinylRecords.map(record => (
          <ProductCard
            key={record.id}
            product={record}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;