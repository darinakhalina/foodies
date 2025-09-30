import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './CategoryPage.module.css';

import Filters from '../../components/Filters/Filters';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';

import { getRecipesByCategory } from '../../data/recipes';
import { AREAS, INGREDIENTS } from '../../data/filters';

import { selectArea, selectIngredient } from '../../redux/filters/selectors';
import css from './CategoryPage.module.css';

const DESCRIPTIONS = {
  DESSERTS:
    'Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.',
  SALADS: 'Fresh and crispy salads.',
};

export default function CategoryPage() {
  const { category = '' } = useParams();
  const navigate = useNavigate();

  // Redux filters
  const area = useSelector(selectArea) || '';
  const ingredient = useSelector(selectIngredient) || '';

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [authOpen, setAuthOpen] = useState(false);
  const [limit, setLimit] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12
  );

  const isAuthed = false;

  useEffect(() => {
    const onResize = () => setLimit(window.innerWidth < 768 ? 8 : 12);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // fetch recipes for this category (sync from data util)
  useEffect(() => {
    setPage(1);
    const list = getRecipesByCategory(category);
    setRecipes(list);
  }, [category]);

  // filters change -> reset to page 1
  useEffect(() => {
    setPage(1);
  }, [area, ingredient]);

  // filter client-side using Redux values
  const filtered = useMemo(() => {
    const list = Array.isArray(recipes) ? recipes : [];
    return list.filter(
      r =>
        (!area || r?.area === area) &&
        (!ingredient || (Array.isArray(r?.ingredients) && r.ingredients.includes(ingredient)))
    );
  }, [recipes, area, ingredient]);

  // client-side pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const shown = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  // smooth scroll on page change
  useEffect(() => {
    const anchor = document.getElementById('paginationAnchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const title = (category || '').toUpperCase();
  const description = DESCRIPTIONS[title] || 'Category';

  return (
    <div className={`f-container ${css.wrapper}`} id="paginationAnchor">
      {/* Header (Back + Title + Description) */}
      <div className={css.headerBlock}>
        <button type="button" className={css.backButton} onClick={() => navigate(-1)}>
          <svg className={styles.icon} width="16" height="16">
            <use href="/images/icons.svg#icon-arrow-up-right" />
          </svg>
          Back
        </button>

        <h1 className={css.title}>{title}</h1>
        <p className={css.description}>{description}</p>
      </div>

      <div className={css.content}>
        {/* Left: filters column */}
        <div className={css.filtersCol}>
          <Filters areas={AREAS} ingredients={INGREDIENTS} />
        </div>

        {/* Right: grid + pagination */}
        <div>
          <div className={css.grid}>
            {shown.map(r => (
              <RecipeCard
                key={r.id ?? r.title}
                recipe={r}
                isAuthed={isAuthed}
                onNeedAuth={() => setAuthOpen(true)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={css.pagination}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isDisabled={false}
              />
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={authOpen} onClose={() => setAuthOpen(false)}>
        <div style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Sign in required</h3>
          <p>You need to be authorized to view profiles, like recipes, or open details.</p>
        </div>
      </Modal>
    </div>
  );
}
