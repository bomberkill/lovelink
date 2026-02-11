'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    emoji: string;
    duration: number;
    delay: number;
}

interface ParticleSystemProps {
    count?: number;
    emojis?: string[];
}

export default function ParticleSystem({
    count = 15,
    emojis = ['❤️', '💕', '💖', '💗', '✨'],
}: ParticleSystemProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 20 + Math.random() * 40,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            duration: 8 + Math.random() * 8,
            delay: Math.random() * 2,
        }));

        const timer = setTimeout(() => setParticles(newParticles), 0);
        return () => clearTimeout(timer);
    }, [count, emojis]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        fontSize: `${particle.size}px`,
                        opacity: 0.15,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    );
}
