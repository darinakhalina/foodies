import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import css from './PopularRecipes.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import Loader from '../../components/Loader/Loader.jsx';

import { fetchPopularRecipes } from '../../api/recipesApi';
import { addFavorite, deleteFavorite } from '../../api/favorite';
import { selectIsLoggedIn, selectToken } from '../../redux/auth/selectors';
import { openModal } from '../../redux/ui/modalSlice';

const normalize = r => ({
  id: r.id,
  title: r.title,
  description:
    r.description ?? (typeof r.instructions === 'string' ? r.instructions.slice(0, 160) : ''),
  image: r.thumb || r.preview || r.img || '/images/placeholder.png',
  author: {
    id: r.owner?.id ?? r.ownerId ?? null,
    name: r.owner?.name ?? 'User',
    avatar: r.owner?.avatar ?? '/images/avatar-placeholder.png',
  },
  isFavorite: !!r.isFavorite,
});

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  const inFlight = useRef(new Set());

  const lock = id => inFlight.current.add(id);
  const unlock = id => inFlight.current.delete(id);
  const isLocked = id => inFlight.current.has(id);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPopularRecipes(isLoggedIn ? token : null);
      const list = Array.isArray(data?.recipes) ? data.recipes.map(normalize) : [];
      setRecipes(list);
    } catch {
      toast.error('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    load();
  }, [load]);

  const requireAuth = () => dispatch(openModal({ type: 'login' }));

  const handleToggleFavorite = async id => {
    if (!isLoggedIn) {
      requireAuth();
      return;
    }
    if (isLocked(id)) return;
    lock(id);

    const current = recipes.find(r => r.id === id);
    if (!current) {
      unlock(id);
      return;
    }
    const wasFav = !!current.isFavorite;

    setRecipes(prev => prev.map(r => (r.id === id ? { ...r, isFavorite: !wasFav } : r)));

    try {
      if (wasFav) {
        await deleteFavorite(id, token);
      } else {
        await addFavorite(id, token);
      }
    } catch (e) {
      const msg = e?.response?.data?.message?.toLowerCase?.() || '';
      setRecipes(prev =>
        prev.map(r => {
          if (r.id !== id) return r;
          if (!wasFav && msg.includes('already') && msg.includes('favorite')) {
            return { ...r, isFavorite: true };
          }
          if (wasFav && msg.includes('not') && msg.includes('found')) {
            return { ...r, isFavorite: false };
          }
          return { ...r, isFavorite: wasFav };
        })
      );
      toast.error(e?.response?.data?.message || 'Failed to update favorite');
    } finally {
      unlock(id);
    }
  };

  return (
    <section className={css.popular}>
      <h2>Popular recipes</h2>

      {loading ? (
        <Loader />
      ) : (
        <ul>
          {recipes.map(r => (
            <li key={r.id}>
              <RecipeCard
                recipe={r}
                isAuthed={isLoggedIn}
                onNeedAuth={requireAuth}
                onOpen={rid => navigate(`/recipe/${rid}`)}
                onAuthor={authorId => navigate(`/user/${authorId}`)}
                onToggleFavorite={() => handleToggleFavorite(r.id)}
                isFavorite={r.isFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
