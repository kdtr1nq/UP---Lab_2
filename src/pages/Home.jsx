import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const Home = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="page" style={{ color: colors.text }}>
      <div className="page-content">
        <h1>Добро пожаловать в магазин винила!</h1>
        <p>Коллекция культовых альбомов на виниле по лучшим ценам</p>
        
        <div className="home-actions">
          <button 
            className="cta-button"
            onClick={() => navigate('/catalog')}
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            Перейти к каталогу
          </button>
          
          <button 
            className="cta-button secondary"
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: colors.cardBg,
              color: colors.text,
              border: `1px solid ${colors.primary}`
            }}
          >
            Личный кабинет
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;