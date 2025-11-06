
<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiCard label="Manutenções atrasadas" :value="kpis.atrasadas" />
      <KpiCard label="Concluídas" :value="kpis.concluidas" />
      <KpiCard label="Pendentes" :value="kpis.pendentes" />
    </div>
    <div class="bg-white rounded-xl p-4 shadow">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Evolução das manutenções</h2>
        <button class="px-3 py-2 bg-slate-200 rounded" @click="reload">Recarregar</button>
      </div>
      <div class="h-72">
        <ChartBar :labels="series.labels" :series="series" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useMaintenanceStore } from '../store'
import KpiCard from '../components/KpiCard.vue'
import ChartBar from '../components/ChartBar.vue'
const store = useMaintenanceStore()
const kpis = computed(()=> store.kpis)
const series = computed(()=> store.monthlySeries)
onMounted(()=> { if(!store.loaded) store.fetchAll() })
function reload(){ store.fetchAll() }
</script>
