import styles from './SignInModal.module.css';

export default function SignInModal() {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Sign in</h2>
      <p className={styles.subtitle}>
        Please log in to like recipes, view profiles, and save favorites.
      </p>

      <form className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            type="email"
            className={styles.input}
            placeholder="you@example.com"
            disabled
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            type="password"
            className={styles.input}
            placeholder="••••••••"
            disabled
          />
        </label>

        <button type="button" className={styles.button} disabled>
          Sign in
        </button>
      </form>

      <p className={styles.hint}>
        Static demo only — replace with real auth flow later.
      </p>
    </div>
  );
}
