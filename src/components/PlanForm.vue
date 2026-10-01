<script setup>
import { reactive } from 'vue'
import { motion } from 'motion-v'
import { Check } from 'lucide-vue-next'
import { services } from '../data'
import Success from './Success.vue'
import { useForm } from '../composables/useForm'
const plans = [
  { id: 'Essentiel', text: 'Le socle pour démarrer' },
  { id: 'Pro', text: 'Suivi renforcé, plus de volume' },
  { id: 'Premium', text: 'Accompagnement prioritaire' }
]
const blank = () => ({ name: '', email: '', phone: '', services: [], plan: 'Pro', billing: 'Mensuel' })
const f = reactive(blank()); const { status, submit } = useForm('Abonnement')
const toggle = t => { const i = f.services.indexOf(t); i < 0 ? f.services.push(t) : f.services.splice(i, 1) }
const go = () => {
  if (!f.services.length) return (status.value = 'error')
  submit({ ...f, services: f.services.join(', '), message: `Formule ${f.plan}, facturation ${f.billing}` }, () => Object.assign(f, blank()))
}
</script>
<template>
  <form @submit.prevent="go">
    <label>Services à inclure
      <div class="chips">
        <button v-for="s in services" :key="s.id" type="button" class="chip" :class="{ on: f.services.includes(s.title) }" @click="toggle(s.title)">
          <Check v-if="f.services.includes(s.title)" :size="15" /> {{ s.title }}
        </button>
      </div>
    </label>
    <label>Formule
      <div class="plans">
        <button v-for="p in plans" :key="p.id" type="button" class="plan" :class="{ on: f.plan === p.id }" @click="f.plan = p.id">
          <b>{{ p.id }}</b><small>{{ p.text }}</small>
        </button>
      </div>
    </label>
    <div class="row">
      <label>Facturation<select v-model="f.billing"><option>Mensuel</option><option>Trimestriel</option><option>Annuel</option></select></label>
      <label class="fl"><input v-model="f.phone" type="tel" placeholder=" " /><span>Téléphone</span></label>
    </div>
    <div class="row">
      <label class="fl"><input v-model="f.name" required placeholder=" " /><span>Nom</span></label>
      <label class="fl"><input v-model="f.email" type="email" required placeholder=" " /><span>E-mail</span></label>
    </div>
    <motion.button class="btn" type="submit" :disabled="status === 'sending'" :whileHover="{ scale: 1.03 }" :whileTap="{ scale: 0.97 }">
      {{ status === 'sending' ? 'Envoi en cours' : "Je m'abonne" }}
    </motion.button>
    <Success v-if="status === 'ok'" text="Demande reçue. Nous confirmons votre tarif par e-mail." />
    <motion.p v-if="status === 'error'" class="msg error" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">Choisissez au moins un service, puis réessayez.</motion.p>
  </form>
</template>
