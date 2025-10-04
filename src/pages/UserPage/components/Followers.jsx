import { useNavigate } from 'react-router-dom';
import UserFollowersRow from '../../../components/UserFollowersRow/UserFollowersRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import Loader from '../../../components/Loader/Loader';
import { selectUser, selectToken } from "../../../redux/auth/selectors"
import { fetchFollowers, unfollowUser, followUser, fetchFollowings } from "../../../api/followers"

export default function Followers() {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const {id: userId} = useSelector(selectUser);
  const [items, setItems] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadFollowings = async () => {
      try {
        const response = await fetchFollowings(token);
        const followingIds = response.followings.map(u => u.id);
        setFollowings(followingIds);
      } catch (err) {
        console.error("Error loading followings:", err);
      }
    };
    loadFollowings();
  }, [token]);

  useEffect(() => {
    const loadFollowers = async (page = 1) => {
      try {
        setLoading(true);
        const data = await fetchFollowers(userId, token, page, 5);
        const withFollowState = data.followers.map(f => ({
          ...f,
          isFollowing: followings.includes(f.id),
        }));
        setItems(withFollowState);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error loading followers:', error);
        setError('Failed to load followers');
      } finally {
        setLoading(false);
      }
    };
    if (followings.length >= 0) {
      loadFollowers(currentPage);
    }
      
  }, [userId,  token, currentPage, followings]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleToggleFollow = async (id) => {
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
      prevItems.map(f =>
        f.id === id ? { ...f, isFollowing: !f.isFollowing } : f
      )
    );
  } catch (error) {
    console.error("Error toggling follow:", error);
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
        items.map(follower => (
          <UserFollowersRow
            key={follower.id}
            id={follower.id}
            name={follower.name}
            avatar={follower.avatar || '/images/fallback-avatar.png'}
            recipesCount={follower.recipesCount}
            isFollowing={follower.isFollowing}
            onOpen={(id) => navigate(`/users/${id}`)}
            onToggle={handleToggleFollow}
          />)
        )
      ) : (
        <div>There are no followers yet</div>
      )}
    </UserPageTabs>
  );
}