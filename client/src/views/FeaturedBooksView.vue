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
    const res = await axios.get("/books/with-featured");
    books.value = res.data;
  } catch (error) {
    console.error(error);
  }
});

const showStatus = (is_featured) => {
  return is_featured ? "Featured" : "Not Featured";
};

const handleSwitch = async (bookId) => {
  const book = books.value.find((book) => book.id === bookId);
  book.is_featured = !book.is_featured;
  try {
    const res = await axios.put(`/admin/switch-featured/${bookId}`, {
      is_featured: book.is_featured,
    });
    toast.success(res.data.message || "Book updated successfully.");
  } catch (error) {
    book.is_featured = !book.is_featured;
    console.error(error);
    toast.error(
      error.response?.data?.error || "Error updating featured status."
    );
  }
};
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
                  <th class="px-6 py-3 text-center">Featured</th>
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
                        book.is_featured
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700',
                      ]"
                    >
                      {{ showStatus(book.is_featured) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="relative inline-block w-11 h-5">
                      <input
                        @change="handleSwitch(book.id)"
                        :checked="book.is_featured"
                        :id="`switch-${book.id}`"
                        type="checkbox"
                        class="peer appearance-none w-11 h-5 bg-slate-200 rounded-full checked:bg-purple-700 cursor-pointer transition-colors duration-300"
                      />
                      <label
                        :for="`switch-${book.id}`"
                        class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                      ></label>
                    </div>
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
