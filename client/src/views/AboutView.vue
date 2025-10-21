<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <Navbar />
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <section class="bg-blue-700 text-white py-16 text-center">
      <h1 class="text-4xl font-bold mb-3">About CanLib</h1>
      <p class="text-blue-100 max-w-2xl mx-auto">
        Your trusted digital library — connecting readers, learners, and
        knowledge in Istanbul, Turkey.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
      <p class="text-gray-700 leading-relaxed">
        At <strong>CanLib</strong>, we believe that knowledge should be
        accessible to everyone. Our goal is to provide a modern, user-friendly
        platform where readers can explore books, journals, and digital
        resources effortlessly.
      </p>
    </section>

    <!-- History Section -->
    <section class="bg-white py-16">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
        <p class="text-gray-700 leading-relaxed">
          Founded in Istanbul, Turkey, CanLib started as a local community
          project aiming to digitize the city’s independent libraries. Over
          time, it has grown into a digital hub where readers can borrow,
          explore, and manage their favorite titles online.
        </p>
      </div>
    </section>

    <!-- Values Section -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <h2 class="text-2xl font-semibold mb-8 text-gray-800">Our Values</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">Accessibility</h3>
          <p class="text-gray-600 text-sm">
            We strive to make reading materials available to everyone,
            everywhere.
          </p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">Innovation</h3>
          <p class="text-gray-600 text-sm">
            Combining technology with reading culture to enhance the library
            experience.
          </p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">Community</h3>
          <p class="text-gray-600 text-sm">
            We support local readers, authors, and institutions through
            collaboration and shared growth.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-blue-700 text-white py-16 text-center">
      <h2 class="text-2xl font-semibold mb-4">Get in Touch</h2>
      <p class="max-w-2xl mx-auto mb-6 text-blue-100">
        Have questions, suggestions, or partnership ideas?  
        Reach out — we’d love to hear from you.
      </p>
      <p>📍 Istanbul, Turkey</p>
      <p>📧 contact@canlib.com</p>
    </section>
  </div>
  <Footer />
</template>
