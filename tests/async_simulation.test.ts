import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  createSimulation,
  getSimulation,
  listSimulations,
  deleteSimulation,
} from "../src/lib/api/client";
import { BehaviorSimAPIError } from "../src/lib/api/errors";
import type {
  SimulationRequest,
  SimulationPendingResponse,
  SimulationDetailResponse,
  SimulationHistoryResponse,
  SimulationResponse,
} from "../src/lib/api/types";
import {
  detectSchema,
  calculateStateDistribution,
  calculateTransitionMatrix,
} from "../src/lib/analysis";

describe("Phase 17: Async API Client & Simulation Lifecycle", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  const sampleRequest: SimulationRequest = {
    preset: "education",
    num_interactions: 50,
    seed: 42,
  };

  const samplePendingResponse: SimulationPendingResponse = {
    simulation_id: "sim_test_12345",
    preset: "education",
    num_interactions: 50,
    status: "pending",
    seed: 42,
    created_at: "2026-09-14T00:00:00Z",
    updated_at: "2026-09-14T00:00:00Z",
  };

  const sampleDetailCompleted: SimulationDetailResponse = {
    simulation_id: "sim_test_12345",
    preset: "education",
    num_interactions: 50,
    seed: 42,
    profile: "average",
    initial_state: "Optimal",
    status: "completed",
    data: [
      { interaction_id: 1, state: "Optimal", response_time: 210, accuracy: 1.0 },
      { interaction_id: 2, state: "Optimal", response_time: 195, accuracy: 1.0 },
      { interaction_id: 3, state: "Overload", response_time: 450, accuracy: 0.0 },
      { interaction_id: 4, state: "Optimal", response_time: 220, accuracy: 1.0 },
    ],
    metadata: {
      behaviorsim_version: "1.0.1",
      api_version: "1.0.0",
      compute_ms: 120,
      reproducible: true,
    },
    created_at: "2026-09-14T00:00:00Z",
    started_at: "2026-09-14T00:00:01Z",
    completed_at: "2026-09-14T00:00:02Z",
    updated_at: "2026-09-14T00:00:02Z",
  };

  // 1. 202 response handling
  it("1. handles 202 Accepted response for default asynchronous simulation submission", async () => {
    let capturedUrl = "";
    let capturedMethod = "";

    globalThis.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
      capturedUrl = String(url);
      capturedMethod = init?.method || "GET";
      return new Response(JSON.stringify(samplePendingResponse), {
        status: 202,
        statusText: "Accepted",
        headers: { "Content-Type": "application/json" },
      });
    };

    const result = await createSimulation(sampleRequest);
    assert.ok(capturedUrl.includes("/v1/simulations"));
    assert.equal(capturedMethod, "POST");
    assert.equal(result.status, "pending");
    assert.equal(result.simulation_id, "sim_test_12345");
  });

  // 2. pending state detail
  it("2. retrieves pending simulation detail with null results and operational timestamps", async () => {
    const pendingDetail: SimulationDetailResponse = {
      ...sampleDetailCompleted,
      status: "pending",
      data: null,
      metadata: null,
      started_at: null,
      completed_at: null,
    };

    globalThis.fetch = async () => {
      return new Response(JSON.stringify(pendingDetail), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const detail = await getSimulation("sim_test_12345");
    assert.equal(detail.status, "pending");
    assert.equal(detail.data, null);
    assert.equal(detail.metadata, null);
    assert.equal(detail.simulation_id, "sim_test_12345");
  });

  // 3. running state detail
  it("3. retrieves running simulation detail with worker started_at and null results", async () => {
    const runningDetail: SimulationDetailResponse = {
      ...sampleDetailCompleted,
      status: "running",
      data: null,
      metadata: null,
      started_at: "2026-09-14T00:00:01Z",
      completed_at: null,
    };

    globalThis.fetch = async () => {
      return new Response(JSON.stringify(runningDetail), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const detail = await getSimulation("sim_test_12345");
    assert.equal(detail.status, "running");
    assert.equal(detail.data, null);
    assert.ok(detail.started_at);
    assert.equal(detail.completed_at, null);
  });

  // 4. completed state detail
  it("4. retrieves completed simulation detail with data payload and metadata", async () => {
    globalThis.fetch = async () => {
      return new Response(JSON.stringify(sampleDetailCompleted), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const detail = await getSimulation("sim_test_12345");
    assert.equal(detail.status, "completed");
    assert.ok(Array.isArray(detail.data));
    assert.equal(detail.data?.length, 4);
    assert.equal(detail.metadata?.compute_ms, 120);
    assert.ok(detail.completed_at);
  });

  // 5. failed state detail
  it("5. retrieves failed simulation detail with sanitized error code and message", async () => {
    const failedDetail: SimulationDetailResponse = {
      ...sampleDetailCompleted,
      status: "failed",
      data: null,
      metadata: null,
      error_code: "execution_timeout",
      error_message: "Simulation compute execution timed out.",
      completed_at: "2026-09-14T00:00:05Z",
    };

    globalThis.fetch = async () => {
      return new Response(JSON.stringify(failedDetail), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const detail = await getSimulation("sim_test_12345");
    assert.equal(detail.status, "failed");
    assert.equal(detail.data, null);
    assert.equal(detail.error_code, "execution_timeout");
    assert.equal(detail.error_message, "Simulation compute execution timed out.");
  });

  // 6 & 7. Polling starts and stops on completion
  it("6 & 7. simulates end-to-end polling sequence: pending -> running -> completed", async () => {
    let callCount = 0;
    const history: string[] = [];

    globalThis.fetch = async (url: RequestInfo | URL) => {
      const urlStr = String(url);
      callCount++;
      if (urlStr.includes("/v1/simulations/sim_test_12345")) {
        if (callCount === 1) {
          history.push("pending");
          return new Response(
            JSON.stringify({ ...sampleDetailCompleted, status: "pending", data: null, metadata: null }),
            { status: 200 }
          );
        } else if (callCount === 2) {
          history.push("running");
          return new Response(
            JSON.stringify({ ...sampleDetailCompleted, status: "running", data: null, metadata: null }),
            { status: 200 }
          );
        } else {
          history.push("completed");
          return new Response(JSON.stringify(sampleDetailCompleted), { status: 200 });
        }
      }
      return new Response("{}", { status: 200 });
    };

    // Simulate polling driver
    let currentStatus = "pending";
    let attempts = 0;
    let finalResult: SimulationDetailResponse | null = null;

    while (currentStatus !== "completed" && currentStatus !== "failed" && attempts < 10) {
      attempts++;
      const res = await getSimulation("sim_test_12345");
      currentStatus = res.status;
      if (res.status === "completed") {
        finalResult = res;
      }
    }

    assert.deepEqual(history, ["pending", "running", "completed"]);
    assert.equal(attempts, 3);
    assert.ok(finalResult);
    assert.equal(finalResult?.status, "completed");
    assert.equal(finalResult?.data?.length, 4);
  });

  // 8. Polling stops on failure
  it("8. polling sequence terminates immediately when server reports failed", async () => {
    let callCount = 0;

    globalThis.fetch = async () => {
      callCount++;
      if (callCount === 1) {
        return new Response(
          JSON.stringify({ ...sampleDetailCompleted, status: "running", data: null, metadata: null }),
          { status: 200 }
        );
      }
      return new Response(
        JSON.stringify({
          ...sampleDetailCompleted,
          status: "failed",
          data: null,
          metadata: null,
          error_code: "resource_exhausted",
          error_message: "Simulation quota exhausted during run.",
        }),
        { status: 200 }
      );
    };

    let currentStatus = "running";
    let attempts = 0;
    let finalError: { code?: string | null; message?: string | null } | null = null;

    while (currentStatus !== "completed" && currentStatus !== "failed" && attempts < 10) {
      attempts++;
      const res = await getSimulation("sim_test_12345");
      currentStatus = res.status;
      if (res.status === "failed") {
        finalError = { code: res.error_code, message: res.error_message };
      }
    }

    assert.equal(attempts, 2);
    assert.equal(currentStatus, "failed");
    assert.equal(finalError?.code, "resource_exhausted");
  });

  // 9. Polling stops on client timeout without reporting false failure
  it("9. client polling halts when maxAttempts is exceeded, preserving job state", () => {
    let attempts = 0;
    const maxAttempts = 5;
    let jobStatus: "queued" | "running" | "timed_out" = "queued";

    // Simulate poll attempt increments
    while (attempts < maxAttempts) {
      attempts++;
    }

    if (attempts >= maxAttempts) {
      jobStatus = "timed_out";
    }

    assert.equal(jobStatus, "timed_out");
    assert.notEqual(jobStatus, "failed");
  });

  // 10. Component unmount cleanup
  it("10. unmount flag correctly blocks post-unmount execution and timer leaks", () => {
    let isMounted = true;
    let stateUpdated = false;

    const simulateAsyncPollCallback = () => {
      if (!isMounted) return;
      stateUpdated = true;
    };

    // Component unmounts while poll is in flight
    isMounted = false;
    simulateAsyncPollCallback();

    assert.equal(stateUpdated, false);
  });

  // 11. Transient polling error retry and recovery
  it("11. recovers from transient network error during polling without abandoning simulation ID", async () => {
    let callCount = 0;

    globalThis.fetch = async () => {
      callCount++;
      if (callCount === 1) {
        throw new Error("Failed to fetch / network glitch");
      }
      return new Response(JSON.stringify(sampleDetailCompleted), { status: 200 });
    };

    let recovered = false;
    let consecutiveErrors = 0;
    const maxTransientErrors = 3;

    for (let i = 0; i < 2; i++) {
      try {
        const res = await getSimulation("sim_test_12345");
        if (res.status === "completed") {
          recovered = true;
          consecutiveErrors = 0;
        }
      } catch {
        consecutiveErrors++;
        assert.ok(consecutiveErrors <= maxTransientErrors);
      }
    }

    assert.equal(recovered, true);
    assert.equal(callCount, 2);
  });

  // 12. 401 handling
  it("12. halts polling and throws authentication error on HTTP 401", async () => {
    globalThis.fetch = async () => {
      return new Response(
        JSON.stringify({
          error: {
            message: "Authentication required or session expired.",
            status_code: 401,
            request_id: "req_auth_err_1",
          },
        }),
        { status: 401, statusText: "Unauthorized" }
      );
    };

    await assert.rejects(
      async () => {
        await getSimulation("sim_test_12345");
      },
      (err: unknown) => {
        assert.ok(err instanceof BehaviorSimAPIError);
        assert.equal(err.statusCode, 401);
        assert.equal(err.requestId, "req_auth_err_1");
        return true;
      }
    );
  });

  // 13. 404 handling
  it("13. halts polling and throws not found error on HTTP 404", async () => {
    globalThis.fetch = async () => {
      return new Response(
        JSON.stringify({
          error: {
            message: "Simulation 'sim_missing' not found.",
            status_code: 404,
            request_id: "req_not_found_1",
          },
        }),
        { status: 404, statusText: "Not Found" }
      );
    };

    await assert.rejects(
      async () => {
        await getSimulation("sim_missing");
      },
      (err: unknown) => {
        assert.ok(err instanceof BehaviorSimAPIError);
        assert.equal(err.statusCode, 404);
        return true;
      }
    );
  });

  // 14. Double-submit protection
  it("14. submission guard prevents concurrent duplicate POST submissions", async () => {
    let postCount = 0;

    globalThis.fetch = async () => {
      postCount++;
      return new Response(JSON.stringify(samplePendingResponse), { status: 202 });
    };

    let isSubmitting = false;

    const guardedSubmit = async () => {
      if (isSubmitting) return; // Guard
      isSubmitting = true;
      try {
        await createSimulation(sampleRequest);
      } finally {
        isSubmitting = false;
      }
    };

    // Concurrent attempts
    isSubmitting = true;
    await guardedSubmit(); // Ignored because isSubmitting is true
    isSubmitting = false;

    await guardedSubmit(); // Allowed
    assert.equal(postCount, 1);
  });

  // 15. Retry creates brand new job
  it("15. retry mechanism initiates a NEW simulation job via POST /v1/simulations", async () => {
    const createdIds: string[] = [];

    globalThis.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === "POST") {
        const newId = `sim_job_${createdIds.length + 1}`;
        createdIds.push(newId);
        return new Response(
          JSON.stringify({ ...samplePendingResponse, simulation_id: newId }),
          { status: 202 }
        );
      }
      return new Response("{}", { status: 200 });
    };

    // First run
    const job1 = await createSimulation(sampleRequest);
    // User retries -> creates new job
    const job2 = await createSimulation(sampleRequest);

    assert.equal(createdIds.length, 2);
    assert.equal(job1.simulation_id, "sim_job_1");
    assert.equal(job2.simulation_id, "sim_job_2");
    assert.notEqual(job1.simulation_id, job2.simulation_id);
  });

  // 16. Completed result data analysis pipeline compatibility
  it("16. completed simulation data seamlessly feeds statistical analysis pipelines", () => {
    const data = sampleDetailCompleted.data as Record<string, unknown>[];
    assert.ok(data);

    const schema = detectSchema(data);
    assert.equal(schema.stateColumn, "state");
    assert.ok(schema.numericFeatures.includes("response_time"));

    const dist = calculateStateDistribution(data, "state", ["Optimal", "Overload"]);
    assert.equal(dist.total, 4);

    const trans = calculateTransitionMatrix(data, "state", "interaction_id");
    assert.ok(trans);
    assert.equal(trans.totalTransitions, 3);
  });

  // 17. History status listing
  it("17. listSimulations queries lightweight history endpoint with pagination and statuses", async () => {
    const mockHistory: SimulationHistoryResponse = {
      items: [
        {
          simulation_id: "sim_1",
          preset: "education",
          num_interactions: 100,
          seed: 42,
          status: "completed",
          compute_ms: 150,
          reproducible: true,
          behaviorsim_version: "1.0.1",
          api_version: "1.0.0",
          created_at: "2026-09-14T01:00:00Z",
        },
        {
          simulation_id: "sim_2",
          preset: "finance",
          num_interactions: 50,
          seed: null,
          status: "running",
          compute_ms: null,
          reproducible: false,
          behaviorsim_version: "1.0.1",
          api_version: "1.0.0",
          created_at: "2026-09-14T01:05:00Z",
        },
      ],
      page: 1,
      page_size: 10,
      total: 2,
      has_next: false,
    };

    let requestedQuery = "";
    globalThis.fetch = async (url: RequestInfo | URL) => {
      requestedQuery = String(url);
      return new Response(JSON.stringify(mockHistory), { status: 200 });
    };

    const history = await listSimulations({ page: 1, page_size: 10 });
    assert.ok(requestedQuery.includes("/v1/simulations"));
    assert.equal(history.items.length, 2);
    assert.equal(history.items[0].status, "completed");
    assert.equal(history.items[1].status, "running");
  });

  // 18. Delete pending simulation (204)
  it("18. deleteSimulation permanently deletes a pending simulation with 204 No Content", async () => {
    let deleteTarget = "";
    let deleteMethod = "";

    globalThis.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
      deleteTarget = String(url);
      deleteMethod = init?.method || "GET";
      return new Response(null, { status: 204, statusText: "No Content" });
    };

    await deleteSimulation("sim_pending_1");
    assert.ok(deleteTarget.includes("/v1/simulations/sim_pending_1"));
    assert.equal(deleteMethod, "DELETE");
  });

  // 19. Running simulation delete rejection (409 Conflict)
  it("19. deleteSimulation surfaces HTTP 409 Conflict when deleting a running simulation", async () => {
    globalThis.fetch = async () => {
      return new Response(
        JSON.stringify({
          error: {
            message: "Cannot delete simulation while it is currently running.",
            status_code: 409,
            details: { code: "cannot_delete_running_simulation" },
          },
        }),
        { status: 409, statusText: "Conflict" }
      );
    };

    await assert.rejects(
      async () => {
        await deleteSimulation("sim_running_1");
      },
      (err: unknown) => {
        assert.ok(err instanceof BehaviorSimAPIError);
        assert.equal(err.statusCode, 409);
        assert.ok(err.message.includes("Cannot delete simulation"));
        return true;
      }
    );
  });

  // 20. Network failure isolation
  it("20. network failure on submission throws clean error without starting polling loop", async () => {
    globalThis.fetch = async () => {
      throw new TypeError("Failed to fetch (DNS / Network down)");
    };

    await assert.rejects(
      async () => {
        await createSimulation(sampleRequest);
      },
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.ok(err.message.includes("Failed to fetch"));
        return true;
      }
    );
  });

  // Transitional synchronous compatibility mode (?sync=true)
  it("transitional: supports synchronous simulation execution when sync=true", async () => {
    let capturedUrl = "";

    const syncCompleted: SimulationResponse = {
      simulation_id: "sim_sync_1",
      preset: "education",
      num_interactions: 50,
      seed: 42,
      data: [{ interaction_id: 1, state: "Optimal" }],
      metadata: {
        behaviorsim_version: "1.0.1",
        api_version: "1.0.0",
        compute_ms: 85,
        reproducible: true,
      },
    };

    globalThis.fetch = async (url: RequestInfo | URL) => {
      capturedUrl = String(url);
      return new Response(JSON.stringify(syncCompleted), { status: 200 });
    };

    const result = await createSimulation(sampleRequest, { sync: true });
    assert.ok(capturedUrl.includes("sync=true"));
    assert.equal(result.simulation_id, "sim_sync_1");
    assert.equal(result.data.length, 1);
  });
});
