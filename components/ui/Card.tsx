'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
    children: ReactNode;
    variant?: 'deep-glass' | 'solid' | 'outline';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    hoverEffect?: boolean;
}

export default function Card({
    children,
    variant = 'deep-glass',
    padding = 'lg',
    hoverEffect = true,
    className = '',
    ...props
}: CardProps) {
    const baseStyles = 'rounded-[2rem] transition-all duration-500 overflow-hidden relative';

    const variantStyles = {
        'deep-glass': 'bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
        solid: 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100',
        outline: 'bg-transparent border border-stone-200',
    };

    const paddingStyles = {
        none: 'p-0',
        sm: 'p-4 md:p-6',
        md: 'p-6 md:p-8',
        lg: 'p-8 md:p-12',
        xl: 'p-12 md:p-16',
    };

    const hoverStyles = hoverEffect ? 'hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1' : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
            {...props}
        >
            {/* Subtle Noise Texture for depth (Optional, can be added via CSS if needed) */}
            {/* <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" /> */}

            {children}
        </motion.div>
    );
}
