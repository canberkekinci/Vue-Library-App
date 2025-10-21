<script setup>
import Navbar from "@/components/Navbar.vue";
import AdminSidebar from "@/components/AdminSidebar.vue";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();

const user = ref({});
const userUpdate = ref({});

onMounted(async () => {
  const userId = route.params.id;
  try {
    const res = await axios.get(`/admin/users/${userId}`);
    user.value = res.data;
    userUpdate.value = structuredClone(res.data);
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

const toast = useToast();

const handleUpdateUser = async () => {
  const sure = confirm("Are you sure updating this user?");
  if (!sure) {
    return;
  }
  const userId = route.params.id;
  const body = {
    email: userUpdate.value.email,
    role: userUpdate.value.role,
  };
  try {
    const res = await axios.put(`/admin/users/${userId}`, body);
    toast.success(res.data.message);
    router.push({ name: "users" });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

const handleDeleteUser = async () => {
  const sure = confirm("Are you sure deleting this user?");
  if (!sure) {
    return;
  }
  const userId = route.params.id;
  try {
    const res = await axios.delete(`/admin/users/${userId}`);
    toast.success(res.data.message);
    router.push({ name: "users" });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
    <!-- Navbar -->
    <Navbar class="border-b border-gray-300" />

    <!-- Flex Layout -->
    <div class="flex flex-1 min-h-0">
      <!-- Sidebar -->
      <div class="min-h-full bg-white shadow-md">
        <AdminSidebar class="h-full" />
      </div>

      <!-- Main Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <div class="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 class="text-3xl font-semibold mb-6 text-center">User Details</h1>

          <!-- User Info Card -->
          <div class="mb-8 border rounded-lg p-4 bg-gray-50">
            <h2 class="text-lg font-medium mb-2 text-gray-800">
              User Information
            </h2>
            <div class="space-y-2 text-sm text-gray-700">
              <p><span class="font-semibold">ID:</span> {{ user.id }}</p>
              <p>
                <span class="font-semibold">Username:</span> {{ user.username }}
              </p>
              <p><span class="font-semibold">Email:</span> {{ user.email }}</p>
              <p>
                <span class="font-semibold">Role:</span>
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
              </p>
              <p>
                <span class="font-semibold">Registered:</span>
                {{ formatDate(user.created_at) }}
              </p>
            </div>
          </div>

          <!-- Update User Form -->
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                type="email"
                v-model="userUpdate.email"
                placeholder="Enter new email"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Role</label
              >
              <select
                v-model="userUpdate.role"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <!-- Centered Action Buttons -->
            <div class="flex justify-center space-x-3">
              <RouterLink
                :to="{ name: 'users' }"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </RouterLink>
              <button
                @click="handleUpdateUser"
                type="button"
                class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Update User
              </button>
              <button
                @click="handleDeleteUser"
                type="button"
                class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Delete User
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>
