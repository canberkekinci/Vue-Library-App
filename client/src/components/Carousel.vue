<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const images = [
  "https://picsum.photos/id/1018/900/400",
  "https://picsum.photos/id/1015/900/400",
  "https://picsum.photos/id/1016/900/400",
];

const current = ref(0);
let intervalId = null;

const next = () => {
  current.value = (current.value + 1) % images.length;
};

const prev = () => {
  current.value = (current.value - 1 + images.length) % images.length;
};

// otomatik geçiş başlat
onMounted(() => {
  intervalId = setInterval(() => {
    next();
  }, 4000); // 4 saniyede bir slide değişir
});

// component kapanınca temizle
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div
    class="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg shadow-lg"
  >
    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div v-for="(img, i) in images" :key="i" class="min-w-full">
        <img
          :src="img"
          alt="slide image"
          class="w-full h-64 md:h-96 object-cover"
        />
      </div>
    </div>

    <!-- Prev button -->
    <button
      @click="prev"
      class="absolute top-1/2 left-3 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800 text-white p-3 rounded-full focus:outline-none"
    >
      ‹
    </button>

    <!-- Next button -->
    <button
      @click="next"
      class="absolute top-1/2 right-3 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800 text-white p-3 rounded-full focus:outline-none"
    >
      ›
    </button>

    <!-- Indicators -->
    <div
      class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(img, i) in images"
        :key="i"
        @click="current = i"
        class="w-3 h-3 rounded-full"
        :class="i === current ? 'bg-white' : 'bg-gray-400/70'"
      ></button>
    </div>
  </div>
</template>
