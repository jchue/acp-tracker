<script setup>
defineProps({
  complete: Boolean,
  current: Boolean,
  last: Boolean,
  title: String,
})
</script>

<template>
  <li class="relative">
    <div
      v-if="!last && complete"
      class="absolute bg-primary h-full left-[13px] w-[3px]"
    ></div>
    <div
      v-else-if="!last"
      class="absolute bg-gray-300 h-full left-[13px] w-[3px]"
    ></div>
    <span class="flex gap-4 items-start pb-6 relative z-10">
      <span
        v-if="complete"
        class="bg-primary flex h-7 items-center justify-center rounded-full text-white w-7"
        >&#x2713;</span
      >
      <span
        v-else-if="current"
        class="bg-white border-[3px] border-primary flex h-7 items-center justify-center rounded-full text-white w-7"
      ></span>
      <span
        v-else
        class="bg-white border-[3px] border-gray-300 flex h-7 items-center justify-center rounded-full text-white w-7"
      ></span>
      <span>
        <span class="block font-bold">{{ title }}</span>
        <slot></slot>
      </span>
    </span>
  </li>
</template>
