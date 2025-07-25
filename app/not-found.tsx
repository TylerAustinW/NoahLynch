'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Global 404 handler that redirects to /wrongnote page
 * @returns {React.ReactElement} Redirect component
 */
export default function NotFound(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the custom wrongnote page
    router.replace('/wrongnote');
  }, [router]);

  // Show minimal loading content while redirecting
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-amber-400 text-lg">Redirecting...</div>
      </div>
    </div>
  );
}