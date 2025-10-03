// src/pages/UserPage/tabs/MyRecipes.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchMyRecipes, deleteMyRecipe } from '../../../api/recipes';
import { selectIsLoggedIn, selectToken } from '../../../redux/auth/selectors';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import UserRecipeRow from '../../../components/UserRecipeRow/UserRecipeRow';
const normalize = (r) => ({
  id: r.id,
  title: r.title,
  description: r.description ?? (r.instructions ? String(r.instructions).slice(0, 160) : ''),
  thumb: r.thumb || r.preview || r.img || '/images/placeholder.png',
});
export default function MyRecipes() {
  const isAuthed = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // Load my recipes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        if (!isAuthed || !token) {
          if (!cancelled) {
            setRecipes([]);
            setTotalPages(1);
          }
          return;
        }
        const payload = await fetchMyRecipes(token, { page, limit });
        const list = Array.isArray(payload?.recipes) ? payload.recipes.map(normalize) : [];
        if (!cancelled) {
          setRecipes(list);
          setTotalPages(Number(payload?.totalPages || 1));
        }
      } catch (err) {
        console.error('Failed to load My Recipes:', err);
        if (!cancelled) {
          setRecipes([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthed, token, page, limit]);
  const handleOpen = (id) => navigate(`/recipe/${id}`);
  const handleDelete = async (id) => {
    if (!token) return;
    setRecipes(prev => prev.filter(r => r.id !== id));
    try {
      await deleteMyRecipe(token, id);
    } catch (err) {
      console.error('Failed to delete recipe:', err);
    }
  };
  return (
    <UserPageTabs
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      isLoading={loading}
    >
      {recipes.length > 0 ? (
        recipes.map((r) => (
          <UserRecipeRow
            key={r.id}
            id={r.id}
            title={r.title}
            description={r.description}
            thumb={r.thumb}
            onOpen={handleOpen}
            onDelete={handleDelete}
          />
        ))
      ) : (
        !loading && <p style={{ padding: '1rem' }}>You haven’t added any recipes yet.</p>
      )}
    </UserPageTabs>
  );
}