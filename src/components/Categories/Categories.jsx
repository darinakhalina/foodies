import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Categories.module.css';

import { cdnCategoryImg, cdnPlaceholder } from '../../utils/cdn';
import useBreakpoint from '../../hooks/useBreakpoint';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

const CategoryCard = ({ item, shape, onSelect }) => {
  const [src, setSrc] = useState(cdnCategoryImg(item?.img, item?.name));
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = item.name.toLowerCase().replace(/\s+/g, '-');
    if (onSelect) onSelect(slug);
    else navigate(`/category/${slug}`); 
  };

  const handleError = () => {
    if (step === 0) {
      setSrc(cdnCategoryImg('', item?.name));
      setStep(1);
    } else if (step === 1) {
      setSrc(cdnPlaceholder());
      setStep(2);
    }
  };

  return (
    <li className={clsx(styles.item, styles[shape])}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={src}
          alt={item?.name || 'Category'}
          loading="lazy"
          onError={handleError}
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

const Categories = ({ onSelect }) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        const res = await fetch(`${API_BASE}/api/categories`);
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
        setErr(e.message || 'Request failed');
        setStatus('error');
      }
    })();
  }, []);

  const bp = useBreakpoint();

  const shaped = useMemo(() => {
    if (bp === 'mobile') {
      return items.map(it => ({ ...it, shape: 'sq' }));
    }
    const pattern = PATTERNS[bp] ?? ['sq'];
    const shapedItems = items.map((it, i) => ({
      ...it,
      shape: pattern[i % pattern.length] || 'sq',
    }));
    if (bp === 'desktop' && shapedItems.length > 0) {
      const lastIndex = shapedItems.length - 1;
      if (shapedItems[lastIndex].shape === 'wide') {
        shapedItems[lastIndex].shape = 'sq';
      }
    }
    return shapedItems;
  }, [items, bp]);

  const limit = LIMITS[bp] ?? LIMITS.mobile;
  const visibleItems = shaped.slice(0, limit);

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
        <MainTitle id="categories-title" className={styles.title}>
          Categories
        </MainTitle>
        <Subtitle className={styles.subtitle}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
          combine taste, style and the warm atmosphere of the kitchen.
        </Subtitle>

                <ul className={styles.grid}>
          {visibleItems.map(it => (
            <CategoryCard key={it.id} item={it} shape={it.shape} onSelect={onSelect} />
          ))}

          <li className={clsx(styles.item, styles.sq, styles.all)}>
            <button
              type="button"
              className={styles.allBtn}
              onClick={() => (onSelect ? onSelect('all') : null)}
              aria-label="Show all categories"
            >
              All categories
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Categories;
