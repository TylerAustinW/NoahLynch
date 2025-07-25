import { useEffect, useRef } from 'react';

interface UseFocusTrapOptions {
  isActive: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
}

export function useFocusTrap({ isActive, restoreFocus = true, autoFocus = true }: UseFocusTrapOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement;

    // Get all focusable elements within the container
    const focusableElementsSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(focusableElementsSelector)).filter((element) => {
      // Filter out elements that are not visible or have negative tabindex
      return element.offsetWidth > 0 && element.offsetHeight > 0 && !element.hidden && element.tabIndex !== -1;
    });

    firstFocusableElement.current = focusableElements[0] || null;
    lastFocusableElement.current = focusableElements[focusableElements.length - 1] || null;

    // Auto-focus the first focusable element
    if (autoFocus && firstFocusableElement.current) {
      firstFocusableElement.current.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const { activeElement } = document;
      const isShiftPressed = event.shiftKey;

      // If no focusable elements, prevent tabbing
      if (!firstFocusableElement.current || !lastFocusableElement.current) {
        event.preventDefault();
        return;
      }

      // Handle Shift+Tab on first element - go to last
      if (isShiftPressed && activeElement === firstFocusableElement.current) {
        event.preventDefault();
        lastFocusableElement.current.focus();
        return;
      }

      // Handle Tab on last element - go to first
      if (!isShiftPressed && activeElement === lastFocusableElement.current) {
        event.preventDefault();
        firstFocusableElement.current.focus();
        return;
      }
    };

    // Add event listener to trap focus
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus to previously active element
      if (restoreFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, restoreFocus, autoFocus]);

  return containerRef;
}
