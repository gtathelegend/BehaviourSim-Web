import type { TransitionMatrixResult } from "./types";

/**
 * Calculates first-order Markov state transition counts and row-conditional transition probabilities.
 *
 * @param data Array of synthetic interaction records
 * @param stateColumn Key representing the behavioral state (default: 'state')
 * @param sequenceColumn Key used for sorting rows if not pre-sorted (default: 'interaction_id')
 * @param knownStates Optional known states list to ensure all states appear in matrix
 */
export function calculateTransitionMatrix(
  data: Record<string, unknown>[],
  stateColumn = "state",
  sequenceColumn = "interaction_id",
  knownStates?: string[]
): TransitionMatrixResult | null {
  if (!data || data.length < 2) {
    return null;
  }

  // Sort rows if sequenceColumn is present
  const sorted = [...data];
  if (sequenceColumn && sequenceColumn in sorted[0]) {
    sorted.sort((a, b) => {
      const aVal = Number(a[sequenceColumn]);
      const bVal = Number(b[sequenceColumn]);
      if (!isNaN(aVal) && !isNaN(bVal)) {
        return aVal - bVal;
      }
      return 0;
    });
  }

  // Extract all unique valid states encountered
  const stateSet = new Set<string>();
  if (knownStates && knownStates.length > 0) {
    knownStates.forEach((s) => stateSet.add(s));
  }

  for (const row of sorted) {
    const val = row[stateColumn];
    if (val !== null && val !== undefined && String(val).trim() !== "") {
      stateSet.add(String(val).trim());
    }
  }

  const states = Array.from(stateSet).sort();
  if (states.length === 0) return null;

  const stateIndexMap = new Map<string, number>();
  states.forEach((s, idx) => stateIndexMap.set(s, idx));

  // Initialize matrix of zeros (states.length x states.length)
  const n = states.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  let totalTransitions = 0;

  // Single-pass consecutive transitions
  for (let i = 0; i < sorted.length - 1; i++) {
    const currVal = sorted[i][stateColumn];
    const nextVal = sorted[i + 1][stateColumn];

    if (
      currVal === null ||
      currVal === undefined ||
      nextVal === null ||
      nextVal === undefined
    ) {
      continue;
    }

    const fromState = String(currVal).trim();
    const toState = String(nextVal).trim();

    const fromIdx = stateIndexMap.get(fromState);
    const toIdx = stateIndexMap.get(toState);

    if (fromIdx !== undefined && toIdx !== undefined) {
      matrix[fromIdx][toIdx] += 1;
      totalTransitions += 1;
    }
  }

  // Compute row-normalized transition probabilities: P(to | from)
  const probabilities: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let r = 0; r < n; r++) {
    const rowSum = matrix[r].reduce((acc, count) => acc + count, 0);
    for (let c = 0; c < n; c++) {
      probabilities[r][c] = rowSum > 0 ? matrix[r][c] / rowSum : 0;
    }
  }

  return {
    states,
    matrix,
    probabilities,
    totalTransitions,
  };
}
