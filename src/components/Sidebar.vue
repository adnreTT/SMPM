
<template>
  <aside class="hidden md:block fixed inset-y-0 w-64 bg-slate-900 text-slate-100">
    <div class="px-6 py-4 border-b border-slate-800 text-sm font-semibold flex items-center justify-between">
      <span>SMPM</span>
      <button class="text-xs bg-slate-800 px-2 py-1 rounded" @click="logout">Sair</button>
    </div>
    <nav class="p-2 space-y-1">
      <RouterLink class="nav" to="/dashboard">Dashboard</RouterLink>
      <RouterLink class="nav" to="/calendar">Calendário</RouterLink>
      <RouterLink class="nav" to="/list">Lista</RouterLink>
      <RouterLink class="nav" to="/profile">Perfil</RouterLink>
    </nav>
  </aside>
</template>
<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()
function logout(){
  auth.logout()
  router.push({ name: 'login' })
}
</script>
<style scoped>
.nav{ display:block; padding:0.75rem 1rem; border-radius:0.5rem; }
.nav.router-link-active{ background:#1f2937; }
</style>
