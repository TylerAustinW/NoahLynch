import { useEffect, useRef } from "react";

/**
 * Custom hook to lock/unlock body scroll with iOS Safari support and scrollbar gap preservation
 * @param isLocked - Whether scroll should be locked
 */
export const useScrollLock = (isLocked: boolean) => {
    const scrollPositionRef = useRef<number>(0);
    const originalStylesRef = useRef<{
        position: string;
        top: string;
        width: string;
        paddingRight: string;
        overflow: string;
    }>({
        position: "",
        top: "",
        width: "",
        paddingRight: "",
        overflow: "",
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const body = document.body;
        const documentElement = document.documentElement;

        if (isLocked) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY;

            // Save original styles
            originalStylesRef.current = {
                position: body.style.position,
                top: body.style.top,
                width: body.style.width,
                paddingRight: body.style.paddingRight,
                overflow: documentElement.style.overflow,
            };

            // Calculate scrollbar width to prevent content shift
            const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

            // Apply scroll lock styles (iOS Safari compatible)
            body.style.position = "fixed";
            body.style.top = `-${scrollPositionRef.current}px`;
            body.style.width = "100%";
            body.style.paddingRight = `${scrollbarWidth}px`;
            documentElement.style.overflow = "hidden";

            // Prevent touch scrolling on mobile
            const preventTouchMove = (e: TouchEvent) => {
                e.preventDefault();
            };

            document.addEventListener("touchmove", preventTouchMove, { passive: false });

            return () => {
                // Remove touch event listener
                document.removeEventListener("touchmove", preventTouchMove);
            };
        } else {
            // Restore original styles
            body.style.position = originalStylesRef.current.position;
            body.style.top = originalStylesRef.current.top;
            body.style.width = originalStylesRef.current.width;
            body.style.paddingRight = originalStylesRef.current.paddingRight;
            documentElement.style.overflow = originalStylesRef.current.overflow;

            // Restore scroll position
            window.scrollTo(0, scrollPositionRef.current);
        }

        // Cleanup function for component unmount
        return () => {
            if (isLocked) {
                body.style.position = originalStylesRef.current.position;
                body.style.top = originalStylesRef.current.top;
                body.style.width = originalStylesRef.current.width;
                body.style.paddingRight = originalStylesRef.current.paddingRight;
                documentElement.style.overflow = originalStylesRef.current.overflow;
                window.scrollTo(0, scrollPositionRef.current);
            }
        };
    }, [isLocked]);
};
