import { useEffect, useState } from 'react';

const mediaQueryInstances = new Map<string, MediaQueryList>();

function getMediaQueryList(query: string): MediaQueryList {
  if (!mediaQueryInstances.has(query)) {
    mediaQueryInstances.set(query, window.matchMedia(query));
  }
  return mediaQueryInstances.get(query)!;
}

export function useMediaQuery(query: string) {
  // Always start with false to ensure server/client consistency
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window === 'undefined') return;

    const mql = getMediaQueryList(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Set initial value after mount
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
