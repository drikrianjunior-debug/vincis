<script setup>
import { reactive } from 'vue'
import { motion } from 'motion-v'
import { Send } from 'lucide-vue-next'
import Success from './Success.vue'
import { useForm } from '../composables/useForm'
const f = reactive({ name: '', email: '', message: '' }); const { status, submit } = useForm('Contact')
const go = () => submit({ ...f }, () => Object.assign(f, { name: '', email: '', message: '' }))
</script>
<template>
  <form @submit.prevent="go">
    <div class="row">
      <label class="fl"><input v-model="f.name" required placeholder=" " /><span>Nom</span></label>
      <label class="fl"><input v-model="f.email" type="email" required placeholder=" " /><span>E-mail</span></label>
    </div>
    <label class="fl"><textarea v-model="f.message" required placeholder=" "></textarea><span>Message</span></label>
    <motion.button class="btn" type="submit" :disabled="status === 'sending'" :whileHover="{ scale: 1.03 }" :whileTap="{ scale: 0.97 }">
      {{ status === 'sending' ? 'Envoi en cours' : 'Envoyer le message' }} <Send :size="17" />
    </motion.button>
    <Success v-if="status === 'ok'" text="Message envoyé. Merci !" />
    <motion.p v-if="status === 'error'" class="msg error" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">Envoi impossible. Réessayez dans un instant.</motion.p>
  </form>
</template>
