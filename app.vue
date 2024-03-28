<script setup lang="ts">
import '~/assets/main.css'

useSeoMeta({
  title: 'ACP Tracker',
})
</script>

<template>
  <header class="bg-white py-4 shadow-lg sticky top-0 z-10">
    <div class="wrapper flex items-center">
      <RouterLink to="/" class="hover:bg-transparent border-r border-black font-bold mr-8 pr-8 text-black hover:text-black">ACP Tracker</RouterLink>

      <nav class="flex items-center gap-2">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <main class="py-8">
    <NuxtPage />
  </main>
</template>

<style scoped>
nav a {
  border: 2px solid transparent;
  color: #000;
  display: inline-block;
  line-height: 1;
  padding: 0.25rem 0.5rem;
}

nav a:hover {
  background-color: transparent;
  border-bottom: 2px solid #000;
}

nav a.router-link-exact-active {
  border-color: #000;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
