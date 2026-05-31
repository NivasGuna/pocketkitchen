"use client";

import { RefObject, useEffect } from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [enabled, handler, ref]);
}
