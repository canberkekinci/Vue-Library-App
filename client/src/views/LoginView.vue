<script setup>
import { ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const username = ref("");
const password = ref("");

const toast = useToast();

const auth = useAuthStore();

const router = useRouter();
const route = useRoute();

const handleLogin = async () => {
  const body = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await axios.post("/auth/login", body);
    toast.success(response.data.message);
    auth.setUser(response.data.accessToken);

    const redirectPath = route.query.redirect || "/";
    router.push(redirectPath);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
</script>

<template>
  <Navbar />
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-blue-700">Welcome to CanLib</h1>
      <p class="text-gray-600 mt-2">Your digital library in Istanbul</p>
    </div>
    <div class="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
      <h2 class="text-2xl font-semibold text-center mb-6">
        Login To Your Account
      </h2>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            required
            type="text"
            v-model="username"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            required
            type="password"
            v-model="password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log in
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        Don't have an account?
        <RouterLink
          :to="{ name: 'register' }"
          class="text-blue-600 hover:underline"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </div>
  <Footer />
</template>
