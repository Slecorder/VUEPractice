import { get, post } from './http'
import { API_BASE_URL } from './http'
import type { AuthResponse, Credentials, AuthUser } from '@/stores/types/auth'

const isMock = !API_BASE_URL

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function login(credentials: Credentials): Promise<AuthResponse> {
  if (isMock) {
    await delay(400)
    const { email, password } = credentials
    // Mock muy simple
    if (!email || !password) throw new Error('Email y contraseña requeridos')
    const user: AuthUser = {
      id: '1',
      name: 'Admin',
      email,
      roles: ['admin'],
    }
    return { user, token: 'mock-token-123' }
  }

  // Backend real (ajusta las rutas según tu API)
  return post<AuthResponse>('/auth/login', credentials)
}

export async function me(token: string): Promise<AuthUser> {
  if (isMock) {
    await delay(200)
    return {
      id: '1',
      name: 'Admin',
      email: 'admin@example.com',
      roles: ['admin'],
    }
  }
  return get<AuthUser>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
}
