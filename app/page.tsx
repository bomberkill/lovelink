'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import ParticleSystem from '@/components/animations/ParticleSystem';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-50 selection:bg-passion-100 selection:text-passion-900">

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-passion-100/30 rounded-full blur-[120px] mix-blend-multiply animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-gold-100/40 rounded-full blur-[100px] mix-blend-multiply animate-float-medium" />
        <ParticleSystem count={15} emojis={['✨', '🤍', '🕊️']} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24">

        {/* --- HERO SECTION: The Love Letter --- */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center space-y-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 max-w-4xl"
          >
            <Typography variant="caption" className="tracking-[0.2em] text-passion-900/60 font-medium">
              EST. 2026 — DIGITAL ROMANCE
            </Typography>

            <h1 className="font-serif text-6xl md:text-9xl lg:text-[10rem] leading-[0.85] text-stone-900 tracking-tight">
              Love<span className="italic font-light text-passion-900">Link</span>
            </h1>

            <Typography variant="h3" className="font-light text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Transformez vos émotions en une expérience digitale <span className="italic text-passion-800">inoubliable</span>.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <Link href="/admin/create">
              <Button size="xl" variant="luxury">
                Créer une page éternelle
              </Button>
            </Link>
          </motion.div>

        </section>

        {/* --- GALLERY SECTION: The Collection --- */}
        <section className="py-24 space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 border-b border-stone-200 pb-8">
            <div className="space-y-2 text-center md:text-left">
              <Typography variant="caption">Collection</Typography>
              <Typography variant="h2">Nos Expériences</Typography>
            </div>
            <Typography variant="body" className="max-w-md text-center md:text-right">
              Des templates conçus comme des châteaux de cartes numériques. Choisissez l'écrin de votre message.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

            {/* Experience 01 */}
            <Link href="/demo/impossible-to-say-no" className="group block h-full">
              <Card variant="deep-glass" padding="none" className="h-full group-hover:shadow-magnetic transition-shadow duration-500 flex flex-col">
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-passion-50/50 group-hover:scale-105 transition-transform duration-700">
                    <span className="text-8xl filter blur-sm group-hover:blur-none transition-all duration-500">💌</span>
                  </div>
                </div>
                <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Typography variant="h3" className="group-hover:text-passion-900 transition-colors">Impossible de dire non</Typography>
                      <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">→</span>
                    </div>
                    <Typography variant="body">
                      Une invitation interactive où le refus s'échappe. Idéale pour une demande en mariage ou une Saint-Valentin joueur.
                    </Typography>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Experience 02 */}
            <Link href="/demo/live-story" className="group block h-full md:mt-16">
              <Card variant="deep-glass" padding="none" className="h-full group-hover:shadow-magnetic transition-shadow duration-500 flex flex-col">
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gold-50/50 group-hover:scale-105 transition-transform duration-700">
                    <span className="text-8xl filter blur-sm group-hover:blur-none transition-all duration-500">📖</span>
                  </div>
                </div>
                <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Typography variant="h3" className="group-hover:text-gold-700 transition-colors">Live Story</Typography>
                      <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">→</span>
                    </div>
                    <Typography variant="body">
                      Votre histoire s'écrit sous vos yeux. Une narration émotionnelle qui capture vos hésitations et vos moments forts.
                    </Typography>
                  </div>
                </div>
              </Card>
            </Link>

          </div>
        </section>

        {/* --- FOOTER: Minimal --- */}
        <footer className="py-24 text-center space-y-8 border-t border-stone-200/50 mt-12">
          <Typography variant="h2" className="italic text-stone-300">
            LoveLink
          </Typography>
          <div className="flex justify-center gap-8 text-sm uppercase tracking-widest text-stone-500 font-medium">
            <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33612345678').replace(/\D/g, '')}?text=${encodeURIComponent("Bonjour, je suis intéressé par la création d'une LoveLink !")}`} target="_blank" rel="noopener noreferrer" className="hover:text-passion-900 transition-colors">Commander</a>
            <Link href="#" className="hover:text-passion-900 transition-colors">À Propos</Link>
            <Link href="#" className="hover:text-passion-900 transition-colors">Instagram</Link>
          </div>
          <div className="mt-8 space-y-2">
            <Typography variant="caption" className="opacity-40 block">
              © 2026 LoveLink Studios. Fait avec passion.
            </Typography>
            <a href="https://ronald-portfolio.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-stone-300 hover:text-passion-800 transition-colors block">
              Design & Code par Ronald
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
