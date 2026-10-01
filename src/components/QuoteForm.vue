<script setup>
import { reactive, ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { Send, ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { services } from '../data'
import Success from './Success.vue'
import { useForm } from '../composables/useForm'
const blank = () => ({ name: '', email: '', phone: '', service: services[0].title, budget: '', deadline: '', message: '' })
const f = reactive(blank()), step = ref(0), formEl = ref(null)
const { status, submit } = useForm('Demande de devis')
const titles = ['Votre besoin', 'Votre projet', 'Vos coordonnées']
const next = () => formEl.value.reportValidity() && step.value++
const go = () => submit({ ...f }, () => { Object.assign(f, blank()); step.value = 0 })
</script>
<template>
  <form ref="formEl" @submit.prevent="go">
    <div class="steps" aria-hidden="true"><div v-for="(t, i) in titles" :key="t"><motion.b :animate="{ width: i <= step ? '100%' : '0%' }" :transition="{ duration: 0.5 }" /><span>{{ t }}</span></div></div>
    <AnimatePresence mode="wait">
      <motion.div :key="step" class="stepbody" :initial="{ opacity: 0, x: 40 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -40 }" :transition="{ duration: 0.3 }">
        <div v-if="step === 0" class="chips">
          <button v-for="s in services" :key="s.id" type="button" class="chip" :class="{ on: f.service === s.title }" @click="f.service = s.title"><component :is="s.icon" :size="16" />{{ s.title }}</button>
        </div>
        <template v-else-if="step === 1">
          <div class="row">
            <label class="fl"><input v-model="f.budget" placeholder=" " /><span>Budget estimé (FCFA)</span></label>
            <label class="fl"><input v-model="f.deadline" placeholder=" " /><span>Délai souhaité</span></label>
          </div>
          <label class="fl"><textarea v-model="f.message" required placeholder=" "></textarea><span>Décrivez votre projet</span></label>
        </template>
        <template v-else>
          <div class="row">
            <label class="fl"><input v-model="f.name" required placeholder=" " autocomplete="name" /><span>Nom</span></label>
            <label class="fl"><input v-model="f.email" type="email" required placeholder=" " autocomplete="email" /><span>E-mail</span></label>
          </div>
          <label class="fl"><input v-model="f.phone" type="tel" placeholder=" " autocomplete="tel" /><span>Téléphone</span></label>
        </template>
      </motion.div>
    </AnimatePresence>
    <div class="nav2">
      <button v-if="step" type="button" class="btn ghost" @click="step--"><ArrowLeft :size="17" /> Retour</button>
      <button v-if="step < 2" type="button" class="btn" @click="next">Continuer <ArrowRight :size="17" /></button>
      <button v-else class="btn" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Envoi en cours' : 'Recevoir mon devis' }} <Send :size="17" /></button>
    </div>
    <Success v-if="status === 'ok'" text="Demande envoyée. Nous vous répondons sous 24 h." />
    <motion.p v-if="status === 'error'" class="msg error" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">Envoi impossible. Vérifiez votre connexion ou la configuration EmailJS.</motion.p>
  </form>
</template>
