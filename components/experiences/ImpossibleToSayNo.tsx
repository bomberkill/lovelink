'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useLiveTypewriter } from '@/hooks/useLiveTypewriter';
import { LovePage } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import ParticleSystem from '@/components/animations/ParticleSystem';
import Confetti from '@/components/animations/Confetti';
import Link from 'next/link';

interface ImpossibleToSayNoProps {
    lovePage: LovePage;
}

export default function ImpossibleToSayNo({ lovePage }: ImpossibleToSayNoProps) {
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [noCount, setNoCount] = useState(0);

    // Animation controls for "No" button
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);

    // Typewriter effects
    const { displayedText: questionText, cursorVisible: questionCursor } = useLiveTypewriter(lovePage.question || '', {
        speed: 50,
        startDelay: 1500, // Wait for TargetName fade in
    });

    const { displayedText: finalText, cursorVisible: finalCursor } = useLiveTypewriter(lovePage.finalMessage || '', {
        speed: 40,
        startDelay: 1000,
        enabled: showFinalMessage, // Only start when success screen is shown
    });

    // Perpetual gentle movement (breathing effect)
    useEffect(() => {
        if (!showFinalMessage) {
            controls.start({
                x: [0, 10, -10, 5, -5, 0],
                y: [0, -5, 5, -2, 2, 0],
                transition: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                }
            });
        }
    }, [controls, showFinalMessage]);

    const handleInteraction = () => {
        // Stop the gentle breathing when interaction happens
        controls.stop();

        // Calculate a safe random position within view but away from cursor/touch
        // Simple logic: Move to a random quadrant
        const randomX = (Math.random() - 0.5) * 300; // Expanded range
        const randomY = (Math.random() - 0.5) * 300;

        controls.start({
            x: randomX,
            y: randomY,
            rotate: Math.random() * 20 - 10, // Slight tilt for playfulness
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        });

        setNoCount(c => c + 1);
    };

    const handleYesClick = () => {
        setShowFinalMessage(true);
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-passion-50 selection:bg-passion-100 selection:text-passion-900"
            ref={containerRef}
        >

            {/* --- AMBIENT BACKGROUND --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-passion-200/20 rounded-full blur-[120px] mix-blend-multiply animate-float-slow" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-gold-200/20 rounded-full blur-[100px] mix-blend-multiply animate-float-medium" />
                <ParticleSystem count={20} emojis={['✨', '🌸', '🤍', '💖']} />
            </div>

            {/* --- FLOATING CTA --- */}
            <AnimatePresence>
                {!showFinalMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50 pointer-events-auto"
                    >
                        <Link href="/create/impossible-to-say-no">
                            <Button variant="magnetic" size="sm" className="bg-white/90 backdrop-blur !text-passion-900 hover:!text-white border-passion-100 shadow-lg hover:shadow-xl font-medium">
                                Créer le mien 🪄
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!showFinalMessage ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 min-h-screen flex items-center justify-center p-6"
                    >
                        <Card variant="deep-glass" padding="xl" className="max-w-2xl w-full text-center space-y-12 bg-white/60 border-passion-100 shadow-glass">

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 1 }}
                                className="space-y-6"
                            >
                                <Typography variant="caption" className="tracking-[0.3em] text-passion-900/60 font-semibold">
                                    UNE QUESTION SPÉCIALE
                                </Typography>

                                <h1 className="font-serif text-5xl md:text-7xl leading-tight text-passion-950">
                                    {lovePage.targetName},
                                </h1>

                                <Typography variant="h3" className="font-light text-stone-700 leading-relaxed italic">
                                    &quot;{questionText}{questionCursor && <span className="text-passion-400">|</span>}&quot;
                                </Typography>
                            </motion.div>

                            <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-8 relative min-h-[120px]">
                                <Button
                                    size="xl"
                                    variant="luxury"
                                    onClick={handleYesClick}
                                    className="min-w-[200px] shadow-passion-500/30 hover:shadow-passion-600/40 z-20"
                                >
                                    Oui, avec joie 💍
                                </Button>

                                <motion.div
                                    animate={controls}
                                    onHoverStart={handleInteraction}
                                    onTouchStart={handleInteraction}
                                    className="z-10"
                                >
                                    <Button
                                        size="xl"
                                        variant="ghost"
                                        className="min-w-[200px] opacity-80 hover:opacity-100 text-passion-900 border-passion-200 hover:bg-passion-50 cursor-pointer"
                                    >
                                        {noCount > 0 ? (noCount > 5 ? "Vraiment ?" : "Euh... non ?") : "Non, merci"}
                                    </Button>
                                </motion.div>
                            </div>

                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        className="relative z-10 min-h-screen flex items-center justify-center p-6"
                    >
                        <Confetti count={50} emojis={['✨', '🤍', '🥂', '💍', '💖']} />

                        <Card
                            variant="deep-glass"
                            padding="xl"
                            className="max-w-3xl w-full text-center space-y-12 border-passion-200 shadow-glass bg-white/70"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileInView={{}}
                            viewport={{}}
                        >
                            <div className="space-y-8">
                                <div className="text-7xl animate-pulse-subtle">🥂</div>

                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-light text-passion-900 drop-shadow-sm text-center mx-auto"
                                >
                                    Merveilleux !
                                </motion.h1>

                                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-passion-300 to-transparent mx-auto" />

                                <Typography variant="body-lg" className="max-w-xl mx-auto italic text-stone-700 font-medium">
                                    {finalText}{finalCursor && <span className="text-passion-400">|</span>}
                                </Typography>

                                <div className="pt-12">
                                    <Typography variant="caption" className="tracking-widest text-passion-800/60">
                                        AVEC TOUT MON AMOUR,
                                    </Typography>
                                    <Typography variant="h3" className="mt-4 text-passion-700 font-serif">
                                        {lovePage.ownerName}
                                    </Typography>

                                    <div className="pt-16 mt-8 border-t border-dashed border-passion-200/50 max-w-sm mx-auto space-y-4">
                                        <Typography variant="body" className="text-stone-400 text-xs italic">
                                            À votre tour de jouer ?
                                        </Typography>

                                        <Link href="/create/impossible-to-say-no" className="block w-full">
                                            <Button variant="luxury" size="lg" fullWidth className="shadow-passion-500/30">
                                                Créer ma page gratuitement ✨
                                            </Button>
                                        </Link>

                                        <Link href="/demo/live-story" className="block w-full">
                                            <Button variant="ghost" size="sm" className="text-stone-500 hover:text-passion-900">
                                                Voir aussi : Live Story 📖
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
