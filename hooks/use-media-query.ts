import { useState, useEffect } from 'react';

// Singleton pattern for MediaQueryList instances to prevent memory leaks
const mediaQueryInstances = new Map<string, MediaQueryList>();

function getMediaQueryList(query: string): MediaQueryList {
  if (!mediaQueryInstances.has(query)) {
    mediaQueryInstances.set(query, window.matchMedia(query));
  }
  return mediaQueryInstances.get(query)!;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    // Return false during SSR to prevent hydration mismatch
    if (typeof window === 'undefined') return false;
    return getMediaQueryList(query).matches;
  });

  useEffect(() => {
    const mql = getMediaQueryList(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Set initial value after mount to ensure correct state
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
