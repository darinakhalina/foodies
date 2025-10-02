import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';

import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setStatus('loading');
        const res = await fetch(`${API_BASE}/api/testimonials?limit=5&page=1`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(data.data.items);
        setStatus('ready');
      } catch (err) {
        console.error('Failed to load testimonials', err);
        setError(err.message);
        setStatus('error');
      }
    };
    fetchTestimonials();
  }, []);

  if (status === 'loading') {
    return (
      <section className={styles.section}>
        <div className="f-container">
          <p>Loading testimonials…</p>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className={styles.section}>
        <div className="f-container">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className="f-container">
        <Subtitle className={styles.subtitle}>What our customer say</Subtitle>
        <MainTitle id="testimonials-title" className={styles.title}>
          TESTIMONIALS
        </MainTitle>

        {items.length === 0 ? (
          <p className={styles.empty}>No testimonials yet</p>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            loop={items.length > 1}
          >
            {items.map(t => (
              <SwiperSlide key={t.id}>
                <div className={styles.slide}>
                  <div className={styles.iconWrap}>
                    <svg className={styles.icon} aria-hidden="true">
                      <use xlinkHref="/icons/icons.svg#icon-untitled" />
                    </svg>
                  </div>
                  <p className={styles.text}>{t.testimonial}</p>
                  <p className={styles.author}>{t.authorName}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
