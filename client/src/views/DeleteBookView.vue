<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const books = ref([]);

const toast = useToast();

onMounted(async () => {
  try {
    const res = await axios.get("/books/with-borrows");
    books.value = res.data;
  } catch (error) {
    console.error(error);
  }
});

const showStatus = (borrower_id) => {
  return borrower_id === null || borrower_id === undefined
    ? "Available"
    : "Borrowed";
};

const handleDelete = async (bookId) => {
    const sure = confirm("Are you sure deleting this book?");
    if (!sure) {
        return;
    }
    try {
        const res = await axios.delete(`/admin/books/${bookId}`);
        toast.success(res.data.message);
        books.value = books.value.filter(book => book.id !== bookId);
    } catch (error) {
        toast.error(error.response.data.error);
    }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Top navbar -->
    <Navbar class="border-b border-gray-300" />

    <!-- Flex layout for sidebar + main -->
    <div class="flex">
      <AdminSidebar />
      <main class="flex-1 p-8">
        <div class="min-h-screen bg-gray-100 text-gray-800 p-8">
          <h1 class="text-3xl font-semibold mb-6">Books Management</h1>

          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full table-auto">
              <thead
                class="bg-gray-200 text-gray-700 uppercase text-sm font-semibold"
              >
                <tr>
                  <th class="px-6 py-3 text-left">#</th>
                  <th class="px-6 py-3 text-left">Title</th>
                  <th class="px-6 py-3 text-left">Author</th>
                  <th class="px-6 py-3 text-left">Genre</th>
                  <th class="px-6 py-3 text-left">Status</th>
                  <th class="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <tr v-for="book in books" class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4">{{ book.id }}</td>
                  <td class="px-6 py-4">{{ book.title }}</td>
                  <td class="px-6 py-4">{{ book.author }}</td>
                  <td class="px-6 py-4">{{ book.genre }}</td>
                  <td class="px-6 py-4">
                    <span
                      class="px-2 py-1 text-xs rounded-full"
                      :class="[
                        book.borrower_id === null ||
                        book.borrower_id === undefined
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700',
                      ]"
                    >
                      {{ showStatus(book.borrower_id) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center space-x-2">
                    <button
                      @click="handleDelete(book.id)"
                      class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
