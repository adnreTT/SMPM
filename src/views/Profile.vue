
<template>
  <div class="bg-white rounded-xl p-4 shadow max-w-2xl">
    <h2 class="text-lg font-semibold mb-4">Perfil</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <div class="text-sm text-slate-500">Nome</div>
        <div class="font-medium">{{ name }}</div>
      </div>
      <div>
        <div class="text-sm text-slate-500">E-mail</div>
        <div class="font-medium">{{ email }}</div>
      </div>
      <div>
        <div class="text-sm text-slate-500">Papel</div>
        <div class="font-medium">Gestor</div>
      </div>
      <div>
        <div class="text-sm text-slate-500">Token válido até</div>
        <div class="font-medium">{{ expStr }}</div>
      </div>
    </div>
    <div class="mt-6">
      <button class="px-4 py-2 bg-blue-600 text-white rounded" @click="refresh">Renovar sessão (mock)</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { makeToken, parseToken } from '../services/auth'
const auth = useAuthStore()

const name = computed(()=> auth.name)
const email = computed(()=> auth.email)
const expStr = computed(()=> {
  if(!auth.token) return '-'
  const { exp } = parseToken(auth.token) || {}
  if(!exp) return '-'
  const d = new Date(exp*1000)
  return d.toLocaleString()
})

function refresh(){
  if(!auth.user) return
  auth.token = makeToken({ sub: auth.user.id, email: auth.user.email }, 3600)
  localStorage.setItem('smpm_auth_token', auth.token)
}
</script>
