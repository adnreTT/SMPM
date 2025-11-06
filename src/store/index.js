
import { defineStore } from 'pinia'

function seed() {
  return [
    { id: '001', machine: 'M1', date: '2025-08-15', sector: 'Corte', status: 'Concluída' },
    { id: '002', machine: 'M2', date: '2025-08-16', sector: 'Solda', status: 'Pendente' },
    { id: '003', machine: 'M3', date: '2025-08-17', sector: 'Pintura', status: 'Atrasada' },
    { id: '004', machine: 'M1', date: '2025-08-22', sector: 'Corte', status: 'Concluída' },
    { id: '005', machine: 'M2', date: '2025-08-23', sector: 'Solda', status: 'Pendente' }
  ]
}

export const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({
    items: seed()
  }),
  getters: {
    kpis: (state) => {
      const atrasadas = state.items.filter(i => i.status === 'Atrasada').length
      const pendentes = state.items.filter(i => i.status === 'Pendente').length
      const concluidas = state.items.filter(i => i.status === 'Concluída').length
      return { atrasadas, pendentes, concluidas }
    },
    monthlySeries: (state) => {
      const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
      const rnd = (i) => (i*7)%12 + 3
      return {
        labels: months,
        concluidas: months.map((_,i)=> rnd(i)%10 + 5),
        pendentes: months.map((_,i)=> (rnd(i+2))%10 + 2),
        atrasadas: months.map((_,i)=> (rnd(i+4))%8 + 1),
      }
    }
  },
  actions: {
    byId(id) { return this.items.find(i=>i.id===id) },
    add(item) { this.items.push(item) },
    update(id, patch) {
      const i = this.items.findIndex(x=>x.id===id)
      if (i>=0) this.items[i] = { ...this.items[i], ...patch }
    },
    remove(id) { this.items = this.items.filter(i=>i.id!==id) }
  }
})
