<script setup>
import { ref, reactive, onMounted } from 'vue'
import QRCode from 'qrcode'
import { ArrowUpRight, RotateCw } from 'lucide-vue-next'
import { works } from '../data'
import Reveal from './Reveal.vue'
const qr = ref({}), flipped = reactive({})
onMounted(async () => {
  for (const w of works) qr.value[w.url] = await QRCode.toDataURL(w.url, { margin: 0, width: 280, color: { dark: '#000000', light: '#ffffff' } })
})
const tilt = e => { const el = e.currentTarget, r = el.getBoundingClientRect()
  el.style.transform = `perspective(900px) rotateX(${(-(e.clientY - r.top) / r.height + 0.5) * 9}deg) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 11}deg)` }
const reset = e => (e.currentTarget.style.transform = '')
const host = w => w.tag || w.url.replace('https://', '').replace(/\/$/, '')
</script>
<template>
  <section id="realisations">
    <Reveal><h2>Nos réalisations</h2><p class="lead">Des projets en ligne. Retournez une carte pour scanner le code QR ou visitez le site.</p></Reveal>
    <div class="works">
      <Reveal v-for="(w, i) in works" :key="w.url" :delay="i * 0.08">
        <div class="w3d" @mousemove="tilt" @mouseleave="reset">
          <div class="inner" :class="{ f: flipped[w.url] }">
            <div class="face front">
              <img :src="w.image" :alt="'Aperçu du site ' + w.name" loading="lazy" />
              <div class="cap"><div><h3>{{ w.name }}</h3><small>{{ host(w) }}</small></div></div>
            </div>
            <div class="face back">
              <div class="qr"><img v-if="qr[w.url]" :src="qr[w.url]" :alt="'Code QR vers ' + w.name" /></div>
              <h3>{{ w.name }}</h3>
              <a class="btn" :href="w.url" target="_blank" rel="noopener">Visiter le site <ArrowUpRight :size="17" /></a>
            </div>
          </div>
          <button class="flipbtn" type="button" :aria-label="'Retourner la carte ' + w.name" @click="flipped[w.url] = !flipped[w.url]"><RotateCw :size="18" /></button>
        </div>
      </Reveal>
    </div>
  </section>
</template>
