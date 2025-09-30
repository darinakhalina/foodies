import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Categories.module.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD || 'dp87ga5sb';

const slugify = (s = '') =>
  s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const cdnUrl = name =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/w_343,h_250,c_fill,q_auto,f_auto/foodies/categories/${slugify(
    name
  )}.jpg`;

const NO_PHOTO = `https://res.cloudinary.com/${CLOUD}/image/upload/w_343,h_250,c_fill,q_auto,f_auto/foodies/placeholders/category.png`;

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
  tablet: ['sq', 'sq', 'wide', 'sq', 'sq', 'sq', 'sq', 'wide', 'sq', 'sq', 'sq', 'sq'],
  desktop: ['sq', 'sq', 'wide', 'wide', 'sq', 'sq', 'sq', 'wide', 'sq', 'wide', 'sq'],
};

const LIMITS = {
  mobile: 8,
  tablet: 11,
  desktop: 11,
};

const CategoryCard = ({ item, shape, onOpen }) => {
  const [src, setSrc] = useState(item?.img || cdnUrl(item?.name));
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/category/${slugify(item.name)}`);
  };
  return (
    <li className={clsx(styles.item, styles[shape])}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={src}
          alt={item?.name || 'Category'}
          loading="lazy"
          onError={() => setSrc(cdnUrl(item?.name) || NO_PHOTO)}
        />
        <div className={styles.tools}>
          <span className={styles.badge}>{item?.name}</span>
          <button
            type="button"
            className={styles.goBtn}
            onClick={handleClick}
            aria-label={`Show ${item?.name} recipes`}
          >
            <svg className={styles.icon} aria-hidden>
              <use xlinkHref="/icons/icons.svg#icon-arrow-up-right" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

const Categories = ({ onOpenCategory }) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [err, setErr] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setStatus('loading');
        const res = await fetch(`${API_BASE}/api/categories`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = (json?.data ?? []).map(c => ({
          id: c.id,
          name: c.name,
          img: c.img || '',
        }));
        setItems(data);
        setStatus('ready');
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErr(e.message || 'Request failed');
          setStatus('error');
        }
      }
    })();
    return () => ctrl.abort();
  }, []);

  const bp = useBreakpoint();

  const shaped = useMemo(() => {
    if (bp === 'mobile') {
      return items.map(it => ({ ...it, shape: 'sq' }));
    }

    const pattern = PATTERNS[bp] ?? ['sq'];
    const shapedItems = items.map((it, i) => {
      const shape = pattern[i % pattern.length] || 'sq';
      return { ...it, shape };
    });

    if (bp === 'desktop' && shapedItems.length > 0) {
      const lastIndex = shapedItems.length - 1;
      if (shapedItems[lastIndex].shape === 'wide') {
        shapedItems[lastIndex].shape = 'sq';
      }
    }

    return shapedItems;
  }, [items, bp]);

  const limit = LIMITS[bp] ?? LIMITS.mobile;
  const visibleItems = showAll ? shaped : shaped.slice(0, limit);

  if (status === 'loading') {
    return (
      <section className={styles.section}>
        <p>Loading…</p>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className={styles.section}>
        <p>Error: {err}</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <div>
        <h2 id="categories-title" className={styles.title}>
          Categories
        </h2>
        <p className={styles.subtitle}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
          combine taste, style and the warm atmosphere of the kitchen.
        </p>

        <ul className={styles.grid}>
          {visibleItems.map(it => (
            <CategoryCard key={it.id} item={it} shape={it.shape} onOpen={onOpenCategory} />
          ))}

          {!showAll && items.length > limit && (
            <li className={clsx(styles.item, styles.sq, styles.all)}>
              <button
                type="button"
                className={styles.allBtn}
                onClick={() => setShowAll(true)}
                aria-label="Show all categories"
              >
                All categories
              </button>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
