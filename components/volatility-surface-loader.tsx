"use client";

import dynamic from "next/dynamic";
import { VolatilitySurfaceLoading } from "@/components/volatility-surface-fallback";

const DynamicVolatilitySurface = dynamic(
  () =>
    import("@/components/volatility-surface").then(
      (module) => module.VolatilitySurface,
    ),
  {
    ssr: false,
    loading: () => <VolatilitySurfaceLoading />,
  },
);

export function VolatilitySurfaceLoader() {
  return <DynamicVolatilitySurface />;
}
