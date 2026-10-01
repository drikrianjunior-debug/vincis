<script setup>
import { motion } from 'motion-v'
defineProps({ text: String })
const dots = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, d = 46 + (i % 3) * 18; return { x: Math.cos(a) * d, y: Math.sin(a) * d } })
</script>
<template>
  <div class="okbox" role="status">
    <div class="burst">
      <svg viewBox="0 0 52 52" width="52" height="52" fill="none" stroke="#ffbf00" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <motion.circle cx="26" cy="26" r="23" :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }" :transition="{ duration: 0.6 }" />
        <motion.path d="M15 27l8 8 14-16" :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }" :transition="{ duration: 0.4, delay: 0.5 }" />
      </svg>
      <motion.i v-for="(d, i) in dots" :key="i" class="dot" :initial="{ x: 0, y: 0, opacity: 1, scale: 1 }" :animate="{ x: d.x, y: d.y, opacity: 0, scale: 0 }" :transition="{ duration: 0.9, delay: 0.5 }" />
    </div>
    <p class="msg ok">{{ text }}</p>
  </div>
</template>
