<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6"
  >
    <h1 class="text-9xl font-extrabold text-gray-400 tracking-widest">404</h1>
    <div
      class="bg-blue-500 text-white px-3 py-1 text-sm rounded rotate-12 absolute"
    >
      Page Not Found
    </div>

    <p class="text-lg mt-8 text-center">
      The page you’re looking for doesn’t exist or has been moved.
    </p>

    <router-link
      :to="{ name: 'home' }"
      class="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
    >
      Go Back Home
    </router-link>
  </div>
</template>

<script setup>
// no script logic needed
</script>

<style scoped>
.rotate-12 {
  transform: rotate(12deg);
}
</style>
