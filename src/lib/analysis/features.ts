import type {
  HistogramBin,
  NumericSummary,
  CategoricalSummary,
  CategoricalFrequency,
  SchemaAnalysis,
} from "./types";

/**
 * Inspects records and categorizes columns into state, sequence, numeric, binary, and categorical types.
 */
export function detectSchema(data: Record<string, unknown>[]): SchemaAnalysis {
  if (!data || data.length === 0) {
    return {
      stateColumn: null,
      sequenceColumn: null,
      numericFeatures: [],
      binaryLabels: [],
      categoricalFeatures: [],
    };
  }

  const sample = data.slice(0, Math.min(100, data.length));
  const allKeys = Object.keys(data[0]);

  let stateColumn: string | null = null;
  let sequenceColumn: string | null = null;

  const numericFeatures: string[] = [];
  const binaryLabels: string[] = [];
  const categoricalFeatures: string[] = [];

  // Excluded internal keys that shouldn't be analyzed as behavioral features
  const internalKeys = new Set(["sequence_id", "interaction_id", "id"]);

  for (const key of allKeys) {
    const lower = key.toLowerCase();

    if (lower === "state") {
      stateColumn = key;
      continue;
    }

    if (lower === "interaction_id" || lower === "step") {
      sequenceColumn = key;
      continue;
    }

    if (internalKeys.has(key)) {
      continue;
    }

    // Inspect values for this key across sample
    const nonNullValues = sample
      .map((r) => r[key])
      .filter((v) => v !== null && v !== undefined);

    if (nonNullValues.length === 0) {
      continue;
    }

    const allNumbers = nonNullValues.every(
      (v) => typeof v === "number" || (!isNaN(Number(v)) && typeof v !== "boolean")
    );

    if (allNumbers) {
      const numericVals = nonNullValues.map((v) => Number(v));
      const uniqueVals = new Set(numericVals);

      // Check if it represents a binary indicator / label (only {0, 1})
      const isBinary =
        uniqueVals.size <= 2 &&
        Array.from(uniqueVals).every((val) => val === 0 || val === 1);

      if (isBinary || lower.includes("alert") || lower.includes("clicked") || lower.includes("label")) {
        binaryLabels.push(key);
      } else {
        numericFeatures.push(key);
      }
    } else {
      categoricalFeatures.push(key);
    }
  }

  return {
    stateColumn,
    sequenceColumn,
    numericFeatures,
    binaryLabels,
    categoricalFeatures,
  };
}

/**
 * Calculates robust statistical summaries and histogram frequency bins for a numeric column.
 */
export function calculateNumericSummary(
  data: Record<string, unknown>[],
  field: string,
  numBins = 8
): NumericSummary | null {
  if (!data || data.length === 0) return null;

  const values: number[] = [];
  let missingCount = 0;

  for (const row of data) {
    const rawVal = row[field];
    if (rawVal === null || rawVal === undefined || rawVal === "") {
      missingCount++;
      continue;
    }
    const num = Number(rawVal);
    if (!Number.isFinite(num)) {
      missingCount++;
      continue;
    }
    values.push(num);
  }

  if (values.length === 0) return null;

  values.sort((a, b) => a - b);

  const validCount = values.length;
  const min = values[0];
  const max = values[validCount - 1];

  // Mean
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = sum / validCount;

  // Median
  const mid = Math.floor(validCount / 2);
  const median =
    validCount % 2 === 0
      ? (values[mid - 1] + values[mid]) / 2
      : values[mid];

  // Standard Deviation
  let variance = 0;
  if (validCount > 1) {
    const squaredDiffs = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
    variance = squaredDiffs / (validCount - 1);
  }
  const stdDev = Math.sqrt(variance);

  // Histogram Bins
  const bins: HistogramBin[] = [];

  if (min === max) {
    // Constant column edge case
    bins.push({
      binStart: min,
      binEnd: max,
      count: validCount,
      share: 100,
    });
  } else {
    const binWidth = (max - min) / numBins;
    for (let b = 0; b < numBins; b++) {
      const bStart = min + b * binWidth;
      const bEnd = b === numBins - 1 ? max : min + (b + 1) * binWidth;
      bins.push({
        binStart: bStart,
        binEnd: bEnd,
        count: 0,
        share: 0,
      });
    }

    for (const val of values) {
      let assigned = false;
      for (let b = 0; b < numBins; b++) {
        const isLastBin = b === numBins - 1;
        if (
          (val >= bins[b].binStart && val < bins[b].binEnd) ||
          (isLastBin && val >= bins[b].binStart && val <= bins[b].binEnd)
        ) {
          bins[b].count++;
          assigned = true;
          break;
        }
      }
      if (!assigned && bins.length > 0) {
        // Handle floating point precision edge boundary
        bins[bins.length - 1].count++;
      }
    }

    // Compute percentage shares
    for (const bin of bins) {
      bin.share = Math.round((bin.count / validCount) * 1000) / 10;
    }
  }

  return {
    field,
    count: data.length,
    validCount,
    missingCount,
    mean: Math.round(mean * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    min: Math.round(min * 1000) / 1000,
    max: Math.round(max * 1000) / 1000,
    stdDev: Math.round(stdDev * 1000) / 1000,
    bins,
  };
}

/**
 * Calculates category frequencies and percentage shares for discrete features or labels.
 */
export function calculateCategoricalSummary(
  data: Record<string, unknown>[],
  field: string
): CategoricalSummary | null {
  if (!data || data.length === 0) return null;

  const counts: Record<string, number> = {};
  let missingCount = 0;

  for (const row of data) {
    const rawVal = row[field];
    if (rawVal === null || rawVal === undefined || String(rawVal).trim() === "") {
      missingCount++;
      continue;
    }
    const cat = String(rawVal).trim();
    counts[cat] = (counts[cat] || 0) + 1;
  }

  const validCount = data.length - missingCount;
  if (validCount === 0) return null;

  const frequencies: CategoricalFrequency[] = Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      share: Math.round((count / validCount) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    field,
    total: data.length,
    validCount,
    missingCount,
    frequencies,
  };
}
