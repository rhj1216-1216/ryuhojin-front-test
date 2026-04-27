import { useEffect } from 'react';

export const useScrollReveal = (refreshKey?: string) => {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    ).filter((element) => element.dataset.revealed !== 'true');

    if (elements.length === 0) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.dataset.revealed = 'true';
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.dataset.revealed = 'true';
          observer.unobserve(target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.16,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [refreshKey]);
};
