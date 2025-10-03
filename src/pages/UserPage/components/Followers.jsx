import { useNavigate } from 'react-router-dom';
import UserFollowersRow from '../../../components/UserFollowersRow/UserFollowersRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import Loader from '../../../components/Loader/Loader';
import { selectUser, selectToken } from "../../../redux/auth/selectors"
import { fetchFollowers } from "../../../api/followers"

export default function Followers() {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const {id: userId} = useSelector(selectUser);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadFollowers = async (page = 1) => {
      try {
        setLoading(true);
        const data = await fetchFollowers(userId, token, page, 5 );
        setItems(data.followers || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error loading followers:', error);
        setError('Failed to load followers');
      } finally {
        setLoading(false);
      }
    };
    loadFollowers(currentPage);
      
  }, [userId,  token, currentPage]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleToggleFavorite = async (id) => {
    console.log("test", id);
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
        items.map(follower => (
          <UserFollowersRow
            key={follower.id}
            id={follower.id}
            name={follower.name}
            avatar={follower.avatar || '/images/fallback-avatar.png'}
            recipesCount={follower.recipesCount}
            isFollowing={follower.isFollowing}
            onOpen={(id) => navigate(`/users/${id}`)}
            onToggle={handleToggleFavorite}
          />)
        )
      ) : (
        <div>There are no followers yet</div>
      )}
    </UserPageTabs>
  );
}




// import PropTypes from 'prop-types';

// export default function Followers({ followers, isLoading, error }) {
//   // If no followers prop is provided, fallback to empty array
//   const items = followers || [];

//   if (isLoading) {
//     return <div>Loading followers...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>Failed to load followers.</div>;
//   }

//   if (!items.length) {
//     return <div>No followers found.</div>;
//   }

//   return (
//     <div style={{ display: 'grid', gap: 12 }}>
//       {items.map(u => (
//         <div
//           key={u.id}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 12,
//             borderBottom: '1px solid #eee',
//             padding: '10px 0',
//           }}
//         >
//           <img
//             src={u.avatar}
//             alt={`Avatar of ${u.name}`}
//             style={{ width: 36, height: 36, borderRadius: '50%' }}
//           />
//           <div style={{ fontWeight: 600 }}>{u.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// Followers.propTypes = {
//   followers: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       avatar: PropTypes.string.isRequired,
//     })
//   ),
//   isLoading: PropTypes.bool,
//   error: PropTypes.any,
// };

// Followers.defaultProps = {
//   followers: [],
//   isLoading: false,
//   error: null,
// };
