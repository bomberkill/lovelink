'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    variant?: 'hero' | 'romantic' | 'luxury';
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export default function GradientText({
    children,
    variant = 'hero',
    className = '',
    as: Component = 'span',
}: GradientTextProps) {
    const variantStyles = {
        hero: 'text-gradient',
        romantic: 'text-gradient-romantic',
        luxury: 'text-gradient-luxury',
    };

    return (
        <Component className={`${variantStyles[variant]} ${className}`}>
            {children}
        </Component>
    );
}
