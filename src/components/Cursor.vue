<script setup>
import { ref, onMounted } from 'vue'
import { motion } from 'motion-v'
const x = ref(-100), y = ref(-100), big = ref(false), show = ref(false)
let mag
onMounted(() => {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
  show.value = true; document.documentElement.classList.add('nocursor')
  addEventListener('mousemove', e => {
    x.value = e.clientX; y.value = e.clientY
    big.value = !!e.target.closest('a,button,input,select,textarea,label')
    const b = e.target.closest('.btn')
    if (mag && mag !== b) { mag.style.translate = ''; mag = null }
    if (b) { mag = b; const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.3}px` }
  })
})
</script>
<template>
  <motion.div v-if="show" class="cursor" :animate="{ x: x - 10, y: y - 10, scale: big ? 2.4 : 1 }" :transition="{ type: 'spring', stiffness: 520, damping: 34, mass: 0.4 }" />
</template>
