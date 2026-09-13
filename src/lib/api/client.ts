import { BehaviorSimAPIError } from "./errors";
import type {
  ApiErrorPayload,
  AccountResponse,
  PresetResponse,
  SimulationRequest,
  SimulationResponse,
  UsageResponse,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.behavioursim.vedaangsharma.in";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export interface ExplorerResult<T = unknown> {
  status: number;
  statusText: string;
  durationMs: number;
  requestId: string | null;
  data: T;
  isError: boolean;
}

/**
 * Base fetch wrapper with credentials, error envelope extraction, and request correlation.
 */
export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    ...(restOptions.body ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  const response = await fetch(url, {
    credentials: "include", // Enables HttpOnly session cookie transmission
    headers: defaultHeaders,
    ...restOptions,
  });

  if (!response.ok) {
    let errorPayload: ApiErrorPayload["error"] = {
      message: `HTTP ${response.status}: ${response.statusText}`,
      status_code: response.status,
    };

    try {
      const data = await response.json();
      if (data && data.error) {
        errorPayload = data.error;
      }
    } catch {
      // Fallback to generic status text if response is not JSON
    }

    throw new BehaviorSimAPIError(errorPayload);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Whitelist of safe, public, read-only endpoints allowed in the interactive explorer.
 */
export const EXPLORER_WHITELIST = [
  { path: "/health", method: "GET", description: "Liveness probe" },
  { path: "/ready", method: "GET", description: "Readiness probe & database connectivity" },
  { path: "/v1/presets", method: "GET", description: "Catalog of simulation presets" },
  { path: "/v1/presets/{preset}", method: "GET", description: "Details for a specific preset" },
] as const;

/**
 * Safely execute an explorer request against the whitelisted public endpoints only.
 */
export async function runExplorerRequest(
  endpointPath: string,
  paramValue?: string
): Promise<ExplorerResult> {
  // Normalize and validate that the requested endpoint is on the strict whitelist
  let targetPath = endpointPath;
  if (endpointPath === "/v1/presets/{preset}") {
    const safeParam = encodeURIComponent((paramValue || "education").trim());
    targetPath = `/v1/presets/${safeParam}`;
  } else if (!["/health", "/ready", "/v1/presets"].includes(endpointPath)) {
    throw new Error(`Endpoint '${endpointPath}' is not in the public explorer whitelist.`);
  }

  const fullUrl = `${API_BASE_URL}${targetPath}`;
  const startTime = performance.now();

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const durationMs = Math.round(performance.now() - startTime);
    const requestId = response.headers.get("X-Request-ID") || response.headers.get("x-request-id");

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = { message: await response.text() };
    }

    return {
      status: response.status,
      statusText: response.statusText,
      durationMs,
      requestId,
      data,
      isError: !response.ok,
    };
  } catch (err: unknown) {
    const durationMs = Math.round(performance.now() - startTime);
    return {
      status: 0,
      statusText: "Network Error",
      durationMs,
      requestId: null,
      data: {
        error: {
          message: err instanceof Error ? err.message : "Failed to connect to BehaviorSim API",
        },
      },
      isError: true,
    };
  }
}

/**
 * Fetch all available simulation presets from the authoritative API catalog.
 */
export async function getPresets(): Promise<PresetResponse[]> {
  return apiClient<PresetResponse[]>("/v1/presets");
}

/**
 * Fetch detailed configuration and metadata for a single simulation preset.
 */
export async function getPreset(name: string): Promise<PresetResponse> {
  return apiClient<PresetResponse>(`/v1/presets/${encodeURIComponent(name)}`);
}

/**
 * Authenticate and execute a simulation run, reserving usage quota and generating synthetic behavioral records.
 */
export async function createSimulation(
  request: SimulationRequest
): Promise<SimulationResponse> {
  return apiClient<SimulationResponse>("/v1/simulations", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Retrieve current billing period usage metrics and capacity limits for the authenticated user.
 */
export async function getUsage(): Promise<UsageResponse> {
  return apiClient<UsageResponse>("/v1/usage");
}

/**
 * Retrieve current user profile and plan details.
 */
export async function getAccount(): Promise<AccountResponse> {
  return apiClient<AccountResponse>("/v1/account");
}
