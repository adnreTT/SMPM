
<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100">
    <div class="absolute inset-0 pointer-events-none opacity-10 select-none">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
    <div class="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded bg-blue-700 flex items-center justify-center text-white font-bold">S</div>
        <div><h1 class="text-lg font-semibold">SMPM</h1><p class="text-xs text-slate-500 -mt-1">Sistema de Manutenção Preventiva</p></div>
      </div>
      <form class="space-y-4" @submit.prevent="handleLogin">
        <div><label class="block text-sm text-slate-600 mb-1">E-mail corporativo</label>
          <input v-model="email" type="email" class="w-full border rounded-lg px-3 py-2" placeholder="seu.email@empresa.com" required /></div>
        <div><label class="block text-sm text-slate-600 mb-1">Senha</label>
          <input v-model="password" type="password" class="w-full border rounded-lg px-3 py-2" placeholder="********" required /></div>
        <button :disabled="loading" class="w-full py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-60">Entrar</button>
        <p v-if="error" class="text-sm text-danger">{{ error }}</p>
        <p class="text-xs text-slate-500">Dica: admin@smpm.com / 123456</p>
      </form>
      <div class="mt-6 text-xs text-slate-500">Ambiente corporativo. Padrões de segurança e conformidade.</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
const email = ref(''); const password = ref(''); const error = ref(''); const loading = ref(false)
const router = useRouter(); const route = useRoute(); const auth = useAuthStore()
async function handleLogin(){
  error.value=''; loading.value=true
  try{
    await auth.login(email.value, password.value)
    const go = route.query.redirect || '/dashboard'; router.push(go)
  }catch(e){ error.value = e?.response?.data?.error || e.message || 'Erro ao autenticar' }
  finally{ loading.value=false }
}
</script>
