import { useNavigate, useLocation, useParams } from 'react-router-dom';
import UserFollowersRow from '../../../components/UserFollowersRow/UserFollowersRow';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import Loader from '../../../components/Loader/Loader';
import { selectIsLoggedIn, selectToken } from '../../../redux/auth/selectors';
import { fetchFollowers, unfollowUser, followUser, fetchFollowings } from '../../../api/followers';
import { fetchUserRecipes } from '../../../api/recipes';
import { getUser } from '../../../redux/user/operations';

const selectAuthUserId = state => state?.auth?.user?.id;

export default function Followers() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id: routeId } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authUserId = useSelector(selectAuthUserId);
  
  const isOwnProfile =
  (routeId === 'me' && isLoggedIn) ||
  (!!authUserId && String(authUserId) === String(routeId));
  
  const [items, setItems] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!isLoggedIn || !token) return;

      const followingsResponse = await fetchFollowings(token, 1, 5);
      const followingIds = followingsResponse.followings.map(u => u.id);
      setFollowings(followingIds);

      const targetUserId = routeId === 'me' ? authUserId : routeId;
      if (!targetUserId) {
        setItems([]);
        setTotalPages(1);
        return;
      }

      const followersData = await fetchFollowers(targetUserId, token, currentPage, 5);

      const followersWithRecipes = await Promise.all(
        followersData.followers.map(async f => {
          try {
            const { recipes, total } = await fetchUserRecipes(token, f.id, { limit: 5 });
            return {
              ...f,
              isFollowing: followingIds.includes(f.id),
              recipes,
              recipesCount: total,
            };
          } catch (err) {
            console.error(`Error loading recipes for user ${f.id}:`, err);
            return { ...f, isFollowing: followingIds.includes(f.id), recipes: [], recipesCount: 0 };
          }
        })
      );

      setItems(followersWithRecipes);
      setTotalPages(followersData.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError('Failed to load followers');
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [routeId, authUserId, token, currentPage, isLoggedIn]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleToggleFollow = async id => {
    if (!isLoggedIn) return;
    try {
      const target = items.find(f => f.id === id);
      if (!target) return;
      if (target.isFollowing) {
        await unfollowUser(id, token);
        setFollowings(prev => prev.filter(fid => fid !== id));
      } else {
        await followUser(id, token);
        setFollowings(prev => [...prev, id]);
      }

      setItems(prevItems =>
        prevItems.map(f => (f.id === id ? { ...f, isFollowing: !f.isFollowing } : f))
      );
      if (authUserId) {
        dispatch(getUser({ id: authUserId, token }));
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const emptyMessage = useMemo(() => {
    if (isOwnProfile) {
      return 'You have no followers yet.';
    }
    return 'This user has no followers yet.';
  }, [isOwnProfile]);

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
        items.map(follower => (
          <UserFollowersRow
            key={follower.id}
            id={follower.id}
            name={follower.name}
            avatar={follower.avatar || '/images/fallback-avatar.png'}
            recipesCount={follower.recipesCount}
            isFollowing={follower.isFollowing}
            recipes={follower.recipes || []}
            onOpen={id => navigate(`/user/${id}`)}
            onOpenRecipe={(id) => navigate(`/recipe/${id}`)}
            onToggle={isLoggedIn ? handleToggleFollow : undefined}
            showFollowButton={
              isLoggedIn && String(authUserId) !== String(follower.id)
            }
          />
        ))
      ) : (
        <div>{emptyMessage}</div>
      )}
    </UserPageTabs>
  );
}
