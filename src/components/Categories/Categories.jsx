import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from './Categories.module.css';

const useBreakpoint = () => {
  const getBp = () => {
    if (typeof window === 'undefined') return 'mobile';
    if (window.matchMedia('(min-width: 1440px)').matches) return 'desktop';
    if (window.matchMedia('(min-width: 768px)').matches) return 'tablet';
    return 'mobile';
  };

  const [bp, setBp] = useState(getBp);

  useEffect(() => {
    const onChange = () => setBp(getBp());
    const mqDesktop = window.matchMedia('(min-width: 1440px)');
    const mqTablet = window.matchMedia('(min-width: 768px)');

    mqDesktop.addEventListener('change', onChange);
    mqTablet.addEventListener('change', onChange);

    return () => {
      mqDesktop.removeEventListener('change', onChange);
      mqTablet.removeEventListener('change', onChange);
    };
  }, []);

  return bp;
};

const PATTERNS = {
  mobile: ['sq'],
  tablet: ['sq', 'sq', 'wide', 'sq', 'sq', 'sq', 'sq', 'wide', 'sq', 'sq', 'sq', 'sq', 'wide'],
  desktop: ['sq', 'sq', 'wide', 'wide', 'sq', 'sq', 'sq', 'wide', 'sq', 'wide', 'sq', 'sq'],
};

const repeatPattern = (pattern, n) =>
  Array.from({ length: n }, (_, i) => pattern[i % pattern.length]);

const CategoryCard = ({ item, shape, onOpen }) => {
  return (
    <li className={clsx(styles.item, styles[shape])}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={item?.thumb || '/images/placeholder-category.jpg'}
          alt={item?.name || 'Category'}
          loading="lazy"
        />

        <div className={styles.tools}>
          <span className={styles.badge}>{item?.name}</span>

          <button
            type="button"
            className={styles.goBtn}
            onClick={() => onOpen?.(item)}
            aria-label={`Show ${item?.name} recipes`}
          >
            <svg className={styles.icon} aria-hidden>
              <use href="/images/icons.svg#icon-arrow-up-right" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

const Categories = ({ items = [], onOpenCategory }) => {
  const bp = useBreakpoint();
  const pattern = PATTERNS[bp] ?? PATTERNS.mobile;

  const shaped = useMemo(() => {
    const shapes = repeatPattern(pattern, items.length);
    return items.map((it, i) => ({ ...it, shape: shapes[i] }));
  }, [items, pattern]);

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <h2 id="categories-title" className={styles.title}>
        Categories
      </h2>
      <p className={styles.subtitle}>
        Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
        combine taste, style and the warm atmosphere of the kitchen.
      </p>

      <ul className={styles.grid}>
        {shaped.map(it => (
          <CategoryCard key={it.id} item={it} shape={it.shape} onOpen={onOpenCategory} />
        ))}

        <li className={clsx(styles.item, styles.all)}>
          <button
            type="button"
            className={styles.allBtn}
            onClick={() => onOpenCategory?.({ id: 'all' })}
            aria-label="Show all categories"
          >
            All categories
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Categories;
