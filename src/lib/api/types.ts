/**
 * API Type Definitions matching the authoritative BehaviorSim API schemas.
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

export interface AccountResponse {
  id: string;
  email: string;
  display_name?: string | null;
  is_active: boolean;
  created_at: string;
  authentication_methods: string[];
  plan: string;
}

export interface PlanSummary {
  name: string;
  monthly_requests: number;
  monthly_interactions: number;
  max_interactions_per_request: number;
  requests_per_minute: number;
  max_concurrent_simulations: number;
}

export interface PeriodSummary {
  start: string;
  end: string;
}

export interface UsageMetricCounts {
  requests: number;
  interactions: number;
}

export interface UsageResponse {
  plan: PlanSummary;
  period: PeriodSummary;
  usage: UsageMetricCounts;
  remaining: UsageMetricCounts;
}

export interface APIKeyMetadataResponse {
  id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at?: string | null;
  revoked_at?: string | null;
}

export interface APIKeyCreateResult {
  id: string;
  name: string;
  key: string; // Raw secret, returned only once upon creation
  key_prefix: string;
  created_at: string;
}

export interface RevokeAPIKeyResponse {
  status: string;
  id: string;
}

export interface PresetResponse {
  name: string;
  description: string;
  available: boolean;
  default_profile: string;
  supported_profiles: string[];
  supported_states: string[];
}

export interface SimulationRequest {
  preset: string;
  num_interactions: number;
  seed?: number | null;
  profile?: string | null;
  initial_state?: string | null;
}

export interface SimulationMetadata {
  behaviorsim_version: string;
  api_version: string;
  compute_ms: number;
  reproducible: boolean;
}

export interface SimulationResponse {
  simulation_id: string;
  preset: string;
  num_interactions: number;
  seed: number | null;
  data: Record<string, unknown>[];
  metadata: SimulationMetadata;
}
