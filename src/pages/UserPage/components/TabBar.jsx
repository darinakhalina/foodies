import styles from './TabBar.module.css';

export default function TabBar({ tabs, activeTab, onTabClick }) {
  return (
    <div className={styles.tabs}>
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          className={`${styles.tab} ${activeTab === t ? styles.active : ''}`}
          onClick={() => onTabClick(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
