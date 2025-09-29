import styles from './UserRecipeRow.module.css';

export default function UserRecipeRow({
  title,
  description,
  thumb,
  onOpen,
  onLike,
  liked = false,
}) {
  return (
    <article className={styles.row}>
      <img className={styles.thumb} src={thumb} alt={title} />

      <div className={styles.body}>
        <div className={styles.topLine}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.actionBtn} ${liked ? styles.isActive : ''}`}
              aria-pressed={liked}
              onClick={onLike}
            >
              <img src="/images/icons/arrow-up-right.svg" alt="like" />
            </button>
            <button type="button" className={styles.actionBtn} onClick={onOpen}>
              <img src="/images/icons/trash.svg" alt="open" />
            </button>
          </div>
        </div>
        <p className={styles.desc}>{description}</p>
      </div>
    </article>
  );
}
