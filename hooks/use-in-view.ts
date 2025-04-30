'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

type UseInViewReturn = {
  ref: RefObject<HTMLElement>;
  inView: boolean;
};

export function useInView({
  threshold = 0,
  rootMargin = '0px',
  once = false,
}: UseInViewOptions = {}): UseInViewReturn {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const observedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting || !once) {
          setInView(isIntersecting);
        }

        if (once && isIntersecting && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin },
    );

    observedRef.current = ref.current;
    observer.observe(ref.current);
    return () => {
      if (observedRef.current) {
        observer.unobserve(observedRef.current);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref: ref as RefObject<HTMLElement>, inView };
}
