"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function NotFound(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.replace("/wrongnote");
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-amber-400 text-lg">Redirecting...</div>
      </div>
    </div>
  );
}
