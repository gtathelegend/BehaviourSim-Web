/**
 * API Type Definitions matching BehaviorSim API backend schemas
 */

export interface ApiErrorDetail {
  loc?: string[];
  msg?: string;
  type?: string;
  [key: string]: unknown;
}

export interface ApiErrorPayload {
  error: {
    message: string;
    status_code: number;
    details?: Record<string, unknown> | ApiErrorDetail[];
    request_id?: string | null;
  };
}

export interface UserAccount {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
  is_active: boolean;
  tier: "free" | "researcher" | "enterprise";
  created_at: string;
}

export interface UsageMetrics {
  user_id: string;
  period_start: string;
  period_end: string;
  total_requests: number;
  max_requests: number;
  remaining_requests: number;
  quota_reset_at: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  last_used_at?: string | null;
  is_active: boolean;
}

export interface ApiKeyCreatedResponse {
  id: string;
  name: string;
  prefix: string;
  token: string; // Only shown once at creation time
  created_at: string;
}

export interface PresetSummary {
  id: string;
  name: string;
  description: string;
  domain: string;
  states_count: number;
}
