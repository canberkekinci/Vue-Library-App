<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar class="border-b border-gray-300" />  
  <div class="min-h-screen flex bg-gray-100 text-gray-800">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-6">Hello, Admin 👋</h1>

      <div class="bg-white p-6 rounded-xl shadow text-gray-600">
        <p>Select an option from the sidebar to manage your library.</p>
      </div>
    </main>
  </div>
</template>
