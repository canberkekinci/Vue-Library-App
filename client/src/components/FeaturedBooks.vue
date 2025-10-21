<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const featuredBooks = ref([]);

const isError = ref(false);

onMounted(async () => {
  try {
    const res = await axios.get("/books/featured");
    featuredBooks.value = res.data;
  } catch (error) {
    isError.value = true;
  }
});

const handleClick = (bookId) => {
  router.push({ name: "book", params: { id: bookId } });
};
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-8 text-center">Featured Books</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="book in featuredBooks"
          :key="book.id"
          class="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src="https://picsum.photos/400/250?random={{n}}"
            alt="Book Cover"
            class="w-full h-56 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ book.title }}</h3>
            <p class="text-gray-600 text-sm mb-3">
              {{ book.author }} — {{ book.description.substring(0, 50) }}...
            </p>
            <button
              @click="handleClick(book.id)"
              class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
