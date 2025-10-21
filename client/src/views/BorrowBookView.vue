<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();

const book = ref({});

const newBorrower = ref("");

onMounted(async () => {
  const bookId = route.params.id;
  try {
    const res = await axios.get(`/books/with-borrows/${bookId}`);
    book.value = res.data;
  } catch (error) {
    console.error(error);
  }
});

const toast = useToast();

const handleBorrowBook = async () => {
  const bookId = route.params.id;
  const body = {
    username: newBorrower.value,
  };
  try {
    const res = await axios.put(`/admin/borrow/${bookId}`, body);
    toast.success(res.data.message);
    router.push({ name: "book-borrows" });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

const handleReturnBook = async () => {
  const bookId = route.params.id;
  const body = {
    id: book.value.borrower_id,
  };
  try {
    const res = await axios.put(`/admin/return/${bookId}`, body);
    toast.success(res.data.message);
    router.push({ name: "book-borrows" });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <Navbar class="border-b border-gray-300" />

    <div class="flex">
      <AdminSidebar />

      <main class="flex-1 p-8">
        <div class="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 class="text-3xl font-semibold mb-6 text-center">
            Change Borrower
          </h1>

          <!-- Book Info -->
          <div class="mb-8 border rounded-lg p-4 bg-gray-50">
            <h2 class="text-lg font-medium mb-2 text-gray-800">
              Book Information
            </h2>
            <div class="space-y-2 text-sm text-gray-700">
              <p>
                <span class="font-semibold">ID:</span> {{ book.id || "..." }}
              </p>
              <p>
                <span class="font-semibold">Title:</span>
                {{ book.title || "..." }}
              </p>
              <p>
                <span class="font-semibold">Author:</span>
                {{ book.author || "..." }}
              </p>
              <p>
                <span class="font-semibold">Genre:</span>
                {{ book.genre || "..." }}
              </p>
              <p>
                <span class="font-semibold">Current Borrower Id:</span>
                {{ book.borrower_id || "None" }}
              </p>
            </div>
          </div>

          <!-- Change Borrower -->
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Assign to New Borrower
              </label>
              <input
                v-model="newBorrower"
                type="text"
                placeholder="Enter borrower's nickname"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-500 mt-1">
                Type a valid user's nickname to assign this book.
              </p>
            </div>

            <!-- Centered Buttons -->
            <div class="flex justify-center space-x-3">
              <RouterLink
                :to="{ name: 'book-borrows' }"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </RouterLink>
              <button
                @click="handleBorrowBook"
                type="button"
                class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Save Borrower
              </button>
            </div>
          </form>

          <div class="my-8 border-t border-gray-200"></div>

          <!-- Return Book -->
          <div class="text-center">
            <h2 class="text-lg font-medium mb-3 text-gray-800">Return Book</h2>
            <p class="text-sm text-gray-600 mb-4">
              If this book is currently borrowed, mark it as returned here.
            </p>
            <button
              @click="handleReturnBook"
              type="button"
              class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              Mark as Returned
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
