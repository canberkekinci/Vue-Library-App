<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import Navbar from "@/components/Navbar.vue";
import ShowBooks from "@/components/ShowBooks.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Top navbar -->
    <Navbar class="border-b border-gray-300" />

    <!-- Flex layout for sidebar + main -->
    <div class="flex">
      <AdminSidebar />
      <main class="flex-1 p-8">
        <ShowBooks />
      </main>
    </div>
  </div>
</template>
