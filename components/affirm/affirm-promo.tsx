"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    affirm?: {
      ui?: {
        ready?: (cb: () => void) => void;
        refresh?: () => void;
      };
    };
  }
}

export function AffirmPromo({ amountInCents }: { amountInCents: number }) {
  useEffect(() => {
    window.affirm?.ui?.ready?.(() => window.affirm?.ui?.refresh?.());
  }, [amountInCents]);

  return (
    <p
      className="affirm-as-low-as text-sm text-black/60"
      data-page-type="product"
      data-amount={amountInCents}
    />
  );
}
