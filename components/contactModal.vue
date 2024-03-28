<script setup lang="ts">
defineEmits(['close'])

defineProps({
  id: [Number, String],
  name: String,
  term: Object
})
</script>

<template>
  <div
    class="bg-[rgba(0,0,0,0.5)] fixed flex inset-0 items-center justify-center text-black text-left z-10"
    v-on:click.self="$emit('close')"
  >
    <div class="bg-white max-h-screen overflow-y-scroll p-8 relative shadow-lg w-max">
      <button
        class="absolute hover:bg-primary flex h-8 items-center justify-center right-2 rounded-2xl hover:text-white top-2 transition-colors w-8"
        aria-label="Close"
        v-on:click.self="$emit('close')"
      >
        x
      </button>
      <LegislatorCard v-bind:id="id" v-bind:name="name" v-bind:term="term" />
    </div>
  </div>
</template>
