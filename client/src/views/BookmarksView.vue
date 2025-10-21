<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const books = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("/books/with-bookmarks");
    books.value = res.data;
  } catch (error) {
    console.log(error);
  }
});

const router = useRouter();

const handleClick = (bookId) => {
  router.push({ name: "book", params: { id: bookId } });
};
</script>

<template>
  <Navbar />
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <section class="bg-blue-700 text-white py-16 text-center">
      <h1 class="text-4xl font-bold mb-3">My Bookmarked Books</h1>
      <p class="text-blue-100 max-w-2xl mx-auto">
        All the books you’ve saved to your personal list.
      </p>
    </section>

    <!-- Book Grid -->
    <section class="py-12 max-w-6xl mx-auto px-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <!-- Book Card -->
        <div
          v-for="book in books"
          @click="handleClick(book.id)"
          :key="book.id"
          class="bg-white border rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer"
        >
          <img
            src="https://picsum.photos/400/300?random={{book.id}}"
            alt="Book Cover"
            class="w-full h-56 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ book.author }}</p>
            <span
              class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              ★ Bookmarked
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>
