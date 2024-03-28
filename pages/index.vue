<script setup lang="ts">
import { State } from '~/utils/states'

const states = Object.entries(State)
</script>

<template>
  <section class="hero">
    <div class="wrapper">
      <p><em>22.8 million households</em> will lose access to affordable internet in May 2024</p>

      <div class="cta">
        <RouterLink to="/about" class="button primary">Why?</RouterLink>
        <a href="#states" class="button secondary">How many in each state?</a>
      </div>
    </div>
  </section>
  <section id="states" class="wrapper">
    <p>See the breakdown by state:</p>

    <ul class="states">
      <li v-for="state in states" v-bind:key="state[0]">
        <RouterLink v-bind:to="`/${state[0]}`">{{ state[1] }}</RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.hero {
  background-color: var(--color-accent);
  color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 4rem;
  font-weight: bold;
  height: 100vh;
  line-height: 1.25;
  margin-top: -2rem;
  padding: 4rem 0;
}

.hero .wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

em {
  display: block;
  font-size: 6rem;
  font-style: normal;
}

.cta {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.button {
  border: 3px solid;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 1.25rem;
  font-weight: bold;
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

section#states {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

ul.states {
  columns: 3 auto;
}
</style>
