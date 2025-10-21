<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { reactive } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const book = reactive({
  title: "",
  author: "",
  genre: "",
  description: "",
  isFeatured: false,
});

const handleNewBook = async () => {
  const body = {
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    is_featured: book.isFeatured,
  };
  try {
    const res = await axios.post("/admin/books", body);
    toast.success(res.data.message);
    book.title = "";
    book.author = "";
    book.genre = "";
    book.description = "";
    book.isFeatured = false;
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
          <h1 class="text-3xl font-semibold mb-6 text-center">Add New Book</h1>

          <form class="space-y-5" @submit.prevent="handleNewBook">
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

            <div class="flex items-center">
              <input
                id="featured"
                type="checkbox"
                v-model="book.isFeatured"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label for="featured" class="ml-2 text-sm text-gray-700"
                >Mark as Featured</label
              >
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Add Book
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>
