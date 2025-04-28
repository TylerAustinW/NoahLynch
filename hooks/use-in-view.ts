'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';

/**
 * Options for configuring the useInView hook
 * @interface UseInViewOptions
 * @property {number} threshold - Value between 0 and 1 indicating the percentage that should be visible before triggering
 * @property {string} rootMargin - Margin around the root element similar to CSS margin property
 * @property {boolean} once - Whether to observe only once and disconnect after intersection
 */
type UseInViewOptions = {
   threshold?: number;
   rootMargin?: string;
   once?: boolean;
};

/**
 * Return type for the useInView hook
 * @interface UseInViewReturn
 * @property {RefObject<HTMLElement>} ref - Ref to attach to the element that should be observed
 * @property {boolean} inView - Whether the element is currently in view
 */
type UseInViewReturn = {
   ref: RefObject<HTMLElement>;
   inView: boolean;
};

/**
 * Hook that tracks whether an element is visible in the viewport
 * Uses IntersectionObserver API to efficiently observe visibility changes
 *
 * @param {UseInViewOptions} options - Configuration options for the hook
 * @returns {UseInViewReturn} Object containing the ref to attach and inView state
 */
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
         { threshold, rootMargin }
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
