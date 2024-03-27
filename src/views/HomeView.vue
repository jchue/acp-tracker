<script setup lang="ts">
import { State } from '@/components/states'

const states = Object.entries(State)
</script>

<template>
  <div class="wrapper">
    <span class="tagline"
      >22.8 million households will lose access to affordable internet in May 2024</span
    >

    <p>See the breakdown by state:</p>

    <ul class="states">
      <li v-for="state in states" v-bind:key="state[0]">
        <RouterLink v-bind:to="`/${state[0]}`">{{ state[1] }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tagline {
  display: block;
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 2rem;
}

.states {
  columns: 3 auto;
}
</style>
