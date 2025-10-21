<script setup>
import Navbar from "@/components/Navbar.vue";
import AdminSidebar from "@/components/AdminSidebar.vue";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("/admin/users");
    users.value = res.data;
  } catch (error) {
    console.error(error);
  }
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Navbar -->
    <Navbar class="border-b border-gray-300" />

    <div class="flex">
      <AdminSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <div class="min-h-screen bg-gray-100 text-gray-800 p-8">
          <h1 class="text-3xl font-semibold mb-6">Users Management</h1>

          <!-- Users Table -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full table-auto">
              <thead
                class="bg-gray-200 text-gray-700 uppercase text-sm font-semibold"
              >
                <tr>
                  <th class="px-6 py-3 text-left">#</th>
                  <th class="px-6 py-3 text-left">Username</th>
                  <th class="px-6 py-3 text-left">Email</th>
                  <th class="px-6 py-3 text-left">Role</th>
                  <th class="px-6 py-3 text-left">Registered</th>
                  <th class="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <!-- Example Row -->
                <tr
                  v-for="user in users"
                  :key="user.id"
                  class="border-b hover:bg-gray-50"
                >
                  <td class="px-6 py-4">{{ user.id }}</td>
                  <td class="px-6 py-4">{{ user.username }}</td>
                  <td class="px-6 py-4">{{ user.email }}</td>
                  <td class="px-6 py-4">
                    <span
                      class="px-2 py-1 text-xs rounded-full"
                      :class="[
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700',
                      ]"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    {{ formatDate(user.created_at) || "—" }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <RouterLink
                      v-if="user.id !== 1"
                      :to="{ name: 'user', params: { id: user.id } }"
                      class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      Details
                    </RouterLink>
                    <button
                      v-else
                      disabled
                      class="px-3 py-1 bg-gray-300 text-gray-500 text-sm rounded cursor-not-allowed"
                    >
                      Details
                    </button>
                  </td>
                </tr>

                <!-- Example Static Fallback -->
                <tr v-if="!users || users.length === 0">
                  <td colspan="6" class="text-center py-6 text-gray-500">
                    No users found.
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
