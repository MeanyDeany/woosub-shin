"use client";

import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { VolatilitySurfaceFallback } from "@/components/volatility-surface-fallback";
import {
  MODEL_COLORS,
  SHADOW_MODEL_NAMES,
  SURFACE_SAMPLES,
  type ResearchAsset,
  type SurfaceSample,
} from "@/lib/research-visual-data";
import { shouldUseStaticSurface } from "@/lib/surface-capability";

type SurfaceMode = "checking" | "interactive" | "static";

type HoverDetail = {
  asset: ResearchAsset;
  left: number;
  model: (typeof SHADOW_MODEL_NAMES)[number];
  timeIndex: number;
  top: number;
  value: number;
};

type DeviceNavigator = Navigator & {
  deviceMemory?: number;
};

const modelSubdivisions = 6;

function interpolateColor(value: number) {
  const stops = [
    new THREE.Color("#67e8f9"),
    new THREE.Color("#60a5fa"),
    new THREE.Color("#a78bfa"),
    new THREE.Color("#fbbf24"),
  ];
  const normalized = THREE.MathUtils.clamp((value - 0.2) / 0.82, 0, 1);
  const scaled = normalized * (stops.length - 1);
  const lowerIndex = Math.floor(scaled);
  const upperIndex = Math.min(lowerIndex + 1, stops.length - 1);

  return stops[lowerIndex].clone().lerp(stops[upperIndex], scaled - lowerIndex);
}

function buildSurfaceGeometry(sample: SurfaceSample) {
  const timeCount = sample.values[SHADOW_MODEL_NAMES[0]].length;
  const rowCount = (SHADOW_MODEL_NAMES.length - 1) * modelSubdivisions + 1;
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const modelPosition = rowIndex / modelSubdivisions;
    const lowerModelIndex = Math.min(
      Math.floor(modelPosition),
      SHADOW_MODEL_NAMES.length - 1,
    );
    const upperModelIndex = Math.min(
      lowerModelIndex + 1,
      SHADOW_MODEL_NAMES.length - 1,
    );
    const modelBlend = modelPosition - lowerModelIndex;
    const lowerValues = sample.values[SHADOW_MODEL_NAMES[lowerModelIndex]];
    const upperValues = sample.values[SHADOW_MODEL_NAMES[upperModelIndex]];

    for (let timeIndex = 0; timeIndex < timeCount; timeIndex += 1) {
      const value = THREE.MathUtils.lerp(
        lowerValues[timeIndex],
        upperValues[timeIndex],
        modelBlend,
      );
      const color = interpolateColor(value);
      const timeProgress = timeIndex / (timeCount - 1);
      const modelProgress = rowIndex / (rowCount - 1);

      positions.push(
        (timeProgress - 0.5) * 7,
        value * 2.35 - 0.9,
        (modelProgress - 0.5) * 4.2,
      );
      colors.push(color.r, color.g, color.b);
      uvs.push(timeProgress, modelProgress);
    }
  }

  for (let rowIndex = 0; rowIndex < rowCount - 1; rowIndex += 1) {
    for (let timeIndex = 0; timeIndex < timeCount - 1; timeIndex += 1) {
      const topLeft = rowIndex * timeCount + timeIndex;
      const topRight = topLeft + 1;
      const bottomLeft = (rowIndex + 1) * timeCount + timeIndex;
      const bottomRight = bottomLeft + 1;

      indices.push(topLeft, bottomLeft, topRight, topRight, bottomLeft, bottomRight);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

function SurfaceMesh({
  asset,
  onHover,
}: {
  asset: ResearchAsset;
  onHover: (detail: HoverDetail | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sample = SURFACE_SAMPLES[asset];
  const geometry = useMemo(() => buildSurfaceGeometry(sample), [sample]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.19 + Math.sin(clock.elapsedTime * 0.22) * 0.035;
    }
  });

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    if (!event.uv) return;
    event.stopPropagation();

    const timeCount = sample.values[SHADOW_MODEL_NAMES[0]].length;
    const timeIndex = Math.round(event.uv.x * (timeCount - 1));
    const modelIndex = Math.round(event.uv.y * (SHADOW_MODEL_NAMES.length - 1));
    const model = SHADOW_MODEL_NAMES[modelIndex];

    onHover({
      asset,
      left: THREE.MathUtils.clamp((event.pointer.x + 1) * 50, 8, 82),
      model,
      timeIndex,
      top: THREE.MathUtils.clamp((1 - event.pointer.y) * 50, 8, 72),
      value: sample.values[model][timeIndex],
    });
  }

  return (
    <group ref={groupRef} rotation={[-0.08, -0.19, 0]}>
      <mesh
        geometry={geometry}
        onPointerMove={handlePointerMove}
        onPointerOut={() => onHover(null)}
      >
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          transparent
          opacity={0.78}
          roughness={0.64}
          metalness={0.08}
        />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#dbeafe"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
}

function hasWebGlSupport() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");

    if (context && "getExtension" in context) {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }

    return Boolean(context);
  } catch {
    return false;
  }
}

function getSurfaceMode(reducedMotion: boolean): SurfaceMode {
  const device = navigator as DeviceNavigator;
  return shouldUseStaticSurface({
    deviceMemory: device.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    reducedMotion,
    webGlSupported: hasWebGlSupport(),
  })
    ? "static"
    : "interactive";
}

export function VolatilitySurface() {
  const [asset, setAsset] = useState<ResearchAsset>("BTCUSDT");
  const [hover, setHover] = useState<HoverDetail | null>(null);
  const [surfaceMode, setSurfaceMode] = useState<SurfaceMode>("checking");

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => setSurfaceMode(getSurfaceMode(motionQuery.matches));

    updateMode();
    motionQuery.addEventListener("change", updateMode);
    return () => motionQuery.removeEventListener("change", updateMode);
  }, []);

  const sample = SURFACE_SAMPLES[asset];

  return (
    <div>
      <div className="mb-4 flex min-h-11 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-300">{sample.context}</p>
          <p className="mt-1 text-xs text-neutral-500">
            Frozen, sanitized portfolio sample. No live data.
          </p>
        </div>
        <div
          className="flex w-fit gap-1 rounded-lg border border-white/10 bg-neutral-950 p-1"
          role="group"
          aria-label="Research asset surface"
        >
          {(Object.keys(SURFACE_SAMPLES) as ResearchAsset[]).map((assetOption) => (
            <button
              key={assetOption}
              type="button"
              aria-pressed={asset === assetOption}
              onClick={() => {
                setHover(null);
                setAsset(assetOption);
              }}
              className={`min-w-20 rounded-md px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                asset === assetOption
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-200"
              }`}
            >
              {assetOption}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative h-[420px] w-full overflow-hidden bg-neutral-950 sm:h-[540px]"
        data-surface-mode={surfaceMode}
      >
        {surfaceMode === "interactive" ? (
          <Canvas
            camera={{ position: [5.4, 4.2, 6.5], fov: 39, near: 0.1, far: 50 }}
            dpr={[1, 1.5]}
            fallback={<VolatilitySurfaceFallback asset={asset} />}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "low-power",
              preserveDrawingBuffer: true,
            }}
          >
            <color attach="background" args={["#0a0a0a"]} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 5, 4]} intensity={1.4} color="#dbeafe" />
            <directionalLight position={[-4, 2, -2]} intensity={0.7} color="#c4b5fd" />
            <gridHelper
              args={[8, 12, "#334155", "#172033"]}
              position={[0, -0.89, 0]}
            />
            <SurfaceMesh asset={asset} onHover={setHover} />
          </Canvas>
        ) : (
          <VolatilitySurfaceFallback asset={asset} />
        )}

        {hover && surfaceMode === "interactive" ? (
          <div
            className="pointer-events-none absolute z-10 w-48 rounded-md border border-white/10 bg-neutral-950/95 px-3 py-3 text-xs shadow-xl"
            style={{ left: `${hover.left}%`, top: `${hover.top}%` }}
            role="status"
          >
            <p className="font-semibold text-white">{hover.asset}</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-neutral-400">
              <dt>Model</dt>
              <dd className="text-right text-neutral-200">{hover.model}</dd>
              <dt>Time</dt>
              <dd className="text-right text-neutral-200">T-{17 - hover.timeIndex}h</dd>
              <dt>Normalized</dt>
              <dd className="text-right font-mono text-neutral-200">
                {hover.value.toFixed(3)}
              </dd>
            </dl>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-4 text-xs text-neutral-500 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {SHADOW_MODEL_NAMES.map((model) => (
            <span key={model} className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: MODEL_COLORS[model] }}
              />
              {model}
            </span>
          ))}
        </div>
        <p className="font-mono">X: TIME · Y: MODEL · Z: NORMALIZED VARIANCE</p>
      </div>
    </div>
  );
}
