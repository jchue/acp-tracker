<script setup lang="ts">
import legislators from '~/data/legislators.json'

const props = defineProps({
  id: [Number, String]
})

const legislator = legislators.find((legislator) => {
  return legislator.id.govtrack?.toString() === props.id?.toString()
})

const name = legislator?.name.official_full
const term = legislator?.terms[legislator?.terms.length - 1]
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child><slot></slot></DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-[rgba(0,0,0,0.5)] fixed flex inset-0 items-center justify-center text-black text-left z-10"
      />
      <DialogContent
        class="bg-white max-h-screen overflow-y-scroll p-8 shadow-lg w-max fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10"
      >
        <DialogTitle class="font-bold mb-4 text-3xl">{{ name }}</DialogTitle>
        <DialogDescription>
          <LegislatorCard v-bind:id="id" v-bind:term="term" />
        </DialogDescription>
        <DialogClose
          class="absolute hover:bg-primary flex h-8 items-center justify-center right-2 rounded-2xl hover:text-white top-2 transition-colors w-8"
          >x</DialogClose
        >
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
