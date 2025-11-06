
<template>
  <div class="bg-white rounded-xl p-4 shadow">
    <div class="text-sm text-slate-500">{{ label }}</div>
    <div class="mt-2 text-3xl font-semibold">{{ value }}</div>
  </div>
</template>
<script setup>
defineProps({ label: String, value: [String, Number] })
</script>
