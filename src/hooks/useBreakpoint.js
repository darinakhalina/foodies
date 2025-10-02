import { useEffect, useState } from 'react';

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

export default useBreakpoint;
