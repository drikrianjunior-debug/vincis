<script setup>
import { ref, onMounted } from 'vue'
import Lenis from 'lenis'
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform } from 'motion-v'
import { ArrowRight } from 'lucide-vue-next'
import { services } from './data'
import SideNav from './components/SideNav.vue'
import Reveal from './components/Reveal.vue'
import Cursor from './components/Cursor.vue'
import Brush from './components/Brush.vue'
import ImgReveal from './components/ImgReveal.vue'
import Works from './components/Works.vue'
import QuoteForm from './components/QuoteForm.vue'
import PlanForm from './components/PlanForm.vue'
import ContactForm from './components/ContactForm.vue'

const loading = ref(true), progress = ref(0)
const title = 'Des idées. Du code. Un impact.'.split(' ')
const marquee = ['Sites web', 'Applications mobiles', 'Identité visuelle', 'Réseaux sociaux', 'Vidéo & flyers']
const { scrollY, scrollYProgress } = useScroll()
const wmY = useTransform(scrollY, [0, 900], [0, -180])
const glow = e => { const el = e.currentTarget, r = el.getBoundingClientRect(); el.style.setProperty('--mx', e.clientX - r.left + 'px'); el.style.setProperty('--my', e.clientY - r.top + 'px') }

onMounted(() => {
  let lenis
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ anchors: true }); lenis.stop()
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }; requestAnimationFrame(raf)
  }
  document.body.style.overflow = 'hidden'
  const t = setInterval(() => {
    progress.value = Math.min(100, progress.value + Math.ceil(Math.random() * 7))
    if (progress.value >= 100) { clearInterval(t); setTimeout(() => { loading.value = false; document.body.style.overflow = ''; lenis?.start() }, 450) }
  }, 60)
})
</script>

<template>
  <MotionConfig reducedMotion="user">
    <motion.div class="progress" :style="{ scaleX: scrollYProgress }" />
    <Cursor />

    <AnimatePresence>
      <motion.div v-if="loading" key="pre" class="pre" :exit="{ y: '-100%' }" :transition="{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }">
        <div class="box">
          <motion.img src="/img/logo-dark.png" alt="Vinci" width="130" :initial="{ clipPath: 'inset(0 100% 0 0)' }" :animate="{ clipPath: 'inset(0 0% 0 0)' }" :transition="{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }" />
          <div class="bar"><motion.div :animate="{ width: progress + '%' }" :transition="{ ease: 'linear', duration: 0.1 }" /></div>
          <span class="n">{{ progress }}%</span>
        </div>
      </motion.div>
    </AnimatePresence>

    <SideNav />
    <main>
      <section id="accueil" class="hero" @mousemove="glow">
        <motion.img class="wm" src="/img/logo-dark.png" alt="" aria-hidden="true" :style="{ y: wmY }" />
        <div>
          <h1 class="words">
            <motion.span v-for="(w, i) in title" :key="i" :initial="{ y: '110%' }" :animate="loading ? {} : { y: 0 }" :transition="{ duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }">{{ w }}</motion.span>
          </h1>
          <motion.p class="lead" style="margin-top:24px" :initial="{ opacity: 0 }" :animate="loading ? {} : { opacity: 1 }" :transition="{ delay: 0.8 }">
            Vinci est une agence de développement web et mobile. Nous créons aussi votre identité, vos contenus et animons vos réseaux.
          </motion.p>
          <motion.div class="cta" :initial="{ opacity: 0, y: 20 }" :animate="loading ? {} : { opacity: 1, y: 0 }" :transition="{ delay: 1 }">
            <a class="btn" href="#devis">Demander un devis <ArrowRight :size="18" /></a>
            <a class="btn ghost" href="#services">Voir nos services</a>
          </motion.div>
        </div>
        <motion.div style="position:relative" :initial="{ opacity: 0, scale: 0.92 }" :animate="loading ? {} : { opacity: 1, scale: 1 }" :transition="{ duration: 1, delay: 0.4 }">
          <div class="frame"><img src="/img/team.jpg" alt="L'équipe Vinci au travail" /></div>
          <motion.div class="badge" :animate="{ y: [0, -10, 0] }" :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }">Web · Mobile · Marque<small>Une seule équipe</small></motion.div>
        </motion.div>
      </section>

      <div class="marquee" aria-hidden="true">
        <div class="track"><template v-for="n in 2" :key="n"><span v-for="m in marquee" :key="m + n">{{ m }}<i></i></span></template></div>
      </div>

      <section id="services">
        <Reveal><h2>Ce que nous faisons</h2><p class="lead">Cinq services, une même exigence de qualité.</p></Reveal>
        <div class="stack">
          <div v-for="(s, i) in services" :key="s.id" class="card stk" :style="{ top: 96 + i * 22 + 'px' }">
            <component :is="s.icon" :size="36" /><div><h3>{{ s.title }}</h3><p>{{ s.text }}</p></div>
          </div>
        </div>
        <div class="show">
          <ImgReveal class="big" src="/img/deal.jpg" alt="Poignée de main avec un client" />
          <ImgReveal src="/img/trio.jpg" alt="Trois membres de l'équipe" />
          <ImgReveal src="/img/duo.jpg" alt="Deux membres de Vinci" />
        </div>
      </section>

      <Brush />
      <Works />

      <section id="devis" class="formwrap">
        <Reveal><h2>Parlons de votre projet</h2><p class="lead">Trois étapes rapides, puis nous revenons vers vous avec un devis détaillé.</p></Reveal>
        <Reveal :delay="0.1"><QuoteForm /></Reveal>
      </section>

      <section id="abonnements" class="formwrap">
        <Reveal><h2>Un accompagnement continu</h2><p class="lead">Choisissez les services dont vous avez besoin chaque mois et la formule qui convient.</p></Reveal>
        <Reveal :delay="0.1"><PlanForm /></Reveal>
      </section>

      <Brush />
      <section id="contact" class="formwrap">
        <Reveal><h2>Une question ?</h2><p class="lead">Écrivez-nous, nous répondons vite.</p></Reveal>
        <Reveal :delay="0.1"><ContactForm /></Reveal>
      </section>
    </main>

    <footer>
      <span><img class="t-dark" src="/img/wordmark-white.png" alt="Vinci" /><img class="t-light" src="/img/wordmark-black.png" alt="Vinci" /></span>
      <span>© {{ new Date().getFullYear() }} Vinci. Tous droits réservés.</span>
    </footer>
  </MotionConfig>
</template>
