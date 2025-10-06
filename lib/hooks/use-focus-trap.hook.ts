import { useEffect, useRef } from "react";

interface UseFocusTrapOptions {
  isActive: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
}

export function useFocusTrap({
  isActive,
  restoreFocus = true,
  autoFocus = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    previousActiveElement.current = document.activeElement;

    const focusableElementsSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(", ");

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableElementsSelector),
    ).filter((element) => {
      return (
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        !element.hidden &&
        element.tabIndex !== -1
      );
    });

    firstFocusableElement.current = focusableElements[0] || null;
    lastFocusableElement.current = focusableElements[focusableElements.length - 1] || null;

    if (autoFocus && firstFocusableElement.current) {
      firstFocusableElement.current.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const { activeElement } = document;
      const isShiftPressed = event.shiftKey;

      if (!firstFocusableElement.current || !lastFocusableElement.current) {
        event.preventDefault();
        return;
      }

      if (isShiftPressed && activeElement === firstFocusableElement.current) {
        event.preventDefault();
        lastFocusableElement.current.focus();
        return;
      }

      if (!isShiftPressed && activeElement === lastFocusableElement.current) {
        event.preventDefault();
        firstFocusableElement.current.focus();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (restoreFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, restoreFocus, autoFocus]);

  return containerRef;
}
