<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'

const auth = useAuthStore()
function onLogout() {
  auth.logout()
}
</script>

<template>
  <nav class="nav">
    <RouterLink to="/">Home</RouterLink>
    <span> | </span>
    <RouterLink to="/about">About</RouterLink>
    <span> | </span>
    <RouterLink v-if="!auth.isAuthenticated" to="/login">Login</RouterLink>
    <template v-else>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <span> | </span>
      <button class="linklike" @click="onLogout">Logout</button>
    </template>
  </nav>
  <main class="view">
    <RouterView />
  </main>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
}
.view {
  padding-top: 1rem;
}
a.router-link-active {
  font-weight: 600;
  text-decoration: underline;
}
.linklike {
  background: none;
  border: none;
  padding: 0;
  color: #1e40af;
  cursor: pointer;
}
.linklike:hover { text-decoration: underline; }
</style>
