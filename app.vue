<script setup lang="ts">
import '~/assets/main.css'

useHead({
  title: 'ACP Tracker',
})
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/" class="site-name">ACP Tracker</RouterLink>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <NuxtPage />
  </main>
</template>

<style scoped>
header {
  background-color: #fff;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.05);
  line-height: 1.5;
  padding: 1rem 0;
  position: sticky;
  top: 0;
}

header > div {
  align-items: center;
  display: flex;
}

.site-name {
  border-right: 1px solid #000;
  color: #000;
  font-weight: bold;
  margin-right: 2rem;
  padding-right: 2rem;
}

nav {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

nav a {
  border: 2px solid transparent;
  color: #000;
  display: inline-block;
  line-height: 1;
  padding: 0.25rem 0.5rem;
}

nav a.router-link-exact-active {
  border-color: #000;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

main {
  padding: 2rem 0;
}
</style>
