<script setup>
import { motion } from 'motion-v'
defineProps({ src: String, alt: String })
</script>
<template>
  <motion.div class="duo" :initial="{ clipPath: 'inset(0 0 100% 0)' }" :whileInView="{ clipPath: 'inset(0 0 0% 0)' }" :viewport="{ once: true, amount: 0.25 }" :transition="{ duration: 1, ease: [0.76, 0, 0.24, 1] }">
    <img :src="src" :alt="alt" loading="lazy" />
  </motion.div>
</template>
