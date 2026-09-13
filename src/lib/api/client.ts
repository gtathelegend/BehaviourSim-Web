import { BehaviorSimAPIError } from "./errors";
import type { ApiErrorPayload } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.behavioursim.vedaangsharma.in";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
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
