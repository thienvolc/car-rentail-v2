import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  date_of_birth?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface JWTPayload {
  user_id: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface SearchFilters {
  location?: string;
  pickup_date?: Date;
  return_date?: Date;
  price_min?: number;
  price_max?: number;
  fuel_type?: string[];
  transmission_type?: string[];
  number_of_seats?: number;
  brand?: string[];
}
