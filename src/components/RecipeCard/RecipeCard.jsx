import { useState } from 'react';
import styles from './RecipeCard.module.css';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';

// --- STATIC MOCK DATA (replace with backend later) ---
const STATIC_RECIPE = {
  id: 'demo-recipe-1',
  image: '/images/test-cake.png', 
  title: 'BAKEWELL TART',
  description:
    'Classic almond tart with raspberry jam and a delicate shortcrust — a tea-time staple.',
};

const STATIC_AUTHOR = {
  id: 'demo-user-1',
  name: 'Ivetta',
  avatar: '/images/test-cat.png', 
};

export default function RecipeCard() {
  // ---- STATIC “AUTH” + “FAVORITE” STATES ----
  const [isAuthenticated] = useState(false); 
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const recipe = STATIC_RECIPE;
  const author = STATIC_AUTHOR;

  const handleFavoriteToggle = () => {
    if (isAuthenticated) {
      setIsFavorite(v => !v);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleAuthorClick = () => {
    if (isAuthenticated) {
      // later: navigate(`/user/${author.id}`)
      // for static: just log
      console.log('Open author profile:', author.id);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleNavigateToRecipe = () => {
    if (isAuthenticated) {
      // later: navigate(`/recipe/${recipe.id}`)
      console.log('Open recipe details:', recipe.id);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.card}>
        {/* Image */}
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${recipe.image})` }}
          aria-label={recipe.title}
          role="img"
        />

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.header}>
            <h3 className={styles.title}>{recipe.title}</h3>

            {/* Fixed-height slot keeps footer position stable */}
            <div className={styles.descSlot}>
              <p className={styles.description}>{recipe.description}</p>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.author}>
              <button
                onClick={handleAuthorClick}
                className={styles.authorButton}
                type="button"
                title={author.name}
                aria-label={`Open ${author.name} profile`}
              >
                <div
                  className={styles.authorImage}
                  style={{
                    backgroundImage: `url(${author.avatar})`,
                  }}
                />
                <span className={styles.authorName}>{author.name}</span>
              </button>
            </div>

            <div className={styles.actions}>
              <button
                onClick={handleFavoriteToggle}
                className={`${styles.iconButton} ${styles.favoriteButton} ${
                  isFavorite ? styles.isFavorite : ''
                }`}
                aria-pressed={isFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                type="button"
              >
                <img src="/images/icons/heart.svg" alt="" className={styles.icon} />
              </button>

              <button
                onClick={handleNavigateToRecipe}
                className={`${styles.iconButton} ${styles.viewButton}`}
                title="View recipe"
                type="button"
              >
                <img src="/images/icons/arrow-up-right.svg" alt="" className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth modal */}
      {isSignInModalOpen && (
        <Modal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)}>
          <SignInModal />
        </Modal>
      )}
    </>
  );
}
