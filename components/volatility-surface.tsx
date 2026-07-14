"use client";

import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
import {
  DEFAULT_SURFACE_ROTATION,
  clampSurfaceRotation,
  getModelRibbonOpacity,
  type SurfaceRotation,
} from "@/lib/surface-interaction";
import { shouldUseStaticSurface } from "@/lib/surface-capability";

type SurfaceMode = "checking" | "interactive" | "static";

type HoverDetail = {
  asset: ResearchAsset;
  left: number;
  model: ShadowModelName;
  timeIndex: number;
  top: number;
  value: number;
};

type DragSession = {
  initialRotation: SurfaceRotation;
  intent: "pending" | "rotate" | "vertical";
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
};

type DeviceNavigator = Navigator & {
  deviceMemory?: number;
};

const DRAG_THRESHOLD = 7;
const ROTATION_SENSITIVITY = 0.0042;
const IDLE_RETURN_DELAY_MS = 12_000;

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
  autoRotate,
  dragging,
  hoveredModel,
  onHover,
  onReturnComplete,
  onSelect,
  resetVersion,
  returning,
  rotation,
  selectedModel,
}: {
  asset: ResearchAsset;
  autoRotate: boolean;
  dragging: boolean;
  hoveredModel: ShadowModelName | null;
  onHover: (detail: HoverDetail | null) => void;
  onReturnComplete: () => void;
  onSelect: (model: ShadowModelName) => void;
  resetVersion: number;
  returning: boolean;
  rotation: SurfaceRotation;
  selectedModel: ShadowModelName | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const returnReportedRef = useRef(false);
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

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.set(
      DEFAULT_SURFACE_ROTATION.pitch,
      DEFAULT_SURFACE_ROTATION.yaw,
      0,
    );
  }, [asset, resetVersion]);

  useEffect(() => {
    if (!returning) returnReportedRef.current = false;
  }, [returning]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const idleDrift = autoRotate ? Math.sin(clock.elapsedTime * 0.16) * 0.018 : 0;
    const targetPitch = rotation.pitch;
    const targetYaw = rotation.yaw + idleDrift;

    if (dragging) {
      group.rotation.x = targetPitch;
      group.rotation.y = targetYaw;
    } else {
      const interpolation = returning ? 0.045 : 0.12;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetPitch, interpolation);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetYaw, interpolation);
    }

    if (
      returning &&
      !returnReportedRef.current &&
      Math.abs(group.rotation.x - targetPitch) < 0.001 &&
      Math.abs(group.rotation.y - targetYaw) < 0.001
    ) {
      returnReportedRef.current = true;
      onReturnComplete();
    }
  });

  function handlePointerMove(
    event: ThreeEvent<PointerEvent>,
    model: ShadowModelName,
  ) {
    if (dragging || !event.uv) return;
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
    <group ref={groupRef} rotation={[rotation.pitch, rotation.yaw, 0]}>
      {geometries.map(({ geometry, model }) => {
        const opacity = getModelRibbonOpacity(model, selectedModel, hoveredModel);
        return (
          <group key={model}>
            <mesh
              geometry={geometry}
              onClick={(event) => {
                if (dragging || event.delta > DRAG_THRESHOLD) return;
                event.stopPropagation();
                onSelect(model);
              }}
              onPointerMove={(event) => handlePointerMove(event, model)}
              onPointerOut={() => onHover(null)}
            >
              <meshStandardMaterial
                vertexColors
                side={THREE.DoubleSide}
                transparent
                opacity={opacity}
                roughness={0.5}
                metalness={0.06}
              />
            </mesh>
            <mesh geometry={geometry}>
              <meshBasicMaterial
                color="#DCE3EC"
                wireframe
                transparent
                opacity={Math.max(0.04, opacity * 0.14)}
              />
            </mesh>
          </group>
        );
      })}
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hover, setHover] = useState<HoverDetail | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  const [rotation, setRotation] = useState<SurfaceRotation>({ ...DEFAULT_SURFACE_ROTATION });
  const [selectedModel, setSelectedModel] = useState<ShadowModelName | null>(null);
  const [surfaceMode, setSurfaceMode] = useState<SurfaceMode>("checking");
  const dragSessionRef = useRef<DragSession | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => setSurfaceMode(getSurfaceMode(motionQuery.matches));

    updateMode();
    motionQuery.addEventListener("change", updateMode);
    return () => motionQuery.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    if (!hasInteracted || isDragging || isReturning || surfaceMode !== "interactive") return;
    const idleTimer = window.setTimeout(() => {
      setHover(null);
      setRotation({ ...DEFAULT_SURFACE_ROTATION });
      setIsReturning(true);
    }, IDLE_RETURN_DELAY_MS);
    return () => window.clearTimeout(idleTimer);
  }, [hasInteracted, isDragging, isReturning, rotation, selectedModel, surfaceMode]);

  const resetSurface = useCallback(() => {
    dragSessionRef.current = null;
    setHasInteracted(false);
    setHover(null);
    setIsDragging(false);
    setIsReturning(false);
    setRotation({ ...DEFAULT_SURFACE_ROTATION });
    setSelectedModel(null);
    setResetVersion((version) => version + 1);
  }, []);

  const sample = SURFACE_SAMPLES[asset];
  const hoveredModel = hover?.model ?? null;
  const interactive = surfaceMode === "interactive";
  const selectedValues = selectedModel ? sample.values[selectedModel] : null;
  const selectedRange = selectedValues
    ? {
        maximum: Math.max(...selectedValues).toFixed(3),
        minimum: Math.min(...selectedValues).toFixed(3),
        points: selectedValues.length,
      }
    : null;

  function nudgeYaw(direction: -1 | 1) {
    setHasInteracted(true);
    setHover(null);
    setIsReturning(false);
    setRotation((current) =>
      clampSurfaceRotation({ ...current, yaw: current.yaw + direction * 0.12 }),
    );
  }

  function toggleModel(model: ShadowModelName) {
    if (!interactive || isDragging) return;
    setHasInteracted(true);
    setHover(null);
    setSelectedModel((current) => (current === model ? null : model));
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!interactive || event.button !== 0) return;
    dragSessionRef.current = {
      initialRotation: rotation,
      intent: "pending",
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const session = dragSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - session.startX;
    const deltaY = event.clientY - session.startY;

    if (session.intent === "pending") {
      if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;
      if (session.pointerType === "touch" && Math.abs(deltaY) > Math.abs(deltaX)) {
        session.intent = "vertical";
        return;
      }
      session.intent = "rotate";
      event.currentTarget.setPointerCapture(event.pointerId);
      setHasInteracted(true);
      setHover(null);
      setIsDragging(true);
      setIsReturning(false);
    }

    if (session.intent !== "rotate") return;
    event.preventDefault();
    setRotation(
      clampSurfaceRotation({
        pitch: session.initialRotation.pitch - deltaY * ROTATION_SENSITIVITY,
        yaw: session.initialRotation.yaw + deltaX * ROTATION_SENSITIVITY,
      }),
    );
  }

  function finishPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const session = dragSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) return;
    dragSessionRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const interactionStatus = !interactive
    ? "Static accessibility view"
    : isDragging
      ? "Dragging surface"
      : isReturning
        ? "Returning to default view"
        : selectedModel
          ? `Ribbon selected: ${selectedModel}`
          : hoveredModel
            ? `Ribbon hovered: ${hoveredModel}`
            : "Surface idle";

  return (
    <div className="min-h-[620px] min-w-0">
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
                setAsset(assetOption);
                resetSurface();
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
        data-interaction-state={interactionStatus}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onLostPointerCapture={finishPointer}
        onPointerLeave={() => {
          if (dragSessionRef.current?.intent !== "rotate") dragSessionRef.current = null;
        }}
        style={{ touchAction: "pan-y" }}
      >
        {interactive ? (
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
            onPointerMissed={() => {
              if (!isDragging) {
                setHover(null);
                setSelectedModel(null);
              }
            }}
            style={{ touchAction: "pan-y" }}
          >
            <color attach="background" args={["#07090D"]} />
            <ambientLight intensity={0.48} />
            <directionalLight position={[3.5, 5.5, 4]} intensity={1.65} color="#42D7F5" />
            <directionalLight position={[-4.5, 2.5, -2.5]} intensity={0.9} color="#9B6CFF" />
            <pointLight position={[0, 3.5, -4]} intensity={0.32} color="#FFB547" />
            <gridHelper args={[9, 8, "#18334A", "#101722"]} position={[0, -1.24, 0]} />
            <SurfaceMesh
              asset={asset}
              autoRotate={!hasInteracted && !selectedModel}
              dragging={isDragging}
              hoveredModel={hoveredModel}
              onHover={setHover}
              onReturnComplete={() => {
                setHasInteracted(false);
                setIsReturning(false);
              }}
              onSelect={toggleModel}
              resetVersion={resetVersion}
              returning={isReturning}
              rotation={rotation}
              selectedModel={selectedModel}
            />
          </Canvas>
        ) : (
          <VolatilitySurfaceFallback asset={asset} />
        )}

        {hover && interactive && !isDragging ? (
          <div
            className="pointer-events-none absolute z-10 w-48 rounded-md border border-[#7E8B9D]/20 bg-[#080B11]/95 px-3 py-3 text-xs shadow-2xl"
            style={{
              left: `${hover.left}%`,
              top: `${hover.top}%`,
              transform: `translate(${hover.left > 58 ? "-100%" : "0"}, ${hover.top > 58 ? "-50%" : "0"})`,
            }}
            role="status"
          >
            <p className="font-semibold text-white">{hover.asset}</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[#7E8B9D]">
              <dt>Model</dt>
              <dd className="text-right text-[#DCE3EC]">{hover.model}</dd>
              <dt>Time</dt>
              <dd className="text-right text-[#DCE3EC]">T-{17 - hover.timeIndex}h</dd>
              <dt>Normalized</dt>
              <dd className="text-right font-mono text-[#DCE3EC]">{hover.value.toFixed(3)}</dd>
            </dl>
          </div>
        ) : null}
      </div>

      <div className="mt-4 border-y border-[#7E8B9D]/15 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs leading-5 text-[#8996A8]">
            {interactive
              ? "Drag to rotate · Select a ribbon to isolate · Reset view"
              : "Static accessibility view · Normalized illustrative surface"}
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Surface view controls">
            <button type="button" disabled={!interactive} onClick={() => nudgeYaw(-1)} className="min-h-10 border border-[#7E8B9D]/25 px-3 py-2 text-xs font-semibold text-[#DCE3EC] disabled:opacity-35">
              Rotate left
            </button>
            <button type="button" disabled={!interactive} onClick={() => nudgeYaw(1)} className="min-h-10 border border-[#7E8B9D]/25 px-3 py-2 text-xs font-semibold text-[#DCE3EC] disabled:opacity-35">
              Rotate right
            </button>
            <button type="button" disabled={!interactive} onClick={resetSurface} className="min-h-10 border border-[#42D7F5]/45 px-3 py-2 text-xs font-semibold text-[#DCE3EC] disabled:opacity-35">
              Reset view
            </button>
            {selectedModel ? (
              <button type="button" onClick={() => setSelectedModel(null)} className="min-h-10 border-b border-[#7E8B9D]/35 px-2 py-2 text-xs font-semibold text-[#8996A8] hover:text-white">
                Clear model selection
              </button>
            ) : null}
          </div>
        </div>
        <p className="mt-3 text-xs text-[#7E8B9D]" role="status" aria-live="polite">
          {interactionStatus}{selectedModel && isReturning ? ` · Selected model: ${selectedModel}` : ""}
        </p>
        {selectedModel && selectedRange ? (
          <p className="mt-2 text-xs leading-5 text-[#8996A8]">
            Selected ribbon summary: {selectedModel} spans normalized values {selectedRange.minimum} to {selectedRange.maximum} across {selectedRange.points} illustrative points.
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-4 text-xs text-[#7E8B9D] lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap gap-2" role={interactive ? "group" : undefined} aria-label="Model ribbon legend">
          {SHADOW_MODEL_NAMES.map((model) =>
            interactive ? (
              <button
                key={model}
                type="button"
                aria-pressed={selectedModel === model}
                onClick={() => toggleModel(model)}
                className={`inline-flex min-h-10 items-center gap-2 border px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D7F5] ${
                  selectedModel === model
                    ? "border-[#42D7F5]/65 bg-[#42D7F5]/[0.07] text-[#F4F7FB]"
                    : "border-[#7E8B9D]/18 text-[#8996A8] hover:text-[#DCE3EC]"
                }`}
              >
                <span aria-hidden="true" className="h-px w-5 shrink-0" style={{ backgroundColor: MODEL_COLORS[model] }} />
                <span>{model}</span>
                {selectedModel === model ? <span className="font-semibold text-[#67DFF7]">Selected</span> : null}
              </button>
            ) : (
              <span key={model} className="inline-flex min-h-10 items-center gap-2 border border-[#7E8B9D]/15 px-3 py-2">
                <span aria-hidden="true" className="h-px w-5" style={{ backgroundColor: MODEL_COLORS[model] }} />
                {model}
              </span>
            ),
          )}
        </div>
        <p className="max-w-lg font-mono leading-5">X: ILLUSTRATIVE TIME · Y: DISCRETE MODEL · Z: NORMALIZED ILLUSTRATIVE VARIANCE</p>
      </div>
    </div>
  );
}
