import styles from './UserFollowersRow.module.css';

export default function UserFollowerRow({
  id,
  name,
  avatar,
  recipesCount,
  isFollowing,
  onOpen,
  onToggle,
}) {
  return (
    <article className={styles.row}>
      <div className={styles.user}>
        <img className={styles.avatar} src={avatar} alt={`Avatar of user ${name}`} />
        <div className={styles.userInfo}>
          <div className={styles.info}>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.recipes}>Own recipes: {recipesCount}</p>
          </div>
          <button
            type="button"
            className={`${styles.followBtn} ${isFollowing ? styles.unfollow : styles.follow}`}
            onClick={() => onToggle(id)}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => onOpen(id)}
        title="Open profile"
      >
        <svg className={styles.icon} aria-hidden="true" focusable="false">
          <use href="/images/icons.svg#icon-arrow-up-right" />
        </svg>
      </button>
    </article>
  );
}
