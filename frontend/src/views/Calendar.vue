
<template>
  <div class="bg-white rounded-xl p-4 shadow">
    <h2 class="text-lg font-semibold mb-4">Calendário</h2>
    <div class="grid grid-cols-7 gap-2 text-center">
      <div class="font-semibold text-slate-500" v-for="d in days" :key="d">{{ d }}</div>
      <div v-for="day in 30" :key="day" class="p-3 rounded-lg border" :class="badge(day).cls" :title="badge(day).label">{{ day }}</div>
    </div>
    <div class="mt-4 flex items-center gap-3 text-sm">
      <span class="inline-block w-3 h-3 rounded bg-success"></span> Concluída
      <span class="inline-block w-3 h-3 rounded bg-warning"></span> Pendente
      <span class="inline-block w-3 h-3 rounded bg-danger"></span> Atrasada
    </div>
  </div>
</template>
<script setup>
import { useMaintenanceStore } from '../store'
import { onMounted } from 'vue'
const store = useMaintenanceStore()
const days = ['D','S','T','Q','Q','S','S']
onMounted(()=> { if(!store.loaded) store.fetchAll() })
function badge(day){
  const match = store.items.find(i => new Date(i.date).getDate() === day)
  if(!match) return { cls:'', label:'' }
  const map = { 'Concluída':'border-success/40 bg-success/10', 'Pendente':'border-warning/40 bg-warning/10', 'Atrasada':'border-danger/40 bg-danger/10' }
  return { cls: map[match.status] || '', label: match.status }
}
</script>
