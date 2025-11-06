
<template>
  <div class="bg-white rounded-xl p-4 shadow max-w-2xl">
    <h2 class="text-lg font-semibold mb-4">Perfil</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div><div class="text-sm text-slate-500">Nome</div><div class="font-medium">{{ name }}</div></div>
      <div><div class="text-sm text-slate-500">E-mail</div><div class="font-medium">{{ email }}</div></div>
      <div><div class="text-sm text-slate-500">Papel</div><div class="font-medium">Gestor</div></div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
const auth = useAuthStore()
const name = computed(()=> auth.name)
const email = computed(()=> auth.email)
</script>
