import { useSearchParams } from 'react-router-dom';

import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import CategoryPage from '../CategoryPage/CategoryPage';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get('category');

  const handleSelectCategory = name => {
    const slug = String(name || '')
      .toLowerCase()
      .replace(/\s+/g, '-');
    const next = new URLSearchParams(params);
    if (slug) {
      next.set('category', slug);
      next.delete('area');
      next.delete('ingredient');
      next.set('page', '1');
    } else {
      next.delete('category');
      next.delete('area');
      next.delete('ingredient');
      next.delete('page');
    }
    setParams(next);
  };

  const handleBack = () => {
    const next = new URLSearchParams(params);
    next.delete('category');
    next.delete('area');
    next.delete('ingredient');
    next.delete('page');
    setParams(next);
  };

  const showRecipes = Boolean(category);

  return (
    <>
      <div className={css.homePageUiHolder}>
        <Header />
        <Hero />
      </div>

      <section className="f-container no-margin">
        {!showRecipes ? (
          <Categories onSelect={handleSelectCategory} />
        ) : (
          <CategoryPage embedded onBack={handleBack} />
        )}
      </section>

      {!showRecipes && (
        <section className="f-container">
          <Testimonials />
        </section>
      )}
    </>
  );
};

export default HomePage;
