/**
 * Strongly typed definitions for synthetic behavioral data analysis.
 */

export interface StateFrequency {
  state: string;
  count: number;
  share: number; // 0 to 100 percentage
}

export interface StateDistributionResult {
  total: number;
  validTotal: number;
  missingCount: number;
  states: StateFrequency[];
}

export interface TransitionMatrixResult {
  states: string[];
  matrix: number[][]; // matrix[fromIdx][toIdx] = count
  probabilities: number[][]; // probabilities[fromIdx][toIdx] = 0.0 to 1.0
  totalTransitions: number;
}

export interface HistogramBin {
  binStart: number;
  binEnd: number;
  count: number;
  share: number; // 0 to 100
}

export interface NumericSummary {
  field: string;
  count: number;
  validCount: number;
  missingCount: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  stdDev: number;
  bins: HistogramBin[];
}

export interface CategoricalFrequency {
  category: string;
  count: number;
  share: number; // 0 to 100
}

export interface CategoricalSummary {
  field: string;
  total: number;
  validCount: number;
  missingCount: number;
  frequencies: CategoricalFrequency[];
}

export interface SchemaAnalysis {
  stateColumn: string | null;
  sequenceColumn: string | null;
  numericFeatures: string[];
  binaryLabels: string[];
  categoricalFeatures: string[];
}
