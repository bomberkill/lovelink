'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
    musicUrl?: string;
}

export default function MusicPlayer({ musicUrl }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch((error) => {
                console.error('Error playing audio:', error);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    if (!musicUrl) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
                {isPlaying ? (
                    <span className="text-2xl">🔊</span>
                ) : (
                    <span className="text-2xl">🔇</span>
                )}
            </button>
            <audio ref={audioRef} src={musicUrl} loop />
        </motion.div>
    );
}
