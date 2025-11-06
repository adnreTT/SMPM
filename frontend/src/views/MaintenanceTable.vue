
<template>
  <div class="space-y-4">
    <div class="bg-white rounded-xl p-4 shadow">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input v-model="q.machine" placeholder="Máquina" class="input" />
        <input v-model="q.sector" placeholder="Setor" class="input" />
        <input v-model="q.date" placeholder="Data (YYYY-MM-DD)" class="input" />
        <select v-model="q.status" class="input">
          <option value="">Status</option>
          <option>Concluída</option>
          <option>Pendente</option>
          <option>Atrasada</option>
        </select>
        <button class="px-3 py-2 bg-slate-200 rounded" @click="store.fetchAll()">Recarregar</button>
      </div>
    </div>
    <div class="bg-white rounded-xl p-4 shadow overflow-auto">
      <table class="min-w-full text-sm">
        <thead class="text-left text-slate-500">
          <tr><th class="py-2">ID</th><th>Máquina</th><th>Data</th><th>Setor</th><th>Status</th><th>Ações</th></tr>
        </thead>
        <tbody>
          <tr v-for="m in filtered" :key="m._id" class="border-t">
            <td class="py-2">{{ m._id.slice(-6) }}</td>
            <td>{{ m.machine }}</td>
            <td>{{ fmt(m.date) }}</td>
            <td>{{ m.sector }}</td>
            <td><span :class="statusClass(m.status)" class="px-2 py-1 rounded text-white text-xs">{{ m.status }}</span></td>
            <td class="space-x-2">
              <RouterLink :to="`/details/${m._id}`" class="btn">Ver</RouterLink>
              <button class="btn-secondary" @click="store.remove(m._id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useMaintenanceStore } from '../store'
const store = useMaintenanceStore()
onMounted(()=> { if(!store.loaded) store.fetchAll() })
const q = reactive({ machine:'', date:'', sector:'', status:'' })
const filtered = computed(()=> store.items.filter(i => {
  const ok = (v, term) => !term || String(v).toLowerCase().includes(String(term).toLowerCase())
  return ok(i.machine, q.machine) && ok(i.sector, q.sector) &&
    (!q.date || String(i.date).slice(0,10) === q.date) && ok(i.status, q.status)
}))
function fmt(d){ return new Date(d).toISOString().slice(0,10) }
function statusClass(s){ return { 'Concluída':'bg-success', 'Pendente':'bg-warning', 'Atrasada':'bg-danger' }[s] || 'bg-slate-400' }
</script>
<style scoped>
.input{ @apply border rounded-lg px-3 py-2 w-full; }
.btn{ @apply inline-block px-3 py-1 bg-blue-600 text-white rounded; }
.btn-secondary{ @apply px-3 py-1 bg-slate-200 rounded; }
</style>
