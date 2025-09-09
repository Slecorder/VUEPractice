<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count, doubleCount } = storeToRefs(counter)

function increment() {
  counter.increment()
}
</script>

<template>
  <section>
    <h1>Home</h1>
    <p>Este es un ejemplo con Pinia:</p>

    <div class="card">
      <p><strong>count:</strong> {{ count }}</p>
      <p><strong>doubleCount (computed):</strong> {{ doubleCount }}</p>
      <button @click="increment">Incrementar</button>
    </div>
  </section>
</template>

<style scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
button {
  padding: 0.5rem 1rem;
}
</style>
