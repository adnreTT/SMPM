
<template>
  <div class="space-y-4">
    <div class="bg-white rounded-xl p-4 shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input v-model="q.machine" placeholder="Máquina" class="input" />
        <input v-model="q.sector" placeholder="Setor" class="input" />
        <input v-model="q.date" placeholder="Data (YYYY-MM-DD)" class="input" />
        <select v-model="q.status" class="input">
          <option value="">Status</option>
          <option>Concluída</option>
          <option>Pendente</option>
          <option>Atrasada</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 shadow overflow-auto">
      <table class="min-w-full text-sm">
        <thead class="text-left text-slate-500">
          <tr>
            <th class="py-2">ID</th>
            <th>Máquina</th>
            <th>Data</th>
            <th>Setor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in filtered" :key="m.id" class="border-t">
            <td class="py-2">{{ m.id }}</td>
            <td>{{ m.machine }}</td>
            <td>{{ m.date }}</td>
            <td>{{ m.sector }}</td>
            <td>
              <span :class="statusClass(m.status)" class="px-2 py-1 rounded text-white text-xs">
                {{ m.status }}
              </span>
            </td>
            <td class="space-x-2">
              <RouterLink :to="`/details/${m.id}`" class="btn">Ver</RouterLink>
              <button class="btn-secondary" @click="remove(m.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useMaintenanceStore } from '../store'
const store = useMaintenanceStore()

const q = reactive({ machine:'', date:'', sector:'', status:'' })

const filtered = computed(()=> {
  return store.items.filter(i => {
    const ok = (v, term) => !term || String(v).toLowerCase().includes(String(term).toLowerCase())
    return ok(i.machine, q.machine) && ok(i.date, q.date) && ok(i.sector, q.sector) && ok(i.status, q.status)
  })
})

function statusClass(s){
  return {
    'Concluída':'bg-success',
    'Pendente':'bg-warning',
    'Atrasada':'bg-danger',
  }[s] || 'bg-slate-400'
}

function remove(id){ store.remove(id) }
</script>
<style scoped>
.input{ @apply border rounded-lg px-3 py-2 w-full; }
.btn{ @apply inline-block px-3 py-1 bg-blue-600 text-white rounded; }
.btn-secondary{ @apply px-3 py-1 bg-slate-200 rounded; }
</style>
