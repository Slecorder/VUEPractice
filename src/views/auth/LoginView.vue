<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function onSubmit() {
  try {
    await auth.login({ email: email.value, password: password.value })
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.replace(redirect)
  } catch {
    // error ya está en auth.error
  }
}
</script>

<template>
  <section class="login">
    <h1>Login</h1>

    <form @submit.prevent="onSubmit">
      <label>
        <span>Email</span>
        <input v-model="email" type="email" required />
      </label>

      <label>
        <span>Contraseña</span>
        <input v-model="password" type="password" required />
      </label>

      <button type="submit" :disabled="auth.loading">{{ auth.loading ? 'Entrando…' : 'Entrar' }}</button>
    </form>

    <p v-if="auth.error" class="error">{{ auth.error }}</p>
  </section>
</template>

<style scoped>
.login { max-width: 420px; }
form { display: grid; gap: 0.75rem; margin-top: 1rem; }
label { display: grid; gap: 0.25rem; }
input { padding: 0.5rem 0.75rem; border: 1px solid #ccc; border-radius: 6px; }
button { padding: 0.5rem 1rem; }
.error { color: #b00020; margin-top: 0.5rem; }
</style>
