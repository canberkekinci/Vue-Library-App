<script setup>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const search = ref("");
const books = ref([]);

onMounted(async () => {
  if (route.query.search) {
    search.value = route.query.search;
  }
  try {
    const res = await axios.get("/books", {
      params: {
        query: route.query.search,
      },
    });
    books.value = res.data;
  } catch (error) {
    console.log(error);
  }
});

watch(search, async (newSearch, oldSearch) => {
  try {
    const res = await axios.get("/books", {
      params: {
        query: newSearch,
      },
    });
    books.value = res.data;
  } catch (error) {
    console.log(error);
  }
});

const goToBook = (bookId) => {
  router.push({ name: "book", params: { id: bookId } });
};
</script>

<template>
  <Navbar />
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <section class="bg-blue-700 text-white py-16 text-center">
      <h1 class="text-4xl font-bold mb-3">Our Books</h1>
      <p class="text-blue-100 max-w-2xl mx-auto">
        Explore all available titles in the CanLib collection.
      </p>
    </section>

    <!-- Search Bar -->
    <section class="bg-white py-8 shadow-sm">
      <div class="max-w-3xl mx-auto flex justify-center px-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search by title or author..."
          class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </section>

    <!-- Book Grid -->
    <section class="py-12 max-w-6xl mx-auto px-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <div
          @click="goToBook(book.id)"
          v-for="book in books"
          :key="book.id"
          class="bg-white border rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer"
        >
          <img
            src="https://picsum.photos/400/300?random={{n}}"
            alt="Book Cover"
            class="w-full h-56 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
            <p class="text-gray-600 text-sm">{{ book.author }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>
