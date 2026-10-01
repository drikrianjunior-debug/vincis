import { ref } from 'vue'
import emailjs from '@emailjs/browser'

// Un seul template EmailJS pour les 3 formulaires : {{form_type}}, {{name}}, {{email}}, {{phone}}, {{message}}
export function useForm(type) {
  const status = ref('idle') // idle | sending | ok | error
  async function submit(data, reset) {
    status.value = 'sending'
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { form_type: type, ...data },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      status.value = 'ok'
      reset?.()
    } catch (e) {
      console.error(e)
      status.value = 'error'
    }
  }
  return { status, submit }
}
