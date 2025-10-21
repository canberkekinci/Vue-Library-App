<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Carousel from '@/components/Carousel.vue';
import Hero from '@/components/Hero.vue';
import FeaturedBooks from '@/components/FeaturedBooks.vue';
import Footer from '@/components/Footer.vue';

// onMounted(async () => {
//   try {
//     const res = await axios.get()
//   } catch (error) {
    
//   }
// })
</script>

<template>
  <Navbar />
  <Hero />
  <Carousel />
  <FeaturedBooks />
  <Footer />
</template>
