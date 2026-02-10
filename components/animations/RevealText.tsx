'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealTextProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    stagger?: boolean;
}

export default function RevealText({
    children,
    delay = 0,
    className = '',
    as: Component = 'p',
    stagger = true,
}: RevealTextProps) {
    // If children is not a string or stagger is false, just animate the whole element
    if (typeof children !== 'string' || !stagger) {
        return (
            <Component className={className}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    {children}
                </motion.div>
            </Component>
        );
    }

    // Stagger animation for strings
    const words = children.split(' ');

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <Component className={className}>
            <motion.span
                style={{ overflow: 'hidden', display: 'block' }}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {words.map((word, index) => (
                    <motion.span
                        variants={child}
                        style={{ marginRight: '0.25em', display: 'inline-block' }}
                        key={index}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Component>
    );
}
