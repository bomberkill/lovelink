'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LovePage, TimelineEvent } from '@/lib/types';
import MusicPlayer from '@/components/experiences/MusicPlayer';
import Typography from '@/components/ui/Typography';
import { useLiveTypewriter } from '@/hooks/useLiveTypewriter';
import Link from 'next/link';

// --- HELPER FUNCTION FOR SCROLL ---
const scrollToCenter = (element: HTMLElement | null) => {
    if (!element) return;

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
};

// --- PINNED PHOTO COMPONENT ---
const PinnedPhoto = ({ src, visible }: { src: string, visible: boolean }) => {
    return (
        <motion.div
            initial={{ scale: 0, rotate: 15, opacity: 0 }}
            animate={{
                scale: visible ? 1 : 0,
                rotate: visible ? 6 : 15,
                opacity: visible ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 14, delay: 0.1 }}
            className="absolute -top-12 -right-6 md:-right-12 w-32 h-32 md:w-48 md:h-48 z-20 pointer-events-none"
        >
            <div className="relative w-full h-full bg-white p-2 shadow-xl transform origin-bottom-left rotate-2 border border-stone-100/50">
                <img
                    src={src}
                    alt="Souvenir"
                    className="w-full h-full object-cover filter contrast-[1.05] sepia-[0.1]"
                />
            </div>
        </motion.div>
    );
};

// --- STORY SEGMENT COMPONENT ---
const StorySegment = memo(({
    event,
    isActive,
    onFinished
}: {
    event: TimelineEvent,
    isActive: boolean,
    onFinished: () => void
}) => {
    const [phase, setPhase] = useState<'hidden' | 'date' | 'card' | 'photo' | 'title' | 'desc' | 'done'>('hidden');
    const scrollRef = useRef<HTMLDivElement>(null);

    const titleState = useLiveTypewriter(event.title, {
        speed: 75,
        enabled: phase === 'title' || phase === 'desc' || phase === 'done'
    });

    const descState = useLiveTypewriter(event.description, {
        speed: 55,
        enabled: phase === 'desc' || phase === 'done'
    });

    // --- ORCHESTRATION ---

    useEffect(() => {
        if (isActive && phase === 'hidden') {
            setPhase('date');

            // Double requestAnimationFrame ensures Framer Motion layout is stable
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scrollToCenter(scrollRef.current);
                });
            });
        }
    }, [isActive, phase]);

    useEffect(() => {
        if (phase === 'date') {
            const timeout = setTimeout(() => setPhase('card'), 600);
            return () => clearTimeout(timeout);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 'card') {
            const timeout = setTimeout(() => setPhase('photo'), 800);
            return () => clearTimeout(timeout);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 'photo') {
            const timeout = setTimeout(() => setPhase('title'), 800);
            return () => clearTimeout(timeout);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 'title' && titleState.isComplete) {
            const timeout = setTimeout(() => setPhase('desc'), 400);
            return () => clearTimeout(timeout);
        }
    }, [phase, titleState.isComplete]);

    useEffect(() => {
        if (phase === 'desc' && descState.isComplete) {
            const timeout = setTimeout(() => {
                setPhase('done');
                // Small delay before calling onFinished to ensure smooth transition
                setTimeout(() => {
                    onFinished();
                }, 300);
            }, 800); // Increased delay to let user read the complete text
            return () => clearTimeout(timeout);
        }
    }, [phase, descState.isComplete, onFinished]);


    if (phase === 'hidden' && !isActive) return <div className="h-screen" />;

    return (
        <div
            ref={scrollRef}
            className="min-h-[100svh] flex items-center justify-center px-4 md:px-6 py-8 relative"
        >
            <motion.div
                className="w-full max-w-3xl space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* DATE BADGE - Now part of the centered content */}
                {(phase !== 'hidden') && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-start"
                    >
                        <span className="font-serif italic text-xl md:text-2xl text-stone-400 bg-stone-50 px-3 md:px-4 py-1.5 md:py-2 border border-stone-100 shadow-sm rotate-[-2deg] inline-block">
                            {event.date}
                        </span>
                    </motion.div>
                )}

                {/* CARD CONTAINER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{
                        opacity: (phase !== 'hidden' && phase !== 'date') ? 1 : 0,
                        scale: (phase !== 'hidden' && phase !== 'date') ? 1 : 0.95,
                        y: (phase !== 'hidden' && phase !== 'date') ? 0 : 20
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-white p-6 md:p-10 lg:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-stone-100 rounded-sm min-h-[18rem] md:min-h-[22rem] flex flex-col justify-center overflow-visible"
                >

                    {/* PINNED PHOTO */}
                    {event.photoUrl && (
                        <PinnedPhoto src={event.photoUrl} visible={phase === 'photo' || phase === 'title' || phase === 'desc' || phase === 'done'} />
                    )}

                    {/* TITRE */}
                    <div className="relative z-10 pr-4 md:pr-24 mb-6 md:mb-8 min-h-[3rem] md:min-h-[4rem]">
                        {(phase === 'title' || phase === 'desc' || phase === 'done') && (
                            <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif text-passion-950 leading-[0.9] tracking-tight">
                                {titleState.displayedText}
                                {phase === 'title' && !titleState.isComplete && titleState.cursorVisible && <span className="text-rose-400 animate-pulse font-light">|</span>}
                            </h2>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="relative z-10 max-w-xl min-h-[4rem] md:min-h-[6rem]">
                        {(phase === 'desc' || phase === 'done') && (
                            <div className="text-lg md:text-xl text-stone-600 font-light leading-relaxed font-sans">
                                {descState.displayedText}
                                {phase === 'desc' && !descState.isComplete && descState.cursorVisible && <span className="text-rose-400 animate-pulse font-light">|</span>}
                            </div>
                        )}
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-5 font-serif text-6xl md:text-8xl text-passion-900 pointer-events-none select-none">
                        ❦
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
});
StorySegment.displayName = 'StorySegment';

// --- FINAL MESSAGE COMPONENT ---
const FinalMessage = memo(({ message, startTyping }: { message: string, startTyping: boolean }) => {
    const typewriter = useLiveTypewriter(message, {
        speed: 90,
        enabled: startTyping
    });

    return (
        <div className="min-h-[8rem] flex justify-center items-center">
            <Typography variant="h2" className="text-2xl md:text-4xl text-passion-950 italic leading-tight mb-8 max-w-4xl mx-auto">
                {startTyping && typewriter.displayedText}
                {!typewriter.isComplete && typewriter.cursorVisible && <span className="text-rose-400 animate-pulse font-light">|</span>}
            </Typography>
        </div>
    );
});
FinalMessage.displayName = 'FinalMessage';

// --- MAIN WRAPPER ---
export default function LiveStory({ lovePage }: { lovePage: LovePage }) {
    const [started, setStarted] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [startFinalTyping, setStartFinalTyping] = useState(false);
    const finalRef = useRef<HTMLDivElement>(null);

    const startStory = () => {
        setStarted(true);
        setVisibleIndex(0);
        setIsFinished(false);
        setStartFinalTyping(false);
    };

    const nextEvent = (completedIndex: number) => {
        if (completedIndex < (lovePage.timelineEvents?.length || 0) - 1) {
            setVisibleIndex(completedIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    useEffect(() => {
        if (isFinished) {
            setTimeout(() => {
                scrollToCenter(finalRef.current);
            }, 600);

            setTimeout(() => {
                setStartFinalTyping(true);
            }, 1200);
        }
    }, [isFinished]);

    return (
        <div className="min-h-screen bg-stone-50 pb-48 font-sans">
            <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
                <div className="w-[1px] h-full bg-stone-200/50"></div>
            </div>

            <MusicPlayer musicUrl={lovePage.musicUrl} />

            {/* --- COVER --- */}
            <AnimatePresence mode="wait">
                {!started && (
                    <motion.div
                        exit={{ opacity: 0, scale: 0.98, transition: { duration: 1 } }}
                        className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-stone-50 px-4 md:px-6 overflow-y-auto"
                    >
                        <div className="text-center space-y-8 md:space-y-12 max-w-4xl mx-auto py-12">
                            <div className="space-y-4 md:space-y-6">
                                <Typography variant="caption" className="tracking-[0.3em] md:tracking-[0.5em] text-stone-400 font-medium uppercase text-xs md:text-sm">Une Histoire Vécue</Typography>
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-passion-950 tracking-tighter leading-none px-4">
                                    {lovePage.ownerName} <br /> <span className="text-rose-300 font-thin text-4xl sm:text-5xl md:text-6xl lg:text-7xl align-top">&</span> {lovePage.targetName}
                                </h1>
                            </div>

                            <div className="h-24 md:h-32 w-[1px] bg-stone-200 mx-auto"></div>

                            <button
                                onClick={startStory}
                                className="px-8 md:px-12 py-4 md:py-5 bg-white border border-stone-200 text-passion-950 font-serif italic text-lg md:text-xl shadow-sm hover:shadow-xl hover:border-passion-200 transition-all duration-700 rounded-sm"
                            >
                                Ouvrir le livre
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- STREAM --- */}
            {started && (
                <div className="relative z-10 w-full">
                    {lovePage.timelineEvents?.map((event, i) => (
                        (i <= visibleIndex) && (
                            <StorySegment
                                key={i}
                                event={event}
                                isActive={i === visibleIndex}
                                onFinished={() => nextEvent(i)}
                            />
                        )
                    ))}
                </div>
            )}

            {/* --- ENDING --- */}
            {isFinished && (
                <motion.div
                    ref={finalRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-3xl mx-auto mt-48 text-center relative z-10 px-6 pb-24"
                >
                    <div className="mb-12 text-rose-400 text-4xl animate-pulse">
                        ❦
                    </div>

                    <FinalMessage message={lovePage.finalMessage || ''} startTyping={startFinalTyping} />

                    <div className="space-y-12 mt-16">
                        <button
                            onClick={() => {
                                setStarted(false);
                                setIsFinished(false);
                                setStartFinalTyping(false);
                                setVisibleIndex(0);
                                window.scrollTo(0, 0); // Immediate scroll reset
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group px-10 py-3 bg-white border border-stone-200 text-stone-500 font-serif italic text-lg shadow-sm hover:shadow-lg hover:text-passion-900 transition-all duration-500 rounded-full hover:scale-105"
                        >
                            <span className="group-hover:mr-2 transition-all">Rejouer</span> ↻
                        </button>

                        <div className="pt-8 border-t border-stone-100 max-w-md mx-auto space-y-6">
                            <Typography variant="body" className="text-stone-400 text-sm mb-4">
                                Vous aussi, racontez votre histoire unique.
                            </Typography>
                            <a
                                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33612345678').replace(/\D/g, '')}?text=${encodeURIComponent("Bonjour, je suis intéressé par la création d'une LoveLink !")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <button className="px-8 py-3 bg-gradient-to-r from-passion-900 to-rose-900 text-white font-serif italic rounded-full shadow-lg hover:shadow-passion-200/50 hover:-translate-y-1 transition-all duration-300 w-full md:w-auto">
                                    Commander ma Love Story ✨
                                </button>
                            </a>

                            <div className="text-xs text-stone-300 uppercase tracking-widest pt-4">Ou alors...</div>

                            <Link href="/demo/impossible-to-say-no" className="block">
                                <button className="px-6 py-2 bg-white border border-rose-200 text-rose-900/60 hover:text-rose-900 font-serif italic text-sm rounded-full hover:bg-rose-50 transition-all duration-300">
                                    Faire une demande qu'on ne peut (vraiment) pas refuser 💍
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
