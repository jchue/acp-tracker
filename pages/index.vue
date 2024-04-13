<script setup lang="ts">
import { State } from '~/utils/states'

const states = Object.entries(State)
</script>

<template>
  <section
    class="bg-primary flex flex-col font-bold h-screen leading-tight -mt-8 py-16 text-2xl md:text-4xl lg:text-6xl text-white"
  >
    <div class="wrapper flex flex-col gap-4 md:gap-6 lg:gap-8">
      <p>
        <em class="block not-italic text-4xl md:text-6xl lg:text-8xl">22.8 million households</em>
        will lose access to affordable internet in May 2024
      </p>

      <div class="flex gap-4 items-center">
        <RouterLink to="/about" class="button primary">Why?</RouterLink>
        <a href="#states" class="button secondary">How many in each state?</a>
      </div>
    </div>
  </section>
  <section class="wrapper py-8 md:py-12 lg:py-16">
    <AddressForm />
  </section>
  <section class="wrapper" id="states">
    <p>See the breakdown by state:</p>

    <ul class="sm:columns-2 md:columns-3">
      <li v-for="state in states" v-bind:key="state[0]">
        <RouterLink v-bind:to="`/${state[0]}`">{{ state[1] }}</RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.button {
  border: 3px solid;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  padding: 0.75rem 1rem;
}

.button:hover {
  background-color: black !important;
  border-color: transparent !important;
  color: #fff !important;
  opacity: 1;
}

.button.primary {
  background-color: #fff;
  border-color: transparent;
  color: var(--color-accent);
}

.button.secondary {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

@media (min-width: 640px) {
  .button {
    font-size: 1.125rem;
  }
}

@media (min-width: 768px) {
  .button {
    font-size: 1.125rem;
    padding: 0.75rem 1rem;
  }
}

@media (min-width: 1024px) {
  .button {
    font-size: 1.25rem;
    padding: 1rem 1.25rem;
  }
}
</style>
