import { useEffect } from 'react';

export default function useLockBodyScroll(isLocked) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevOverflow = document.body.style.overflow;
    if (isLocked) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [isLocked]);
}
