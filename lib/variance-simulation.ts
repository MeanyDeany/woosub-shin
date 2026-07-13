import { mulberry32, normalSample } from "@/lib/seeded-random";

export type VarianceScenarioData = {
  paths: number[][];
  percentiles: {
    q05: number[];
    q25: number[];
    q50: number[];
    q75: number[];
    q95: number[];
  };
};

const PATH_COUNT = 250;
const STEP_COUNT = 48;
const FIXED_SEED = 20260713;

function quantile(sorted: readonly number[], probability: number) {
  const position = (sorted.length - 1) * probability;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const weight = position - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export function generateVarianceScenarios(): VarianceScenarioData {
  const random = mulberry32(FIXED_SEED);
  const initialLogVariance = Math.log(0.52);
  const longRunMean = Math.log(0.48);
  const persistence = 0.91;
  const innovationScale = 0.16;
  const paths = Array.from({ length: PATH_COUNT }, () => {
    const path = [Math.exp(initialLogVariance)];
    let current = initialLogVariance;

    for (let step = 1; step <= STEP_COUNT; step += 1) {
      current =
        longRunMean +
        persistence * (current - longRunMean) +
        innovationScale * normalSample(random);
      path.push(Math.exp(current));
    }

    return path;
  });

  const percentiles = {
    q05: [] as number[],
    q25: [] as number[],
    q50: [] as number[],
    q75: [] as number[],
    q95: [] as number[],
  };

  for (let step = 0; step <= STEP_COUNT; step += 1) {
    const values = paths.map((path) => path[step]).sort((a, b) => a - b);
    percentiles.q05.push(quantile(values, 0.05));
    percentiles.q25.push(quantile(values, 0.25));
    percentiles.q50.push(quantile(values, 0.5));
    percentiles.q75.push(quantile(values, 0.75));
    percentiles.q95.push(quantile(values, 0.95));
  }

  return { paths, percentiles };
}
