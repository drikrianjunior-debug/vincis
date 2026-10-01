import { Globe, Smartphone, Palette, Share2, Clapperboard } from 'lucide-vue-next'
export const services = [
  { id: 'web', title: 'Sites & applications web', icon: Globe, text: 'Sites vitrines, boutiques, plateformes sur mesure, rapides et bien référencés.' },
  { id: 'mobile', title: 'Applications mobiles', icon: Smartphone, text: 'Apps iOS et Android fluides, pensées pour vos utilisateurs.' },
  { id: 'brand', title: 'Identité visuelle', icon: Palette, text: 'Logo, marque, couleurs et typographies : une image qui vous ressemble.' },
  { id: 'social', title: 'Réseaux sociaux', icon: Share2, text: 'Planning, publications et animation de vos communautés.' },
  { id: 'video', title: 'Vidéo & flyers', icon: Clapperboard, text: 'Montage vidéo, flyers et visuels prêts à diffuser.' }
]
// Pour changer une image : remplacez `image` par votre capture (ex. '/img/works/nozam.jpg' après l'avoir déposée dans public/img/works/)
export const works = [
  { name: 'NOZAM', url: 'https://nozam-ten.vercel.app/', image: '/img/works/nozam.svg' },
  { name: 'Vins', tag: 'By JR. & VinCi', url: 'https://vins-one.vercel.app/', image: '/img/works/vins.svg' },
  { name: 'ABS.ci', tag: 'ABS Services', url: 'https://absservices.vercel.app/', image: '/img/works/abs.svg' },
  { name: 'Portfolio', url: 'https://portfolio-roan-two-43.vercel.app/', image: '/img/works/portfolio.svg' }
]
