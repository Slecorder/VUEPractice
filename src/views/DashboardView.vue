<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <section>
    <h1>Dashboard</h1>
    <p v-if="auth.user">
      Bienvenido, <strong>{{ auth.user.name }}</strong> ({{ auth.user.email }})
    </p>

    <div class="card">
      <p><strong>Token:</strong> <code>{{ auth.token }}</code></p>
    </div>

    <button @click="logout">Cerrar sesión</button>
  </section>
</template>

<style scoped>
.card {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-wrap: anywhere;
}
button {
  padding: 0.5rem 1rem;
}
</style>
