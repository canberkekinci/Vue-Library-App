<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref("");

const handleSearch = () => {
  if (!search.value.trim()) {
    return;
  }
  router.push({ name: 'books', query: { search: search.value }});
}
</script>

<template>
  <section class="bg-gray-100 py-20 text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Library</h1>
    <p class="text-gray-600 max-w-2xl mx-auto mb-6">
      Discover thousands of books, journals, and e-resources — all in one place.
    </p>
    <div class="flex justify-center">
      <input
        v-model="search"
        type="text"
        placeholder="Search books, authors, or ISBN..."
        class="border rounded-l-lg px-4 py-2 w-64 md:w-96 focus:outline-none"
      />
      <button
        @click="handleSearch"
        class="bg-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  </section>
</template>
