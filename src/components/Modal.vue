
<template>
  <div v-if="open" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow w-full max-w-lg">
      <header class="p-4 border-b text-lg font-semibold">
        <slot name="title">Detalhes</slot>
      </header>
      <section class="p-4">
        <slot />
      </section>
      <footer class="p-4 border-t flex justify-end gap-2">
        <button class="px-3 py-2 bg-slate-200 rounded" @click="$emit('close')">Fechar</button>
        <button class="px-3 py-2 bg-blue-600 text-white rounded" @click="$emit('confirm')">Confirmar</button>
      </footer>
    </div>
  </div>
</template>
<script setup>
defineProps({ open: Boolean })
</script>
