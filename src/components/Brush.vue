<script setup>
import { motion } from 'motion-v'
</script>
<template>
  <svg class="brush" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
    <motion.path d="M10 62 C 180 8, 340 98, 600 48 S 1010 6, 1190 56" fill="none" stroke="#ffbf00" stroke-width="9" stroke-linecap="round" vector-effect="non-scaling-stroke"
      :initial="{ pathLength: 0 }" :whileInView="{ pathLength: 1 }" :viewport="{ once: true }" :transition="{ duration: 1.5, ease: 'easeInOut' }" />
  </svg>
</template>
