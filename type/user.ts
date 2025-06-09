export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  date_of_birth?: Date;
  gender?: 'male' | 'female' | 'other';
  avatar_url?: string;
  status: 'active' | 'inactive' | 'banned';
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  created_at: Date;
}

export interface UserSession {
  id: string;
  user_id: string;
  refresh_token_id: string;
  device_info?: string;
  ip_address?: string;
  user_agent?: string;
  login_time: Date;
  expired_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface OtpRequest {
  id: string;
  code: string;
  email: string;
  request_type: 'registration' | 'forgot_password' | 'host_registration';
  status: 'pending' | 'verified' | 'failed' | 'expired' | 'cancelled';
  created_at: Date;
  expired_at: Date;
}
