import styles from './UserRecipeRow.module.css';

export default function UserRecipeRow({ id, title, description, thumb, onOpen }) {
  return (
    <article className={styles.row}>
      <img className={styles.thumb} src={thumb} alt={title} />

      <div className={styles.body}>
        <div className={styles.topLine}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn} onClick={() => onOpen(id)}>
              <svg className={styles.icon} aria-hidden="true" focusable="false">
                <use href="/images/icons.svg#icon-arrow-up-right" />
              </svg>
            </button>
            <button type="button" className={styles.actionBtn} onClick={onOpen}>
              <svg className={styles.icon} aria-hidden="true" focusable="false">
                <use href="/images/icons.svg#icon-trash" />
              </svg>
            </button>
          </div>
        </div>
        <p className={styles.desc}>{description}</p>
      </div>
    </article>
  );
}
