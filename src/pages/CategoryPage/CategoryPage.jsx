// src/pages/CategoryPage/CategoryPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import Filters from '../../components/Filters/Filters';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import {
  fetchRecipesByCategory,
  getAreasForCategory,
  getIngredientsForCategory,
} from '../../api/mock';
import css from './CategoryPage.module.css';

const DESCRIPTIONS = {
  DESSERTS: 'Sweet dishes to make your day better.',
  SALADS: 'Fresh and crispy salads.',
};

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [area, setArea] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [limit, setLimit] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12
  ); // mobile: 8, desktop: 12 (3x4)

  const isAuthed = false;

  // responsive page size (mimics useWindowWidth logic without new imports)
  useEffect(() => {
    function onResize() {
      setLimit(window.innerWidth < 768 ? 8 : 12);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // fetch recipes when category changes
  useEffect(() => {
    setPage(1);
    fetchRecipesByCategory(category).then(setRecipes);
  }, [category]);

  // filters change -> reset to page 1
  useEffect(() => {
    setPage(1);
  }, [area, ingredient]);

  // filtered list
  const filtered = useMemo(
    () =>
      recipes.filter(
        (r) =>
          (!area || r.area === area) &&
          (!ingredient || r.ingredients?.includes(ingredient))
      ),
    [recipes, area, ingredient]
  );

  // client-side pagination (like Reciepes clientPagedData)
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const shown = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  // smooth scroll on page change (anchor behavior)
  useEffect(() => {
    const anchor = document.getElementById('paginationAnchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  return (
    <div className={`f-container ${css.wrapper}`} id="paginationAnchor">
      <div className={css.headerBlock}>
        <CategoryHeader
          title={(category || '').toUpperCase()}
          description={DESCRIPTIONS[(category || '').toUpperCase()] || 'Category'}
          onBack={() => navigate(-1)}
        />
      </div>

      <div className={css.content}>
        {/* Left: filters column */}
        <div className={css.filtersCol}>
          <Filters
            areas={getAreasForCategory(category)}
            ingredients={getIngredientsForCategory(category)}
            selectedArea={area}
            selectedIngredient={ingredient}
            onArea={setArea}
            onIngredient={setIngredient}
          />
        </div>

        {/* Right: grid + pagination */}
        <div>
          <div className={css.grid}>
            {shown.map((r) => (
              <RecipeCard
                key={r.id}
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
