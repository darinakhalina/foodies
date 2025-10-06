import { useNavigate } from 'react-router-dom';
import UserRecipeRow from '../../../components/UserRecipeRow/UserRecipeRow';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/user/operations';
import { deleteFavorite, fetchFavoriteRecipes } from '../../../api/favorite';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import Loader from '../../../components/Loader/Loader';
const selectAuthUserId = state => state?.auth?.user?.id;

export default function MyFavorites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const authUserId = useSelector(selectAuthUserId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadFavorites = async (page = 1) => {
      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchFavoriteRecipes(token, page, 9);
        setItems(data.recipes);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error loading favorite recipes:', error);
        setError('Failed to load favorite recipes');
      } finally {
        setLoading(false);
      }
    };
    loadFavorites(currentPage);
  }, [token, currentPage]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleDeleteFavorite = async id => {
    try {
      setDeletingId(id);
      await deleteFavorite(id, token);
      setItems(prev => prev.filter(recipe => recipe.id !== id));
      if (authUserId) {
        dispatch(getUser({ id: authUserId, token }));
      }
    } catch (err) {
      console.error('Failed to delete from favorites:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <UserPageTabs
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      isLoading={loading}
    >
      {error ? (
        <div>{error}</div>
      ) : items.length > 0 ? (
        items.map(recipe => (
          <UserRecipeRow
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            thumb={recipe.thumb}
            onOpen={id => navigate(`/recipe/${id}`)}
            onDelete={handleDeleteFavorite}
            isDeleting={deletingId === recipe.id}
          />
        ))
      ) : (
            <div style={{ color: "#1A1A1A" }}>Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.</div>
      )}
    </UserPageTabs>
  );
}
