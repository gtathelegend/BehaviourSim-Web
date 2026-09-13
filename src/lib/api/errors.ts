import type { ApiErrorPayload } from "./types";

/**
 * Standardized client exception matching the BehaviorSim API error envelope.
 */
export class BehaviorSimAPIError extends Error {
  public readonly statusCode: number;
  public readonly requestId?: string | null;
  public readonly details?: unknown;

  constructor(payload: ApiErrorPayload["error"]) {
    super(payload.message || "An unexpected error occurred communicating with BehaviorSim API");
    this.name = "BehaviorSimAPIError";
    this.statusCode = payload.status_code;
    this.requestId = payload.request_id;
    this.details = payload.details;
  }
}
