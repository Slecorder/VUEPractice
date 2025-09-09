export interface AuthUser {
  id: string
  name: string
  email: string
  roles?: string[]
}

export interface Credentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}
