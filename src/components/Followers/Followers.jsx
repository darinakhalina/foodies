import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserFollowerRow from '../UserFollowersRow/UserFollowersRow';
import { fetchFollowers } from '../../api/followers';
import styles from './Followers.module.css';

export default function UserFollowers() {
  const { id: userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadFollowers = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        const data = await fetchFollowers(userId, token, currentPage, itemsPerPage);

        setFollowers(data.followers || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching followers:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) loadFollowers();
  }, [userId, currentPage]);

  const handleToggleFollow = userId => {
    setFollowers(prev =>
      prev.map(u => (u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u))
    );
  };

  const handleOpenProfile = userId => {
    console.log(`Open profile of user with id: ${userId}`);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p className={styles.loading}>Loading followers...</p>;

  return (
    <section className={styles.container}>
      {followers.map(user => (
        <div key={user.id} className={styles.followerBlock}>
          <div className={styles.rowWrapper}>
            <div className={styles.leftPart}>
              <UserFollowerRow
                id={user.id}
                name={user.name}
                avatar={user.avatar}
                recipesCount={user.recipesCount}
                isFollowing={user.isFollowing}
                onOpen={handleOpenProfile}
                onToggle={handleToggleFollow}
              />
            </div>

            <div className={styles.rightPart}>
              <div className={styles.recipeList}>
                {user.recipes?.map((recipe, index) => (
                  <img
                    key={index}
                    src={recipe.thumb}
                    alt={`Recipe ${index + 1}`}
                    className={styles.recipeThumb}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
