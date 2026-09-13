import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateStateDistribution,
  calculateTransitionMatrix,
  calculateNumericSummary,
  calculateCategoricalSummary,
  detectSchema,
} from "../src/lib/analysis";

describe("State Distribution Analysis", () => {
  it("computes counts and exact percentage shares accurately", () => {
    const data = [
      { state: "Optimal" },
      { state: "Optimal" },
      { state: "Suboptimal" },
      { state: "At Risk" },
    ];
    const result = calculateStateDistribution(data, "state", ["Optimal", "Suboptimal", "At Risk", "Underload"]);

    assert.equal(result.total, 4);
    assert.equal(result.validTotal, 4);
    assert.equal(result.missingCount, 0);

    const optimal = result.states.find((s) => s.state === "Optimal");
    assert.ok(optimal);
    assert.equal(optimal.count, 2);
    assert.equal(optimal.share, 50.0);

    // Unobserved configured state should have count 0
    const underload = result.states.find((s) => s.state === "Underload");
    assert.ok(underload);
    assert.equal(underload.count, 0);
    assert.equal(underload.share, 0);
  });

  it("handles empty and missing state values gracefully", () => {
    const data = [
      { state: "Optimal" },
      { state: null },
      { state: "" },
      { other_col: 1 },
    ];
    const result = calculateStateDistribution(data, "state");
    assert.equal(result.total, 4);
    assert.equal(result.validTotal, 1);
    assert.equal(result.missingCount, 3);
    assert.equal(result.states[0].state, "Optimal");
    assert.equal(result.states[0].share, 100);

    const emptyResult = calculateStateDistribution([]);
    assert.equal(emptyResult.total, 0);
    assert.equal(emptyResult.states.length, 0);
  });
});

describe("Transition Matrix Analysis", () => {
  it("computes valid Markov transition counts and probabilities", () => {
    const data = [
      { interaction_id: 1, state: "A" },
      { interaction_id: 2, state: "B" },
      { interaction_id: 3, state: "A" },
      { interaction_id: 4, state: "A" },
    ];
    // Transitions: A->B, B->A, A->A
    const result = calculateTransitionMatrix(data, "state", "interaction_id");
    assert.ok(result);
    assert.equal(result.totalTransitions, 3);
    assert.deepEqual(result.states, ["A", "B"]);

    const idxA = result.states.indexOf("A");
    const idxB = result.states.indexOf("B");

    // A transitions: 1 to A, 1 to B -> total 2. P(A|A)=0.5, P(B|A)=0.5
    assert.equal(result.matrix[idxA][idxA], 1);
    assert.equal(result.matrix[idxA][idxB], 1);
    assert.equal(result.probabilities[idxA][idxA], 0.5);
    assert.equal(result.probabilities[idxA][idxB], 0.5);

    // B transitions: 1 to A, 0 to B -> total 1. P(A|B)=1.0, P(B|B)=0.0
    assert.equal(result.matrix[idxB][idxA], 1);
    assert.equal(result.matrix[idxB][idxB], 0);
    assert.equal(result.probabilities[idxB][idxA], 1.0);
    assert.equal(result.probabilities[idxB][idxB], 0.0);
  });

  it("returns null for insufficient data or single row", () => {
    assert.equal(calculateTransitionMatrix([]), null);
    assert.equal(calculateTransitionMatrix([{ state: "A" }]), null);
  });
});

describe("Numeric Feature Analysis", () => {
  it("computes mean, median, min, max, and stdDev correctly", () => {
    const data = [
      { latency: 10 },
      { latency: 20 },
      { latency: 30 },
      { latency: 40 },
      { latency: 50 },
    ];
    const summary = calculateNumericSummary(data, "latency", 4);
    assert.ok(summary);
    assert.equal(summary.validCount, 5);
    assert.equal(summary.min, 10);
    assert.equal(summary.max, 50);
    assert.equal(summary.mean, 30);
    assert.equal(summary.median, 30);
    assert.ok(summary.stdDev > 15.8 && summary.stdDev < 15.9);
    assert.equal(summary.bins.length, 4);
  });

  it("handles constant columns, nulls, and non-finite values safely", () => {
    const data = [
      { score: 5 },
      { score: 5 },
      { score: null },
      { score: "invalid" },
      { score: NaN },
    ];
    const summary = calculateNumericSummary(data, "score");
    assert.ok(summary);
    assert.equal(summary.validCount, 2);
    assert.equal(summary.missingCount, 3);
    assert.equal(summary.min, 5);
    assert.equal(summary.max, 5);
    assert.equal(summary.mean, 5);
    assert.equal(summary.stdDev, 0);
    assert.equal(summary.bins.length, 1);
    assert.equal(summary.bins[0].share, 100);
  });
});

describe("Categorical and Schema Analysis", () => {
  it("detects schema columns properly across typical preset records", () => {
    const data = [
      {
        sequence_id: 1,
        interaction_id: 1,
        state: "Optimal",
        profile: "average",
        nrt: 1.25,
        accuracy: 1,
      },
    ];
    const schema = detectSchema(data);
    assert.equal(schema.stateColumn, "state");
    assert.equal(schema.sequenceColumn, "interaction_id");
    assert.ok(schema.numericFeatures.includes("nrt"));
    assert.ok(schema.binaryLabels.includes("accuracy"));
    assert.ok(schema.categoricalFeatures.includes("profile"));
  });

  it("calculates categorical frequencies properly", () => {
    const data = [
      { profile: "average" },
      { profile: "average" },
      { profile: "fast_accurate" },
      { profile: null },
    ];
    const summary = calculateCategoricalSummary(data, "profile");
    assert.ok(summary);
    assert.equal(summary.validCount, 3);
    assert.equal(summary.missingCount, 1);
    assert.equal(summary.frequencies[0].category, "average");
    assert.equal(summary.frequencies[0].count, 2);
    assert.equal(summary.frequencies[0].share, 66.7);
  });
});
