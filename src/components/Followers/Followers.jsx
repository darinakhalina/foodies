import { useEffect, useState } from 'react';
import UserFollowerRow from '../UserFollowersRow/UserFollowersRow';
import styles from './Followers.module.css';

export default function UserFollowers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // тестові дані
    const timer = setTimeout(() => {
      setFollowers([
        {
          id: 1,
          name: 'Victor',
          avatar: 'https://i.pravatar.cc/100?img=8',
          recipesCount: 30,
          isFollowing: false,
          recipes: [
            { thumb: 'https://picsum.photos/seed/a/100' },
            { thumb: 'https://picsum.photos/seed/b/100' },
            { thumb: 'https://picsum.photos/seed/c/100' },
            { thumb: 'https://picsum.photos/seed/d/100' },
            { thumb: 'https://picsum.photos/seed/e/100' },
          ],
        },
        {
          id: 2,
          name: 'Ivetta',
          avatar: 'https://i.pravatar.cc/100?img=5',
          recipesCount: 40,
          isFollowing: true,
          recipes: [
            { thumb: 'https://picsum.photos/seed/f/100' },
            { thumb: 'https://picsum.photos/seed/g/100' },
            { thumb: 'https://picsum.photos/seed/h/100' },
            { thumb: 'https://picsum.photos/seed/i/100' },
          ],
        },
        {
          id: 3,
          name: 'Mykhailo',
          avatar: 'https://i.pravatar.cc/100?img=6',
          recipesCount: 100,
          isFollowing: false,
          recipes: [
            { thumb: 'https://picsum.photos/seed/j/100' },
            { thumb: 'https://picsum.photos/seed/k/100' },
            { thumb: 'https://picsum.photos/seed/l/100' },
            { thumb: 'https://picsum.photos/seed/m/100' },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleFollow = userId => {
    setFollowers(prev =>
      prev.map(u => (u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u))
    );
  };

  const handleOpenProfile = userId => {
    console.log(`Open profile of user with id: ${userId}`);
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
                {user.recipes.map((recipe, index) => (
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

      <div className={styles.pagination}>
        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
        <button className={styles.pageBtn}>2</button>
      </div>
    </section>
  );
}
