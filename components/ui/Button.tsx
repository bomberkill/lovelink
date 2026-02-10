'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
    children: ReactNode;
    variant?: 'luxury' | 'ghost' | 'magnetic';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'luxury',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (variant !== 'magnetic') return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * 0.3; // Magnetic strength
        const y = (clientY - (top + height / 2)) * 0.3;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = 'relative font-serif tracking-wide rounded-full transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        luxury: 'bg-passion-900 text-stone-50 hover:bg-passion-950 shadow-md hover:shadow-lg active:scale-95 border border-transparent',
        ghost: 'bg-transparent text-stone-900 border border-stone-200 hover:border-passion-900 hover:text-passion-900',
        magnetic: 'bg-stone-900 text-stone-50 hover:bg-black shadow-magnetic',
    };

    const sizeStyles = {
        sm: 'px-5 py-2 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-10 py-4 text-lg',
        xl: 'px-12 py-5 text-xl font-light',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={variant === 'magnetic' ? { x: position.x, y: position.y } : {}}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}
