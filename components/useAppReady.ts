"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __ctReady?: boolean;
  }
}

/** Called by the Preloader the moment the loading screen finishes. */
export function markReady() {
  if (typeof window === "undefined") return;
  window.__ctReady = true;
  window.dispatchEvent(new Event("ct:ready"));
}

/**
 * true once the loading screen has cleared (or immediately on client-side
 * navigation, where the preloader already ran this session).
 */
export function useAppReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.__ctReady) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("ct:ready", on);
    return () => window.removeEventListener("ct:ready", on);
  }, []);
  return ready;
}
