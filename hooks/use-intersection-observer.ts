/**
 * Enhanced Intersection Observer Hook
 * Improved version with performance monitoring and better TypeScript support
 */

import { useEffect, useRef, useState, RefObject } from 'react';
import { PerformanceMonitor } from '@/lib/performance';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  measurePerformance?: boolean;
}

export interface UseIntersectionObserverReturn<T extends HTMLElement> {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
  ref: RefObject<T>;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
  measurePerformance = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const monitor = measurePerformance ? PerformanceMonitor.getInstance() : null;

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element || frozen) return;

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported');
      return;
    }

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (measurePerformance && monitor) {
        monitor.startMeasurement('intersection-observer-callback');
      }

      const [observerEntry] = entries;
      
      if (observerEntry) {
        setEntry(observerEntry);
        setIsIntersecting(observerEntry.isIntersecting);
      }

      if (measurePerformance && monitor) {
        monitor.endMeasurement('intersection-observer-callback');
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, root, rootMargin, frozen, measurePerformance, monitor]);

  return {
    isIntersecting,
    entry,
    ref: elementRef,
  };
}

/**
 * Simplified hook for basic visibility detection
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { isIntersecting, ref } = useIntersectionObserver<T>({
    threshold: 0.1,
    freezeOnceVisible: true,
    ...options,
  });

  return { isInView: isIntersecting, ref };
}

/**
 * Hook for lazy loading with intersection observer
 */
export function useLazyLoad<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { isIntersecting, ref } = useIntersectionObserver<T>({
    threshold: 0.1,
    rootMargin: '100px',
    freezeOnceVisible: true,
    measurePerformance: true,
    ...options,
  });

  return [ref, isIntersecting];
}

/**
 * Hook for triggering animations when element comes into view
 */
export function useAnimateOnInView<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { isIntersecting, ref } = useIntersectionObserver<T>({
    threshold: 0.2,
    rootMargin: '50px',
    freezeOnceVisible: true,
    ...options,
  });

  return [ref, isIntersecting];
}