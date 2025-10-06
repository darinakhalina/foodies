import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserFollowersRow from '../../../components/UserFollowersRow/UserFollowersRow';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import Loader from '../../../components/Loader/Loader';
import { selectIsLoggedIn, selectToken } from '../../../redux/auth/selectors';
import { unfollowUser, fetchFollowings, followUser } from '../../../api/followers';
import { fetchUserRecipes } from '../../../api/recipes';
import { getUser } from '../../../redux/user/operations';

const selectAuthUserId = state => state?.auth?.user?.id;

export default function Following() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authUserId = useSelector(selectAuthUserId);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isLoggedIn || !token || !authUserId) return;

    const loadFollowings = async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFollowings(token, page, 5);
        const users = data.followings || [];

        const usersWithRecipes = await Promise.all(
          users.map(async user => {
            try {
              const { recipes, total } = await fetchUserRecipes(token, user.id, { limit: 4 });
              return { ...user, recipes, recipesCount: total, isFollowing: true };
            } catch (err) {
              console.error(`Error loading recipes for ${user.id}:`, err);
              return { ...user, recipes: [], recipesCount: 0, isFollowing: true };
            }
          })
        );

        setItems(usersWithRecipes);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Error loading followings:', err);
        setError('Failed to load followings');
      } finally {
        setLoading(false);
      }
    };

    loadFollowings(currentPage);
  }, [token, isLoggedIn, authUserId, currentPage]);

  const handlePageChange = page => setCurrentPage(page);

  const handleToggleFollow = async id => {
    if (!isLoggedIn) return;
    try {
      const target = items.find(u => u.id === id);
      if (!target) return;

      if (target.isFollowing) {
        await unfollowUser(id, token);
      } else {
        await followUser(id, token);
      }

      setItems(prevItems =>
        prevItems.map(u => (u.id === id ? { ...u, isFollowing: !u.isFollowing } : u))
      );
      if (authUserId) {
        dispatch(getUser({ id: authUserId, token }));
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (!isLoggedIn) {
    return <div>You need to be logged in to view your followings.</div>;
  }

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
        items.map(user => (
          <UserFollowersRow
            key={user.id}
            id={user.id}
            name={user.name}
            avatar={user.avatar || '/images/fallback-avatar.png'}
            recipesCount={user.recipesCount}
            isFollowing={user.isFollowing}
            recipes={user.recipes || []}
            onOpen={id => navigate(`/user/${id}`)}
            onToggle={handleToggleFollow}
            showFollowButton={String(authUserId) !== String(user.id)}
          />
        ))
      ) : (
        <div>You are not following anyone yet.</div>
      )}
    </UserPageTabs>
  );
}