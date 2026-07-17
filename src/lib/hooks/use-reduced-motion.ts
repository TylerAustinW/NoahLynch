"use client";

import { useSyncExternalStore } from "react";
import { getMediaQueryList } from "./use-media-query";

const emptySubscribe = () => () => undefined;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return emptySubscribe();
      }

      const mediaQueryList = getMediaQueryList("(prefers-reduced-motion: reduce)");
      mediaQueryList.addEventListener("change", onStoreChange);

      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    () => getMediaQueryList("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
