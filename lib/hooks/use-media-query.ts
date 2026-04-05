"use client";

import { useSyncExternalStore } from "react";

const mediaQueryInstances = new Map<string, MediaQueryList>();
const emptySubscribe = () => () => undefined;

function getMediaQueryList(query: string): MediaQueryList {
  let mediaQueryList = mediaQueryInstances.get(query);

  if (!mediaQueryList) {
    mediaQueryList = window.matchMedia(query);
    mediaQueryInstances.set(query, mediaQueryList);
  }

  return mediaQueryList;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return emptySubscribe();
      }

      const mediaQueryList = getMediaQueryList(query);
      mediaQueryList.addEventListener("change", onStoreChange);

      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    () => getMediaQueryList(query).matches,
    () => false,
  );
}
