
import { useEffect, useState } from 'react';
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
  description: r.description ?? (typeof r.instructions === 'string' ? r.instructions.slice(0, 160) : ''),
  image: r.thumb || r.preview || r.img || '/images/placeholder.png',
  author: {
    id: r.owner?.id ?? r.ownerId ?? null,
    name: r.owner?.name ?? 'User',
    avatar: r.owner?.avatar ?? '/images/avatar-placeholder.png',
  },
  isFavorite: !!r.isFavorite,
});

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPopularRecipes();
        const list = Array.isArray(data?.recipes) ? data.recipes.map(normalize) : [];
        setRecipes(list);
      } catch {
        toast.error('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const requireAuth = () => dispatch(openModal({ type: 'login' }));

  const handleToggleFavorite = async (id) => {
    if (!isLoggedIn) {
      requireAuth();
      return;
    }
    try {
      setRecipes(prev =>
        prev.map(r => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
      );

      const target = recipes.find(r => r.id === id);
      if (target?.isFavorite) {
        await deleteFavorite(id, token);
      } else {
        await addFavorite(id, token);
      }
    } catch (e) {
      setRecipes(prev =>
        prev.map(r => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
      );
      toast.error(e?.response?.data?.message || 'Failed to update favorite');
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
                onOpen={(id) => navigate(`/recipe/${id}`)}
                onAuthor={(authorId) => navigate(`/user/${authorId}/`)}
                onToggleFavorite={() => handleToggleFavorite(r.id)}
                isFavorite={r.isFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PopularRecipes;