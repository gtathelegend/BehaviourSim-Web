import type { StateDistributionResult, StateFrequency } from "./types";

/**
 * Computes observed state distribution and percentage shares from synthetic telemetry records.
 *
 * @param data Array of synthetic interaction records
 * @param stateColumn Column name representing behavioral state (default: 'state')
 * @param configuredStates Optional array of known states from preset definition
 */
export function calculateStateDistribution(
  data: Record<string, unknown>[],
  stateColumn = "state",
  configuredStates: string[] = []
): StateDistributionResult {
  if (!data || data.length === 0) {
    return {
      total: 0,
      validTotal: 0,
      missingCount: 0,
      states: configuredStates.map((s) => ({ state: s, count: 0, share: 0 })),
    };
  }

  const counts: Record<string, number> = {};
  let missingCount = 0;

  // Initialize configured states with 0 count
  for (const cs of configuredStates) {
    if (cs) counts[cs] = 0;
  }

  for (const row of data) {
    const rawVal = row[stateColumn];
    if (rawVal === null || rawVal === undefined || String(rawVal).trim() === "") {
      missingCount++;
      continue;
    }
    const stateStr = String(rawVal).trim();
    counts[stateStr] = (counts[stateStr] || 0) + 1;
  }

  const validTotal = data.length - missingCount;

  // Convert to sorted list of frequencies (highest count first)
  const states: StateFrequency[] = Object.entries(counts)
    .map(([state, count]) => {
      const share = validTotal > 0 ? (count / validTotal) * 100 : 0;
      return {
        state,
        count,
        share: Math.round(share * 10) / 10, // Round to 1 decimal
      };
    })
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.state.localeCompare(b.state);
    });

  return {
    total: data.length,
    validTotal,
    missingCount,
    states,
  };
}
