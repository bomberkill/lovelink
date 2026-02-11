'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
    id: number;
    x: number;
    emoji: string;
    duration: number;
    delay: number;
    rotation: number;
}

interface ConfettiProps {
    count?: number;
    emojis?: string[];
    active?: boolean;
}

export default function Confetti({
    count = 30,
    emojis = ['❤️', '💕', '💖', '💗', '💝', '✨', '🎉'],
    active = true,
}: ConfettiProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (!active) return;

        const newPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            duration: 2 + Math.random() * 2,
            delay: i * 0.05,
            rotation: Math.random() * 360,
        }));

        const timer = setTimeout(() => setPieces(newPieces), 0);
        return () => clearTimeout(timer);
    }, [count, emojis, active]);

    if (!active) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {pieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    className="absolute text-4xl"
                    style={{
                        left: `${piece.x}%`,
                        top: '-10%',
                    }}
                    initial={{
                        y: 0,
                        opacity: 0,
                        rotate: 0,
                    }}
                    animate={{
                        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                        opacity: [0, 1, 1, 0],
                        rotate: piece.rotation,
                    }}
                    transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        ease: 'linear',
                    }}
                >
                    {piece.emoji}
                </motion.div>
            ))}
        </div>
    );
}
