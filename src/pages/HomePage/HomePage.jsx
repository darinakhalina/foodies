import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect, useMemo } from 'react';

import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import CategoryPage from '../CategoryPage/CategoryPage';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import css from './HomePage.module.css';

function scrollWindowToEl(el, { offset = 0, behavior = 'smooth' } = {}) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, left: 0, behavior });
}

const HomePage = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const category = params.get('category');
  const sectionRef = useRef(null);

  const searchKey = useMemo(() => params.toString(), [params]);

  useEffect(() => {
    if (!searchKey) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollWindowToEl(sectionRef.current, {
          offset: 0,
          behavior: 'smooth',
        });
      });
    });
  }, [searchKey]);

  useEffect(() => {
    if (location.state?.focus === 'home-categories') {
      requestAnimationFrame(() => {
        scrollWindowToEl(sectionRef.current, {
          offset: 0,
          behavior: 'smooth',
        });
      });
    }
  }, [location.state]);

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
    navigate(
      { pathname: '/', search: '' },
      { state: { scrollToTop: false, focus: 'home-categories' } }
    );
  };

  const showRecipes = Boolean(category);

  return (
    <>
      <div className={css.homePageUiHolder}>
        <Header />
        <Hero />
      </div>

      <section ref={sectionRef} className="f-container no-margin">
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
