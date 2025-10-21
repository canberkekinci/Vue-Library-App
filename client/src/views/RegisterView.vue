<script setup>
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();

const newUser = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const toast = useToast();

const handleRegister = async () => {
  if (newUser.password !== newUser.confirmPassword) {
    toast.error("Passwords must be same!");
    return;
  }
  const body = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
  };
  try {
    const res = await axios.post("/auth/register", body);
    toast.success(res.data.message);
    router.push({ name: "login" });
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
      <h2 class="text-2xl font-semibold text-center mb-6">Create an Account</h2>

      <form class="space-y-4" @submit.prevent="handleRegister">
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            required
            type="text"
            v-model="newUser.username"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            required
            type="email"
            v-model="newUser.email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            required
            type="password"
            v-model="newUser.password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            required
            type="password"
            v-model="newUser.confirmPassword"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="text-blue-600 hover:underline"
          >Log in</RouterLink
        >
      </p>
    </div>
  </div>
  <Footer />
</template>
