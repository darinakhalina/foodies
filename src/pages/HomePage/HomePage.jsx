import { useParams, useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import CategoryPage from '../CategoryPage/CategoryPage.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  const { category } = useParams(); 
  const navigate = useNavigate();

  const handleBackToCategories = () => {
    navigate('/', { replace: false });
  };

  return (
    <>
      <div className={css.homePageUiHolder}>
        <Header />
        <Hero />
      </div>

      <section className="f-container no-margin">
        {!category ? (
          <Categories />
        ) : (
          <CategoryPage
            onBack={handleBackToCategories}
          />
        )}
      </section>
    </>
  );
}