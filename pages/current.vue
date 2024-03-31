<script setup>
const steps = [
  {
    title: 'Introduction',
    content: `
      <ul>
        <li>House: Introduced and referred <a href="https://www.congress.gov/bill/118th-congress/house-bill/6929" target="_blank">H.R.6929</a> to committee on January 10, 2024</li>
        <li>Senate: Read and referred <a href="https://www.congress.gov/bill/118th-congress/senate-bill/3565" target="_blank">S.3565</a> to committee on January 10, 2024</li>
      </ul>
    `,
    complete: true
  },
  {
    title: 'Committee consideration',
    content: `
      <ul>
        <li>
          House: Pending agenda by Committee on Appropriations Chair Kay Granger
          (TX-12)
        </li>
        <li>
          Senate: Pending agenda by Committee on Appropriations Chair Patty Murray
          (WA)
        </li>
      </ul>
    `,
    current: true
  },
  {
    title: 'Pass by House',
    content: `218/435 simple majority`
  },
  {
    title: 'Pass by Senate',
    content: `51/100 simple majority`
  },
  {
    title: 'Sign by President',
    content: ``
  }
]
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4">
    <h1>Where are we now?</h1>

    <p>
      The
      <NuxtLink to="/about"><abbr title="Affordable Connectivity Program">ACP</abbr></NuxtLink> will
      expire at the end of April 2024 unless a bill to extend it is passed. Here is its current
      state in the legislative process:
    </p>

    <ol class="mt-8 relative z-0">
      <li v-for="(step, index) in steps" v-bind:key="step.title" class="relative">
        <div
          v-if="index < steps.length - 1 && step.complete"
          class="absolute bg-primary h-full left-[13px] w-[3px]"
        ></div>
        <div
          v-else-if="index < steps.length - 1"
          class="absolute bg-gray-300 h-full left-[13px] w-[3px]"
        ></div>
        <span class="flex gap-4 items-start pb-6 relative z-10">
          <span
            v-if="step.complete"
            class="bg-primary flex h-7 items-center justify-center rounded-full text-white w-7"
            >&#x2713;</span
          >
          <span
            v-else-if="step.current"
            class="bg-white border-[3px] border-primary flex h-7 items-center justify-center rounded-full text-white w-7"
          ></span>
          <span
            v-else
            class="bg-white border-[3px] border-gray-300 flex h-7 items-center justify-center rounded-full text-white w-7"
          ></span>
          <span>
            <span class="block font-bold">{{ step.title }}</span>
            <span v-html="step.content"></span>
          </span>
        </span>
      </li>
    </ol>

    <p>
      To learn more about the legislative process, visit
      <a href="https://www.usa.gov/how-laws-are-made" target="_blank">USAGov</a>.
    </p>
  </div>
</template>
