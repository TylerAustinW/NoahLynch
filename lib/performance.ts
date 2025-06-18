/**
 * Performance Utilities
 * Tools for monitoring and optimizing application performance
 */

export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
}

/**
 * Performance measurement utility
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetrics> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start measuring performance for a specific operation
   */
  startMeasurement(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);
    }
  }

  /**
   * End measurement and record the metric
   */
  endMeasurement(name: string): PerformanceMetrics | null {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const measure = performance.getEntriesByName(name, 'measure')[0];
        const metric: PerformanceMetrics = {
          name,
          duration: measure.duration,
          timestamp: measure.startTime,
        };

        this.metrics.set(name, metric);
        
        // Clean up marks
        performance.clearMarks(`${name}-start`);
        performance.clearMarks(`${name}-end`);
        performance.clearMeasures(name);

        return metric;
      } catch (error) {
        console.warn(`Failed to measure performance for ${name}:`, error);
        return null;
      }
    }
    return null;
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetrics[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get a specific metric by name
   */
  getMetric(name: string): PerformanceMetrics | undefined {
    return this.metrics.get(name);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
  }
}

/**
 * Debounce utility for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle utility for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Intersection Observer with performance monitoring
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return null;
  }

  const monitor = PerformanceMonitor.getInstance();

  const wrappedCallback: IntersectionObserverCallback = (entries, observer) => {
    monitor.startMeasurement('intersection-observer');
    callback(entries, observer);
    monitor.endMeasurement('intersection-observer');
  };

  return new IntersectionObserver(wrappedCallback, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  });
}

/**
 * Image preload utility
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(sources: string[]): Promise<void> {
  const monitor = PerformanceMonitor.getInstance();
  monitor.startMeasurement('image-preload');

  try {
    await Promise.all(sources.map(preloadImage));
  } finally {
    monitor.endMeasurement('image-preload');
  }
}

/**
 * Web Vitals monitoring
 */
export function reportWebVitals(
  metric: { name: string; value: number; id: string }
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital ${metric.name}:`, metric.value);
  }

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: gtag('event', metric.name, { value: metric.value });
  }
}

/**
 * Lazy loading utility with performance monitoring
 */
export function createLazyLoader(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const monitor = PerformanceMonitor.getInstance();

  return createIntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          monitor.startMeasurement(`lazy-load-${target.id || 'unknown'}`);
          
          // Trigger lazy loading
          target.dispatchEvent(new CustomEvent('lazy-load'));
          
          monitor.endMeasurement(`lazy-load-${target.id || 'unknown'}`);
        }
      });
    },
    { threshold, rootMargin }
  );
}