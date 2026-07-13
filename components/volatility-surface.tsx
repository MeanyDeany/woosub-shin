"use client";

import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ProvenanceBadge } from "@/components/provenance-badge";
import { VolatilitySurfaceFallback } from "@/components/volatility-surface-fallback";
import {
  MODEL_COLORS,
  SHADOW_MODEL_NAMES,
  SURFACE_SAMPLES,
  type ResearchAsset,
  type ShadowModelName,
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

function interpolateColor(value: number) {
  const stops = [
    new THREE.Color("#42D7F5"),
    new THREE.Color("#4D8DFF"),
    new THREE.Color("#9B6CFF"),
    new THREE.Color("#FFB547"),
  ];
  const normalized = THREE.MathUtils.clamp((value - 0.2) / 0.82, 0, 1);
  const scaled = normalized * (stops.length - 1);
  const lowerIndex = Math.floor(scaled);
  const upperIndex = Math.min(lowerIndex + 1, stops.length - 1);

  return stops[lowerIndex].clone().lerp(stops[upperIndex], scaled - lowerIndex);
}

function buildRibbonGeometry(values: readonly number[], modelIndex: number) {
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const ribbonWidth = 0.88;
  const modelSpacing = 1.36;
  const modelCenter =
    (modelIndex - (SHADOW_MODEL_NAMES.length - 1) / 2) * modelSpacing;

  for (let edgeIndex = 0; edgeIndex < 2; edgeIndex += 1) {
    for (let timeIndex = 0; timeIndex < values.length; timeIndex += 1) {
      const value = values[timeIndex];
      const color = interpolateColor(value);
      const timeProgress = timeIndex / (values.length - 1);

      positions.push(
        (timeProgress - 0.5) * 7.6,
        value * 3.45 - 1.28,
        modelCenter + (edgeIndex === 0 ? -ribbonWidth / 2 : ribbonWidth / 2),
      );
      colors.push(color.r, color.g, color.b);
      uvs.push(timeProgress, edgeIndex);
    }
  }

  for (let timeIndex = 0; timeIndex < values.length - 1; timeIndex += 1) {
    const topLeft = timeIndex;
    const topRight = topLeft + 1;
    const bottomLeft = values.length + timeIndex;
    const bottomRight = bottomLeft + 1;

    indices.push(topLeft, bottomLeft, topRight, topRight, bottomLeft, bottomRight);
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
  const geometries = useMemo(
    () =>
      SHADOW_MODEL_NAMES.map((model, modelIndex) => ({
        geometry: buildRibbonGeometry(sample.values[model], modelIndex),
        model,
      })),
    [sample],
  );

  useEffect(
    () => () => geometries.forEach(({ geometry }) => geometry.dispose()),
    [geometries],
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.29 + Math.sin(clock.elapsedTime * 0.16) * 0.018;
    }
  });

  function handlePointerMove(
    event: ThreeEvent<PointerEvent>,
    model: ShadowModelName,
  ) {
    if (!event.uv) return;
    event.stopPropagation();

    const timeCount = sample.values[SHADOW_MODEL_NAMES[0]].length;
    const timeIndex = Math.round(event.uv.x * (timeCount - 1));

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
    <group ref={groupRef} rotation={[-0.19, -0.29, 0]}>
      {geometries.map(({ geometry, model }) => (
        <group key={model}>
          <mesh
            geometry={geometry}
            onPointerMove={(event) => handlePointerMove(event, model)}
            onPointerOut={() => onHover(null)}
          >
            <meshStandardMaterial
              vertexColors
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
              roughness={0.5}
              metalness={0.06}
            />
          </mesh>
          <mesh geometry={geometry}>
            <meshBasicMaterial
              color="#DCE3EC"
              wireframe
              transparent
              opacity={0.12}
            />
          </mesh>
        </group>
      ))}
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
    <div className="min-h-[548px] min-w-0">
      <div className="mb-3 flex min-h-11 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2"><ProvenanceBadge provenance={sample.provenance} /></div>
          <p className="text-sm font-medium text-[#DCE3EC]">{sample.status}</p>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-[#7E8B9D]">{sample.context}</p>
        </div>
        <div
          className="flex w-fit gap-1 rounded-lg border border-[#7E8B9D]/15 bg-[#080B11] p-1"
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
                  ? "bg-[#4D8DFF]/15 text-white"
                  : "text-[#7E8B9D] hover:bg-white/[0.05] hover:text-[#DCE3EC]"
              }`}
            >
              {assetOption}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative h-[350px] w-full overflow-hidden bg-[#07090D] sm:h-[390px] 2xl:h-[400px]"
        data-surface-mode={surfaceMode}
      >
        {surfaceMode === "interactive" ? (
          <Canvas
            camera={{ position: [6.2, 5, 7.8], fov: 36, near: 0.1, far: 50 }}
            dpr={[1, 1.5]}
            fallback={<VolatilitySurfaceFallback asset={asset} />}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "low-power",
              preserveDrawingBuffer: true,
            }}
          >
            <color attach="background" args={["#07090D"]} />
            <ambientLight intensity={0.48} />
            <directionalLight position={[3.5, 5.5, 4]} intensity={1.65} color="#42D7F5" />
            <directionalLight position={[-4.5, 2.5, -2.5]} intensity={0.9} color="#9B6CFF" />
            <pointLight position={[0, 3.5, -4]} intensity={0.32} color="#FFB547" />
            <gridHelper
              args={[9, 8, "#18334A", "#101722"]}
              position={[0, -1.24, 0]}
            />
            <SurfaceMesh asset={asset} onHover={setHover} />
          </Canvas>
        ) : (
          <VolatilitySurfaceFallback asset={asset} />
        )}

        {hover && surfaceMode === "interactive" ? (
          <div
            className="pointer-events-none absolute z-10 w-48 rounded-md border border-[#7E8B9D]/20 bg-[#080B11]/95 px-3 py-3 text-xs shadow-2xl"
            style={{ left: `${hover.left}%`, top: `${hover.top}%` }}
            role="status"
          >
            <p className="font-semibold text-white">{hover.asset}</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[#7E8B9D]">
              <dt>Model</dt>
              <dd className="text-right text-[#DCE3EC]">{hover.model}</dd>
              <dt>Time</dt>
              <dd className="text-right text-[#DCE3EC]">T-{17 - hover.timeIndex}h</dd>
              <dt>Normalized</dt>
              <dd className="text-right font-mono text-[#DCE3EC]">
                {hover.value.toFixed(3)}
              </dd>
            </dl>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-4 text-xs text-[#7E8B9D] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {SHADOW_MODEL_NAMES.map((model) => (
            <span key={model} className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-5" style={{ backgroundColor: MODEL_COLORS[model] }} />
              {model}
            </span>
          ))}
        </div>
        <p className="font-mono leading-5">X: ILLUSTRATIVE TIME · Y: DISCRETE MODEL · Z: NORMALIZED ILLUSTRATIVE VARIANCE</p>
      </div>
    </div>
  );
}
