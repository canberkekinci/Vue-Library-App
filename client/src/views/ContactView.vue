<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <Navbar />
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <section class="bg-blue-700 text-white py-16 text-center">
      <h1 class="text-4xl font-bold mb-3">Contact Us</h1>
      <p class="text-blue-100 max-w-2xl mx-auto">
        We’re here to help! Reach out to CanLib for any inquiries, support, or
        collaboration opportunities.
      </p>
    </section>

    <!-- Contact Info -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Get in Touch</h2>
        <p class="text-gray-700 mb-6">
          Whether you’re looking for book recommendations, technical support,
          or partnership details — our team is ready to assist you.
        </p>

        <ul class="space-y-3 text-gray-700">
          <li>
            📍 <strong>Address:</strong> Istanbul, Turkey
          </li>
          <li>
            📞 <strong>Phone:</strong> +90 (212) 123 45 67
          </li>
          <li>
            📧 <strong>Email:</strong> contact@canlib.com
          </li>
          <li>
            🕒 <strong>Hours:</strong> Mon–Fri 9:00 – 18:00
          </li>
        </ul>
      </div>

      <!-- Contact Form -->
      <div class="bg-white shadow-md rounded-lg p-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">
          Send Us a Message
        </h2>
        <form @submit.prevent>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Full Name</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Subject</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Message subject"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-600 mb-2">Message</label>
            <textarea
              rows="5"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>

    <!-- Map / Footer Section -->
    <section class="bg-blue-700 text-white text-center py-12">
      <p class="text-lg mb-3">📍 CanLib — Istanbul, Turkey</p>
      <p class="text-blue-100">We’d love to hear from you soon!</p>
    </section>
  </div>
  <Footer />
</template>
