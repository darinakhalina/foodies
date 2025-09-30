import styles from './UserInfo.module.css';

export default function UserInfo({ user, isOwnProfile }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img className={styles.avatar} src={user.avatar} alt={user.name} />
        <div>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
      </div>

      <ul className={styles.stats}>
        <li>
          <span>Recipes</span>
          <strong>{user.stats.recipes}</strong>
        </li>
        <li>
          <span>Favorites</span>
          <strong>{user.stats.favorites}</strong>
        </li>
        <li>
          <span>Followers</span>
          <strong>{user.stats.followers}</strong>
        </li>
        <li>
          <span>Following</span>
          <strong>{user.stats.following}</strong>
        </li>
      </ul>

      <button className={styles.logout} type="button">
        {isOwnProfile ? 'LOG OUT' : 'MESSAGE'}
      </button>
    </div>
  );
}
