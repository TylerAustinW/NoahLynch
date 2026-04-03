"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function NotFound(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.replace("/wrongnote");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <div className="text-lg text-amber-400">Redirecting...</div>
      </div>
    </div>
  );
}
