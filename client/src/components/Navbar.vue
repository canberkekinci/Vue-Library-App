<script setup>
import { useAuthStore } from "@/stores/auth";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
import isAdmin from "@/isAdmin";

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const handleLogout = async () => {
  try {
    await axios.post("/auth/logout");
    auth.clearUser();
    toast.success("Logged out successfully.");
    router.push({ name: "home" });
  } catch (error) {
    toast.error("Error logging out.");
  }
};
</script>

<template>
  <!-- Navbar Template -->
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left section -->
        <div class="flex items-center">
          <RouterLink
            :to="{ name: 'home' }"
            class="text-xl font-semibold text-gray-800"
            >CanLib</RouterLink
          >
        </div>

        <!-- Center section (optional links) -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink
            :to="{ name: 'home' }"
            class="text-gray-600 hover:text-gray-900 font-medium"
            >Home</RouterLink
          >
          <RouterLink
            :to="{ name: 'about' }"
            class="text-gray-600 hover:text-gray-900 font-medium"
            >About</RouterLink
          >
          <RouterLink
            :to="{ name: 'books' }"
            class="text-gray-600 hover:text-gray-900 font-medium"
            >Books</RouterLink
          >
          <RouterLink
            :to="{ name: 'bookmarks'}"
            class="text-gray-600 hover:text-gray-900 font-medium"
            v-if="!!auth.user"
          >Bookmarks</RouterLink>
          <RouterLink
            :to="{ name: 'contact' }"
            class="text-gray-600 hover:text-gray-900 font-medium"
            >Contact</RouterLink
          >
          <RouterLink
            v-if="auth.user && isAdmin()"
            :to="{ name: 'admin' }"
            class="text-gray-600 hover:text-gray-900 font-medium"
            >Admin</RouterLink
          >
          <!-- <RouterLink
            v-if="!!auth.user"
            :to="{ name: 'books' }"
            class="text-gray-600 hover:text-gray-900 font-medium"
            >Books</RouterLink
          > -->
        </div>

        <!-- Right section (buttons) -->
        <div class="flex items-center space-x-4" v-if="!auth.user">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            @click="router.push({ name: 'login' })"
          >
            Login
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            @click="router.push({ name: 'register' })"
          >
            Sign Up
          </button>
        </div>
        <div class="flex items-center space-x-4" v-else>
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
