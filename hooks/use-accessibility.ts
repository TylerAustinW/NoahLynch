/**
 * Accessibility Hooks
 * Custom hooks for improving accessibility and user experience
 */

import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Hook for managing focus within a component
 */
export function useFocusManagement(
  containerRef: RefObject<HTMLElement>
): {
  focusFirst: () => void;
  focusLast: () => void;
  trapFocus: (event: KeyboardEvent) => void;
} {
  const getFocusableElements = (): HTMLElement[] => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(',');

    return Array.from(
      containerRef.current.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  };

  const focusFirst = (): void => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  };

  const focusLast = (): void => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  };

  const trapFocus = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  return { focusFirst, focusLast, trapFocus };
}

/**
 * Hook for detecting reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for managing ARIA live regions
 */
export function useLiveRegion(): {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  ref: RefObject<HTMLDivElement>;
} {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const announce = (
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ): void => {
    if (!liveRegionRef.current) return;

    // Clear previous message
    liveRegionRef.current.textContent = '';

    // Set aria-live attribute
    liveRegionRef.current.setAttribute('aria-live', priority);

    // Add message after a brief delay to ensure screen readers detect the change
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = message;
      }
    }, 100);

    // Clear message after a delay
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = '';
      }
    }, 5000);
  };

  return { announce, ref: liveRegionRef };
}

/**
 * Hook for keyboard navigation
 */
export function useKeyboardNavigation(
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void
): {
  onKeyDown: (event: React.KeyboardEvent) => void;
} {
  const onKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case 'Enter':
        if (onEnter) {
          event.preventDefault();
          onEnter();
        }
        break;
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
      case 'ArrowUp':
        if (onArrowKeys) {
          event.preventDefault();
          onArrowKeys('up');
        }
        break;
      case 'ArrowDown':
        if (onArrowKeys) {
          event.preventDefault();
          onArrowKeys('down');
        }
        break;
      case 'ArrowLeft':
        if (onArrowKeys) {
          event.preventDefault();
          onArrowKeys('left');
        }
        break;
      case 'ArrowRight':
        if (onArrowKeys) {
          event.preventDefault();
          onArrowKeys('right');
        }
        break;
    }
  };

  return { onKeyDown };
}

/**
 * Hook for managing skip links
 */
export function useSkipLink(): {
  skipLinkRef: RefObject<HTMLAnchorElement>;
  targetRef: RefObject<HTMLElement>;
  handleSkip: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const targetRef = useRef<HTMLElement>(null);

  const handleSkip = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    
    if (targetRef.current) {
      targetRef.current.focus();
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    skipLinkRef,
    targetRef,
    handleSkip,
  };
}

/**
 * Hook for color contrast detection
 */
export function useColorScheme(): {
  isDark: boolean;
  isLight: boolean;
  colorScheme: 'light' | 'dark' | 'no-preference';
} {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'no-preference'>('no-preference');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

    const updateColorScheme = () => {
      if (darkModeQuery.matches) {
        setColorScheme('dark');
      } else if (lightModeQuery.matches) {
        setColorScheme('light');
      } else {
        setColorScheme('no-preference');
      }
    };

    updateColorScheme();

    darkModeQuery.addEventListener('change', updateColorScheme);
    lightModeQuery.addEventListener('change', updateColorScheme);

    return () => {
      darkModeQuery.removeEventListener('change', updateColorScheme);
      lightModeQuery.removeEventListener('change', updateColorScheme);
    };
  }, []);

  return {
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light',
    colorScheme,
  };
}