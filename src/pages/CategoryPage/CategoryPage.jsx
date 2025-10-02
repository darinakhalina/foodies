import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Filters from '../../components/Filters/Filters';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';

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
    isFavorite: !!r.isFavorite,
  };
}

export default function CategoryPage({ onBack }) {
  const [params, setParams] = useSearchParams();

  const categorySlug = (params.get('category') || '').toLowerCase();
  const title = categorySlug.toUpperCase(); 
  const description = getCategoryDescription(categorySlug);

  const isAuthed = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  const area = params.get('area') || '';
  const ingredient = params.get('ingredient') || '';
  const page = Number(params.get('page') || 1);

  // UI state
  const [recipes, setRecipes] = useState([]);
  const [areasOpt, setAreasOpt] = useState([]);
  const [ingredientsOpt, setIngredientsOpt] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  // Responsive page size
  const [limit, setLimit] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12
  );
  useEffect(() => {
    const onResize = () => setLimit(window.innerWidth < 768 ? 8 : 12);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  // Fetch available filters (areas, ingredients) for this category
  useEffect(() => {
    let cancelled = false;
    (async () => {
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
    })();
    return () => {
      cancelled = true;
    };
  }, [title]);

  // Reset page on filter changes
  useEffect(() => {
    const next = new URLSearchParams(params);
    next.set('page', '1');
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, ingredient, title]);

  // Load recipes
  useEffect(() => {
    let cancelled = false;
    (async () => {
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
    })();
    return () => {
      cancelled = true;
    };
  }, [title, area, ingredient, page, limit]);

  // Smooth scroll on page change
  useEffect(() => {
    const anchor = document.getElementById('paginationAnchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const hasResults = recipes.length > 0;

  // Handlers to keep URL in sync when Filters change
  const setArea = (val) => {
    const next = new URLSearchParams(params);
    if (val) next.set('area', val);
    else next.delete('area');
    next.set('page', '1');
    setParams(next);
  };

  const setIngredient = (val) => {
    const next = new URLSearchParams(params);
    if (val) next.set('ingredient', val);
    else next.delete('ingredient');
    next.set('page', '1');
    setParams(next);
  };

  const setPageUrl = (p) => {
    const next = new URLSearchParams(params);
    next.set('page', String(p));
    setParams(next);
  };

  const handleToggleFavorite = async (id) => {
    setRecipes(prev => prev.map(r => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)));
    try {
      const target = recipes.find(r => r.id === id);
      const currentlyFav = !!target?.isFavorite;
      if (currentlyFav) await deleteFavorite(id, token);
      else await addFavorite(id, token);
    } catch (e) {
      setRecipes(prev => prev.map(r => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)));
      console.error(e);
    }
  };

  const navigate = useNavigate();
  const back = () => {
    if (onBack) onBack();
    else {
      navigate(-1);
    }
  };

  return (
    <div className={`f-container ${css.wrapper}`} id="paginationAnchor">
      {/* Header */}
      <div className={css.headerBlock}>
        <button type="button" className={css.backButton} onClick={back}>
          <svg className={css.icon} width="16" height="16" style={{ transform: 'rotate(225deg)' }}>
            <use href="/images/icons.svg#icon-arrow-up-right" />
          </svg>
          Back
        </button>

        <h1 className={css.title}>{title}</h1>
        <p className={css.description}>{description}</p>
      </div>

      <div className={css.content}>
        {/* Left: filters */}
        <div className={css.filtersCol}>
          <Filters
            areas={areasOpt}
            ingredients={ingredientsOpt}
            selectedArea={area}
            selectedIngredient={ingredient}
            onArea={setArea}
            onIngredient={setIngredient}
          />
        </div>

        {/* Right: grid + pagination */}
        <div>
          {err && <div className={css.error}>{err}</div>}
          {isLoading && <div className={css.loading}>Loading…</div>}

          <div className={css.grid}>
            {recipes.map(r => (
              <RecipeCard
                key={r.id}
                recipe={r}
                isAuthed={isAuthed}
                onNeedAuth={() => setAuthOpen(true)}
                onOpen={(id) => navigate(`/recipe/${id}`)}              
                onAuthor={(authorId) => navigate(`/user/${authorId}/recipes`)} 
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
                onPageChange={setPageUrl}
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
