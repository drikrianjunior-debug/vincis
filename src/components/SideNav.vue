<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { motion } from 'motion-v'
import { Sun, Moon, Home, Layers, Briefcase, FileText, Repeat, Mail } from 'lucide-vue-next'
const items = [
  { id: 'accueil', label: 'Accueil', icon: Home }, { id: 'services', label: 'Services', icon: Layers },
  { id: 'realisations', label: 'Réalisations', icon: Briefcase }, { id: 'devis', label: 'Demander un devis', icon: FileText }, { id: 'abonnements', label: 'Abonnements', icon: Repeat },
  { id: 'contact', label: 'Contact', icon: Mail }
]
const dark = ref(document.documentElement.dataset.theme !== 'light')
const toggle = () => { dark.value = !dark.value; const t = dark.value ? 'dark' : 'light'; document.documentElement.dataset.theme = t; localStorage.setItem('vinci-theme', t) }
const active = ref('accueil'); let io
onMounted(() => {
  io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (active.value = e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
  items.forEach(i => { const el = document.getElementById(i.id); el && io.observe(el) })
})
onBeforeUnmount(() => io?.disconnect())
</script>
<template>
  <nav class="side" aria-label="Navigation principale">
    <span class="logo"><img class="t-dark" src="/img/logo-dark.png" alt="Vinci" /><img class="t-light" src="/img/logo-light.png" alt="" /></span>
    <ul>
      <li v-for="i in items" :key="i.id">
        <a :href="'#' + i.id" :class="{ on: active === i.id }" :aria-label="i.label"><motion.span v-if="active === i.id" layoutId="pill" class="pill" :transition="{ type: 'spring', stiffness: 380, damping: 32 }" /><component :is="i.icon" :size="21" /><span>{{ i.label }}</span></a>
      </li>
    </ul>
    <button class="themebtn" type="button" :aria-label="dark ? 'Passer en mode clair' : 'Passer en mode sombre'" @click="toggle"><Sun v-if="dark" :size="20" /><Moon v-else :size="20" /></button>
  </nav>
</template>
