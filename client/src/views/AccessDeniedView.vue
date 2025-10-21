<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6"
  >
    <h1 class="text-7xl font-extrabold text-red-500 mb-4">403</h1>
    <h2 class="text-2xl font-semibold mb-2">Access Denied</h2>
    <p class="text-center text-gray-600 max-w-md">
      You do not have permission to access this page. Only administrators can
      view this section.
    </p>

    <router-link
      :to="{ name: 'home' }"
      class="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
    >
      Return to Home
    </router-link>
  </div>
</template>

<script setup>
// no script logic needed
</script>
