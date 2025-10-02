import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Filters from '../../components/Filters/Filters';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';

import { selectArea, selectIngredient } from '../../redux/filters/selectors';
import { addFavorite, deleteFavorite } from '../../api/favorite';
import { selectIsLoggedIn, selectToken } from '../../redux/auth/selectors';
import { getCategoryDescription } from '../../data/categoryDescriptions';
import css from './CategoryPage.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function normalizeRecipe(r) {
  return {
    id: r.id,
    title: r.title,
    description: r.description ?? (r.instructions ? String(r.instructions).slice(0, 160) : ''),
    image: r.thumb || r.preview || r.img || '/images/placeholder.png',
    author: {
      id: r.owner?.id ?? r.ownerId ?? null,
      name: r.owner?.name ?? 'User',
      avatar: r.owner?.avatar ?? '/images/avatar-placeholder.png',
    },
  };
}

export default function CategoryPage() {
  const { category = '' } = useParams();
  const navigate = useNavigate();

  // Redux filters
  const area = useSelector(selectArea) || '';
  const ingredient = useSelector(selectIngredient) || '';
  const isAuthed = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  // UI state
  const [recipes, setRecipes] = useState([]);
  const [areasOpt, setAreasOpt] = useState([]);
  const [ingredientsOpt, setIngredientsOpt] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  // Responsive page size
  const [limit, setLimit] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12
  );

  const title = (category || '').toUpperCase();
  const description = getCategoryDescription(category);

  // keep limit responsive
  useEffect(() => {
    const onResize = () => setLimit(window.innerWidth < 768 ? 8 : 12);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Fetch available filters (areas, ingredients) for this category
  useEffect(() => {
    let cancelled = false;

    async function loadFilters() {
      try {
        setErr('');
        const url = new URL('/api/recipes/filters', API_URL);
        if (title) url.searchParams.set('category', title);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Filters request failed: ${res.status}`);

        const json = await res.json();
        const data = json.data || json;

        if (!cancelled) {
          setAreasOpt(Array.isArray(data.areas) ? data.areas : []);
          setIngredientsOpt(Array.isArray(data.ingredients) ? data.ingredients : []);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed to load filters');
      }
    }

    loadFilters();
    return () => {
      cancelled = true;
    };
  }, [title]);

  // Reset page whenever category or filters change
  useEffect(() => {
    setPage(1);
  }, [title, area, ingredient]);

  // Fetch recipes (server-side pagination + filtering)
  useEffect(() => {
    let cancelled = false;

    async function loadRecipes() {
      try {
        setIsLoading(true);
        setErr('');

        const url = new URL('/api/recipes', API_URL);
        if (title) url.searchParams.set('category', title);
        if (area) url.searchParams.set('area', area);
        if (ingredient) url.searchParams.set('ingredient', ingredient);
        url.searchParams.set('page', String(page));
        url.searchParams.set('limit', String(limit));

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Recipes request failed: ${res.status}`);

        const json = await res.json();
        const payload = json.data || json;

        const apiRecipes = Array.isArray(payload.recipes)
          ? payload.recipes
          : Array.isArray(json.recipes)
            ? json.recipes
            : [];

        const normalized = apiRecipes.map(normalizeRecipe);

        if (!cancelled) {
          setRecipes(normalized);
          setTotalPages(
            typeof payload.totalPages === 'number' && payload.totalPages > 0
              ? payload.totalPages
              : 1
          );
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed to load recipes');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadRecipes();
    return () => {
      cancelled = true;
    };
  }, [title, area, ingredient, page, limit]);

  // smooth scroll on page change
  useEffect(() => {
    const anchor = document.getElementById('paginationAnchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const hasResults = recipes.length > 0;

  const shown = recipes;

  const handleToggleFavorite = async id => {
    setRecipes(prev => prev.map(r => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)));

    try {
      const target = recipes.find(r => r.id === id);
      const currentlyFav = !!target?.isFavorite;

      if (currentlyFav) {
        await deleteFavorite(id, token);
      } else {
        await addFavorite(id, token);
      }
    } catch (err) {
      console.error('Помилка зміни улюбленого рецепта:', err);
    }
  };

  return (
    <div className={`f-container ${css.wrapper}`} id="paginationAnchor">
      {/* Header (Back + Title + Description) */}
      <div className={css.headerBlock}>
        <button type="button" className={css.backButton} onClick={() => navigate(-1)}>
          <svg className={css.icon} width="16" height="16" style={{ transform: 'rotate(225deg)' }}>
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
          <Filters areas={areasOpt} ingredients={ingredientsOpt} />
        </div>

        {/* Right: grid + pagination */}
        <div>
          {err && <div className={css.error}>{err}</div>}
          {isLoading && <div className={css.loading}>Loading…</div>}

          <div className={css.grid}>
            {shown.map(r => (
              <RecipeCard
                key={r.id}
                recipe={r}
                isAuthed={isAuthed}
                onNeedAuth={() => setAuthOpen(true)}
                onOpen={id => navigate(`/recipe/${id}`)}
                onAuthor={authorId => navigate(`/user/${authorId}/recipes`)}
                onToggleFavorite={() => handleToggleFavorite(r.id)}
                isFavorite={r.isFavorite}
              />
            ))}

            {!isLoading && !hasResults && !err && (
              <div className={css.empty}>No recipes found for these filters.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className={css.pagination}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isDisabled={isLoading}
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
