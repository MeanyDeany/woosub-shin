export type SurfaceCapabilities = {
  deviceMemory?: number;
  hardwareConcurrency: number;
  reducedMotion: boolean;
  webGlSupported: boolean;
};

export function shouldUseStaticSurface({
  deviceMemory,
  hardwareConcurrency,
  reducedMotion,
  webGlSupported,
}: SurfaceCapabilities) {
  const lowPowerDevice =
    hardwareConcurrency <= 2 ||
    (typeof deviceMemory === "number" && deviceMemory <= 2);

  return reducedMotion || lowPowerDevice || !webGlSupported;
}
