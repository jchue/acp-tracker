<script setup>
defineProps({
  addClass: String,
  to: String,
  type: String
})
</script>

<template>
  <button
    v-if="type"
    v-bind:type="type"
    v-bind:class="`bg-primary hover:bg-black border-2 border-primary hover:border-black cursor-pointer font-bold font-mono inline-block px-4 py-2 rounded-lg text-white ${addClass}`"
  >
    <slot></slot>
  </button>
  <NuxtLink
    v-if="to"
    v-bind:to="to"
    v-bind:class="`bg-primary hover:bg-black border-2 border-primary hover:border-black cursor-pointer font-bold font-mono inline-block px-4 py-2 rounded-lg text-white ${addClass}`"
  >
    <slot></slot>
  </NuxtLink>
</template>
