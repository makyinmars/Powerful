export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age?: string;
  goal?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
