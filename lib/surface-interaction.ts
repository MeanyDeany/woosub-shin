import type { ShadowModelName } from "@/lib/research-visual-data";

export type SurfaceRotation = {
  pitch: number;
  yaw: number;
};

export const DEFAULT_SURFACE_ROTATION: SurfaceRotation = {
  pitch: -0.19,
  yaw: -0.29,
};

const MAX_YAW_OFFSET = (35 * Math.PI) / 180;
const MAX_PITCH_OFFSET = (12 * Math.PI) / 180;

export function clampSurfaceRotation(rotation: SurfaceRotation): SurfaceRotation {
  return {
    pitch: Math.min(
      Math.max(
        rotation.pitch,
        DEFAULT_SURFACE_ROTATION.pitch - MAX_PITCH_OFFSET,
      ),
      DEFAULT_SURFACE_ROTATION.pitch + MAX_PITCH_OFFSET,
    ),
    yaw: Math.min(
      Math.max(rotation.yaw, DEFAULT_SURFACE_ROTATION.yaw - MAX_YAW_OFFSET),
      DEFAULT_SURFACE_ROTATION.yaw + MAX_YAW_OFFSET,
    ),
  };
}

export function getModelRibbonOpacity(
  model: ShadowModelName,
  selectedModel: ShadowModelName | null,
  hoveredModel: ShadowModelName | null,
) {
  if (selectedModel) return model === selectedModel ? 1 : 0.24;
  if (hoveredModel) return model === hoveredModel ? 1 : 0.58;
  return 0.9;
}
