"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createSimulation, getSimulation } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type {
  SimulationRequest,
  SimulationPendingResponse,
  SimulationDetailResponse,
} from "@/lib/api/types";

export type JobStatus =
  | "idle"
  | "submitting"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "timed_out";

export interface JobError {
  message: string;
  statusCode?: number;
  errorCode?: string | null;
  requestId?: string | null;
  simulationId?: string | null;
  isNetworkError?: boolean;
  isAuthError?: boolean;
}

export interface UseSimulationJobOptions {
  initialPollIntervalMs?: number;
  maxPollIntervalMs?: number;
  backoffStepMs?: number;
  maxAttempts?: number;
  maxTransientErrors?: number;
  onCompleted?: (detail: SimulationDetailResponse) => void;
  onFailed?: (error: JobError) => void;
}

export function useSimulationJob(options: UseSimulationJobOptions = {}) {
  const {
    initialPollIntervalMs = 1000,
    maxPollIntervalMs = 2000,
    backoffStepMs = 500,
    maxAttempts = 45, // ~60-70 seconds client timeout
    maxTransientErrors = 3,
    onCompleted,
    onFailed,
  } = options;

  const [jobStatus, setJobStatus] = useState<JobStatus>("idle");
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [detail, setDetail] = useState<SimulationDetailResponse | null>(null);
  const [error, setError] = useState<JobError | null>(null);
  const [lastRequest, setLastRequest] = useState<SimulationRequest | null>(null);

  // References to prevent stale closures, double polling, and unmount updates
  const isMountedRef = useRef(true);
  const activeJobIdRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptCountRef = useRef(0);
  const consecutiveErrorsRef = useRef(0);
  const currentIntervalRef = useRef(initialPollIntervalMs);
  const lastRequestRef = useRef<SimulationRequest | null>(null);

  // Clear any scheduled polling timeout safely
  const clearPollTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Poll loop implementation
  const pollJob = useCallback(
    async (targetJobId: string) => {
      // Guard: unmounted or a newer job was started
      if (!isMountedRef.current || activeJobIdRef.current !== targetJobId) {
        return;
      }

      attemptCountRef.current += 1;

      // Check client-side polling timeout
      if (attemptCountRef.current > maxAttempts) {
        if (isMountedRef.current) {
          setJobStatus("timed_out");
          clearPollTimer();
        }
        return;
      }

      try {
        const response = await getSimulation(targetJobId);

        // Ensure we haven't unmounted or switched jobs during the fetch
        if (!isMountedRef.current || activeJobIdRef.current !== targetJobId) {
          return;
        }

        consecutiveErrorsRef.current = 0; // reset error counter on successful response

        if (response.status === "completed") {
          setJobStatus("completed");
          setDetail(response);
          clearPollTimer();
          onCompleted?.(response);
          return;
        }

        if (response.status === "failed") {
          setJobStatus("failed");
          const safeError: JobError = {
            message: response.error_message || "Simulation execution failed on the server.",
            errorCode: response.error_code || null,
            simulationId: targetJobId,
          };
          setError(safeError);
          clearPollTimer();
          onFailed?.(safeError);
          return;
        }

        if (response.status === "running") {
          setJobStatus("running");
        } else if (response.status === "pending") {
          setJobStatus("queued");
        }

        // Apply modest backoff up to maxPollIntervalMs
        currentIntervalRef.current = Math.min(
          currentIntervalRef.current + backoffStepMs,
          maxPollIntervalMs
        );

        // Schedule next poll
        timerRef.current = setTimeout(() => {
          pollJob(targetJobId);
        }, currentIntervalRef.current);
      } catch (err: unknown) {
        if (!isMountedRef.current || activeJobIdRef.current !== targetJobId) {
          return;
        }

        if (err instanceof BehaviorSimAPIError) {
          // Terminal auth or authorization failures
          if (err.statusCode === 401 || err.statusCode === 403) {
            setJobStatus("failed");
            const authError: JobError = {
              message: err.message,
              statusCode: err.statusCode,
              requestId: err.requestId,
              simulationId: targetJobId,
              isAuthError: true,
            };
            setError(authError);
            clearPollTimer();
            onFailed?.(authError);
            return;
          }

          // Simulation record deleted or not found
          if (err.statusCode === 404) {
            setJobStatus("failed");
            const notFoundError: JobError = {
              message: "Simulation run not found or no longer exists.",
              statusCode: 404,
              requestId: err.requestId,
              simulationId: targetJobId,
            };
            setError(notFoundError);
            clearPollTimer();
            onFailed?.(notFoundError);
            return;
          }
        }

        // Transient network or server error during poll
        consecutiveErrorsRef.current += 1;
        if (consecutiveErrorsRef.current > maxTransientErrors) {
          // Pause polling on repeated network failure, preserve simulation ID
          setJobStatus("timed_out");
          const netError: JobError = {
            message:
              "Unable to reach the server to check simulation status. The job is still active and can be checked again.",
            simulationId: targetJobId,
            isNetworkError: true,
          };
          setError(netError);
          clearPollTimer();
          return;
        }

        // Backoff and retry transient failure
        currentIntervalRef.current = maxPollIntervalMs;
        timerRef.current = setTimeout(() => {
          pollJob(targetJobId);
        }, currentIntervalRef.current);
      }
    },
    [
      backoffStepMs,
      clearPollTimer,
      maxAttempts,
      maxPollIntervalMs,
      maxTransientErrors,
      onCompleted,
      onFailed,
    ]
  );

  // Submit a new simulation run (POST -> 202 -> begin polling)
  const submitJob = useCallback(
    async (request: SimulationRequest) => {
      // Guard against double submission while already processing
      if (jobStatus === "submitting" || jobStatus === "queued" || jobStatus === "running") {
        return;
      }

      clearPollTimer();
      setJobStatus("submitting");
      setError(null);
      setDetail(null);
      setLastRequest(request);
      lastRequestRef.current = request;
      attemptCountRef.current = 0;
      consecutiveErrorsRef.current = 0;
      currentIntervalRef.current = initialPollIntervalMs;

      try {
        const pendingResponse: SimulationPendingResponse = await createSimulation(request);

        if (!isMountedRef.current) return;

        const newId = pendingResponse.simulation_id;
        setSimulationId(newId);
        activeJobIdRef.current = newId;
        setJobStatus("queued");

        // Kick off controlled polling
        timerRef.current = setTimeout(() => {
          pollJob(newId);
        }, initialPollIntervalMs);
      } catch (err: unknown) {
        if (!isMountedRef.current) return;

        setJobStatus("failed");
        let submitError: JobError;
        if (err instanceof BehaviorSimAPIError) {
          submitError = {
            message: err.message,
            statusCode: err.statusCode,
            requestId: err.requestId,
            errorCode: (err.details as Record<string, unknown>)?.code as string | undefined,
          };
        } else if (err instanceof Error) {
          submitError = {
            message: err.message,
            isNetworkError: true,
          };
        } else {
          submitError = {
            message: "An unexpected error occurred while submitting the simulation request.",
          };
        }
        setError(submitError);
        onFailed?.(submitError);
      }
    },
    [clearPollTimer, initialPollIntervalMs, jobStatus, onFailed, pollJob]
  );

  // Resume polling for an existing job without creating a duplicate
  const checkStatus = useCallback(
    (overrideId?: string) => {
      const targetId = overrideId || simulationId;
      if (!targetId) return;

      clearPollTimer();
      activeJobIdRef.current = targetId;
      attemptCountRef.current = 0;
      consecutiveErrorsRef.current = 0;
      currentIntervalRef.current = initialPollIntervalMs;
      setError(null);
      setJobStatus("queued");

      pollJob(targetId);
    },
    [clearPollTimer, initialPollIntervalMs, pollJob, simulationId]
  );

  // Retry creates a BRAND NEW simulation job via POST /v1/simulations
  const retry = useCallback(() => {
    if (lastRequestRef.current) {
      submitJob(lastRequestRef.current);
    }
  }, [submitJob]);

  // Reset to initial idle state
  const reset = useCallback(() => {
    clearPollTimer();
    activeJobIdRef.current = null;
    setJobStatus("idle");
    setSimulationId(null);
    setDetail(null);
    setError(null);
  }, [clearPollTimer]);

  // Clean up timer and abort on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      activeJobIdRef.current = null;
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const isSubmitting = jobStatus === "submitting";
  const isPolling = jobStatus === "queued" || jobStatus === "running";
  const isBusy = isSubmitting || isPolling;

  return {
    jobStatus,
    simulationId,
    detail,
    error,
    lastRequest,
    isSubmitting,
    isPolling,
    isBusy,
    submitJob,
    checkStatus,
    retry,
    reset,
  };
}
