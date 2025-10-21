<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <aside class="w-64 bg-white shadow-lg">
    <div class="p-6 text-2xl font-bold border-b border-gray-200">
      Admin Panel
    </div>
    <nav class="mt-4 flex flex-col space-y-2">
      <RouterLink
        :to="{ name: 'new-book' }"
        class="text-left px-5 py-2 hover:bg-gray-100 transition font-medium"
      >
        New Book
      </RouterLink>
      <RouterLink
        :to="{ name: 'update-books' }"
        class="text-left px-5 py-2 hover:bg-gray-100 transition font-medium"
      >
        Update Book
      </RouterLink>
      <RouterLink
        :to="{ name: 'delete-book' }"
        class="text-left px-5 py-2 hover:bg-gray-100 transition font-medium"
      >
        Delete Book
      </RouterLink>
      <RouterLink
        :to="{ name: 'book-features' }"
        class="text-left px-5 py-2 hover:bg-gray-100 transition font-medium"
      >
        Featured Books
      </RouterLink>
      <RouterLink
        :to="{ name: 'book-borrows' }"
        class="text-left px-5 py-2 hover:bg-gray-100 transition font-medium"
      >
        Borrows
      </RouterLink>
      <RouterLink
        :to="{ name: 'users' }"
        class="text-left px-5 py-2 hover:bg-gray-100 transition font-medium"
      >
        Users
      </RouterLink>
    </nav>
  </aside>
</template>
