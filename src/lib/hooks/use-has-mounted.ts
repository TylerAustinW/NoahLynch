"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => undefined;

export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
