<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const toast = useToast();

const book = ref({});

onMounted(async () => {
  const bookId = route.params.id;
  try {
    const res = await axios.get(`books/${bookId}`);
    book.value = res.data;
  } catch (error) {
    console.error(error);
  }
});

const handleUpdateBook = async () => {
  const bookId = route.params.id;
  const body = {
    title: book.value.title,
    author: book.value.author,
    genre: book.value.genre,
    description: book.value.description,
  };
  try {
    const res = await axios.put(`/admin/books/${bookId}`, body);
    toast.success(res.data.message);
    router.push({ name: "update-books" });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 text-gray-800">
    <!-- Navbar -->
    <Navbar class="border-b border-gray-300" />

    <!-- Sidebar + Main -->
    <div class="flex flex-1">
      <AdminSidebar />

      <!-- Main Content -->
      <main class="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
          <h1 class="text-3xl font-semibold mb-6 text-center">Update Book</h1>

          <form class="space-y-5" @submit.prevent="handleUpdateBook">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Title</label
              >
              <input
                required
                type="text"
                v-model="book.title"
                placeholder="Enter book title"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Author</label
              >
              <input
                required
                type="text"
                v-model="book.author"
                placeholder="Enter author name"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Genre</label
              >
              <input
                required
                type="text"
                v-model="book.genre"
                placeholder="Enter genre"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Description</label
              >
              <textarea
                required
                rows="4"
                v-model="book.description"
                placeholder="Enter short description"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Update Book
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>
