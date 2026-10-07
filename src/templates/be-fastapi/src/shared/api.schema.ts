/**
 * @ai-context Shared API type definitions — single source of truth.
 * Frontend uses these for type checking, backend mirrors them in Pydantic.
 */

/** Standard API response wrapper */
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

/** User types */
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface UserCreate {
  email: string;
  name: string;
  password: string;
}

/** Auth types */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

/** Health check */
export interface HealthResponse {
  status: 'ok' | 'error';
}
