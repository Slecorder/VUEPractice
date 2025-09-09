import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser, Credentials } from '@/stores/types/auth'
import * as AuthAPI from '@/services/api/auth.service'

const TOKEN_KEY = 'auth:token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(credentials: Credentials) {
    loading.value = true
    error.value = null
    try {
      const res = await AuthAPI.login(credentials)
      token.value = res.token
      user.value = res.user
      localStorage.setItem(TOKEN_KEY, res.token)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error de autenticación'
      error.value = message
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    error.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async function loadUser() {
    if (!token.value) return
    try {
      user.value = await AuthAPI.me(token.value)
    } catch {
      // Si falla (token caducado), cerrar sesión
      logout()
    }
  }

  // Inicialización perezosa del usuario si ya hay token
  if (token.value) {
    // No esperamos; se carga en segundo plano
    loadUser()
  }

  return {
    // state
    token,
    user,
    loading,
    error,
    // getters
    isAuthenticated,
    // actions
    login,
    logout,
    loadUser,
  }
})
