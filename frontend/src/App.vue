
<template>
  <div class="min-h-screen flex">
    <Sidebar v-if="authed" />
    <main class="flex-1" :class="authed ? 'ml-0 md:ml-64 bg-slate-100' : ''">
      <header v-if="authed" class="bg-blue-700 text-white px-6 py-4 shadow">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold">Sistema de Manutenção Preventiva de Máquinas</h1>
          <div class="text-sm opacity-90">Olá, {{ name }}</div>
        </div>
      </header>
      <div :class="authed ? 'p-6' : ''">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script setup>
import Sidebar from './components/Sidebar.vue'
import { computed } from 'vue'
import { useAuthStore } from './store/auth'
const auth = useAuthStore()
const authed = computed(()=> auth.isAuthenticated)
const name = computed(()=> auth.name || 'Usuário')
</script>
