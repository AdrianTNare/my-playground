"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { playTick } from "@/lib/sound";
import { useUiStore } from "@/stores/ui";

interface ProvidersProps {
  children: ReactNode;
}

const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
  if (useUiStore.getState().muted) return;
  const target = event.target as Element;
  if (target.closest("[data-nav-sound]")) playTick();
};

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  // Saved preferences live in localStorage, which the server can't read.
  // Rehydrating after mount keeps the first client render equal to the
  // server HTML; an inline script in <head> already applied the accent.
  useEffect(() => {
    void useUiStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* One capture listener plays the tick for any [data-nav-sound] element. */}
      <div onPointerDownCapture={onPointerDown} className="contents">
        {children}
      </div>
    </QueryClientProvider>
  );
};
