import { useState } from 'react';
import styles from './RecipeCard.module.css';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';
import icons from '/images/icons.svg';

/**
 * Props
 * - recipe: {
 *     id, title, description, image,
 *     author: { id, name, avatar }
 *   }
 * - isAuthed: boolean
 * - onNeedAuth: () => void
 * - onOpen: (id) => void            // optional: open recipe details
 * - onAuthor: (authorId) => void     // optional: open author profile
 * - onToggleFavorite: (id) => Promise|void  // optional: toggle favorite
 * - isFavorite: boolean              // optional: favorite state from parent
 */
export default function RecipeCard({
  recipe,
  isAuthed = false,
  onNeedAuth,
  onOpen,
  onAuthor,
  onToggleFavorite,
  isFavorite: favoriteFromParent,
}) {
  const {
    id,
    title,
    description,
    image,
    author = { id: null, name: 'User', avatar: '/images/avatar-placeholder.png' },
  } = recipe || {};

  const [localFav, setLocalFav] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const isFavorite = favoriteFromParent ?? localFav;

  const requireAuth = (fn) => {
    if (isAuthed) return fn();
    if (onNeedAuth) onNeedAuth();
    setIsSignInModalOpen(true);
  };

  const handleFavoriteToggle = () => {
    requireAuth(async () => {
      if (onToggleFavorite) await onToggleFavorite(id);
      else setLocalFav(v => !v);
    });
  };

  const handleAuthorClick = () => {
    requireAuth(() => {
      if (onAuthor && author?.id) onAuthor(author.id);
    });
  };

  const handleNavigateToRecipe = () => {
    if (onOpen) return onOpen(id);
    requireAuth(() => {
      //
    });
  };

  return (
    <>
      <div className={styles.card}>
        {/* Image */}
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${image || '/images/placeholder.png'})` }}
          aria-label={title}
          role="img"
          onClick={handleNavigateToRecipe}
        />

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {/* Keep a fixed-height desc slot so footer is aligned */}
            <div className={styles.descSlot}>
              <p className={styles.description}>{description}</p>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.author}>
              <button
                onClick={handleAuthorClick}
                className={styles.authorButton}
                type="button"
                title={author?.name}
                aria-label={`Open ${author?.name} profile`}
              >
                <div
                  className={styles.authorImage}
                  style={{
                    backgroundImage: `url(${author?.avatar || '/images/avatar-placeholder.png'})`,
                  }}
                />
                <span className={styles.authorName}>{author?.name}</span>
              </button>
            </div>

            <div className={styles.actions}>
              <button
                onClick={handleFavoriteToggle}
                className={`${styles.iconButton} ${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
                aria-pressed={isFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                type="button"
              >
                <svg className={styles.icon} width="16" height="16">
                  <use href={`${icons}#icon-heart`} />
                </svg>
              </button>

              <button
                onClick={handleNavigateToRecipe}
                className={`${styles.iconButton} ${styles.viewButton}`}
                title="View recipe"
                type="button"
              >
                <svg className={styles.icon} width="16" height="16">
                  <use href={`${icons}#icon-arrow-up-right`} />
                </svg>
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
