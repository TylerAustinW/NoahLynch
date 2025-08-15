'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

type Return = {
  ref: RefObject<HTMLElement>;
  inView: boolean;
};

export function useInView({
  threshold = 0,
  rootMargin = '0px',
  once = false,
}: Options = {}): Return {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const observed = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;

        if (intersecting || !once) {
          setInView(intersecting);
        }

        if (once && intersecting && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observed.current = ref.current;
    observer.observe(ref.current);
    return () => {
      if (observed.current) {
        observer.unobserve(observed.current);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref: ref as RefObject<HTMLElement>, inView };
}
