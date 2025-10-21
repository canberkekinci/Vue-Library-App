<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import isAuthenticated from "@/auth";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();

const book = ref({});

const toast = useToast();

const isBorrowed = ref(false);
const isBookmarked = ref(false);

const auth = useAuthStore();

onMounted(async () => {
  const id = route.params.id;
  if (isAuthenticated()) {
    try {
      const res = await axios.get(`/books/with-bookmarks/${id}`);
      book.value = res.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await axios.get(`/books/${id}`);
      book.value = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  isBookmarked.value = book.value.is_bookmarked;
  isBorrowed.value = !!book.value.borrower_id;
});

const handleBorrow = async () => {
  const id = route.params.id;
  if (isAuthenticated()) {
    try {
      await axios.post(`/books/borrow/${id}`);
      book.value.borrower_id = auth.user.id;
      isBorrowed.value = true;
      toast.success("Book borrowed successfully.");
    } catch (error) {
      console.log(error);
    }
  } else {
    router.push({ name: "login", query: { redirect: route.fullPath } });
  }
};

const handleBookmark = async () => {
  if (isAuthenticated()) {
    try {
      const id = route.params.id;
      await axios.post(`/books/bookmark/${id}`);
      book.value.is_bookmarked = true;
      isBookmarked.value = true;
      toast.success("Bookmarked successfully.");
    } catch (error) {
      console.log(error);
    }
  } else {
    router.push({ name: "login", query: { redirect: route.fullPath } });
  }
};

const handleReturn = async () => {
  try {
    const id = route.params.id;
    await axios.post(`/books/return/${id}`);
    book.value.borrower_id = null;
    isBorrowed.value = false;
    toast.success("Book returned successfully.");
  } catch (error) {
    console.log(error);
  }
};

const handleUnbookmark = async () => {
  try {
    const id = route.params.id;
    await axios.delete(`books/unbookmark/${id}`);
    book.value.is_bookmarked = false;
    isBookmarked.value = false;
    toast.success("Unbookmarked successfully.");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Hero Section -->
    <section class="w-full bg-blue-700 text-white py-16 text-center">
      <h1 class="text-4xl font-bold mb-2">{{ book.title }}</h1>
      <p class="text-blue-100 text-lg">by {{ book.author }}</p>
    </section>

    <!-- Content -->
    <section class="max-w-5xl mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row gap-10 items-start">
        <!-- Cover -->
        <div class="flex-shrink-0 w-full md:w-1/3">
          <img
            src="https://picsum.photos/500/700"
            alt="Book Cover"
            class="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 space-y-6">
          <p class="text-lg leading-relaxed">
            {{ book.description }}
          </p>

          <div class="flex flex-wrap gap-4">
            <button
              v-if="!isBorrowed"
              type="button"
              @click="handleBorrow"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Borrow
            </button>
            <button
              v-else-if="isBorrowed && book.borrower_id !== auth.user.id"
              type="button"
              disabled
              class="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed opacity-70"
            >
              Borrowed
            </button>
            <button
              v-else-if="isBorrowed && book.borrower_id === auth.user.id"
              type="button"
              @click="handleReturn"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Return
            </button>
            <button
              v-if="!isBookmarked"
              type="button"
              @click="handleBookmark"
              class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Bookmark Book
            </button>
            <button
              v-else
              type="button"
              @click="handleUnbookmark"
              class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Unbookmark
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>
