
<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiCard label="Manutenções atrasadas" :value="kpis.atrasadas" />
      <KpiCard label="Concluídas" :value="kpis.concluidas" />
      <KpiCard label="Pendentes" :value="kpis.pendentes" />
    </div>
    <div class="bg-white rounded-xl p-4 shadow">
      <h2 class="text-lg font-semibold mb-4">Evolução das manutenções</h2>
      <div class="h-72">
        <ChartBar :labels="series.labels" :series="series" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMaintenanceStore } from '../store'
import KpiCard from '../components/KpiCard.vue'
import ChartBar from '../components/ChartBar.vue'

const store = useMaintenanceStore()
const kpis = computed(()=> store.kpis)
const series = computed(()=> store.monthlySeries)
</script>
