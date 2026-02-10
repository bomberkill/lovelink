'use client';

import { ReactNode, ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type TypographyVariant = 'display-hero' | 'h1' | 'h2' | 'h3' | 'body-lg' | 'body' | 'caption';

interface TypographyProps extends Omit<HTMLMotionProps<"div">, 'children'> {
    children: ReactNode;
    variant?: TypographyVariant;
    as?: ElementType;
    gradient?: boolean;
}

const styles: Record<TypographyVariant, string> = {
    'display-hero': 'font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight font-light text-stone-900',
    h1: 'font-serif text-5xl md:text-6xl lg:text-7xl leading-tight font-light text-stone-900',
    h2: 'font-serif text-4xl md:text-5xl lg:text-6xl leading-tight font-normal text-stone-900',
    h3: 'font-serif text-3xl md:text-4xl leading-snug font-normal text-stone-900',
    'body-lg': 'font-sans text-lg md:text-xl leading-relaxed font-light tracking-wide text-stone-600',
    body: 'font-sans text-base md:text-lg leading-relaxed font-light tracking-wide text-stone-600',
    caption: 'font-sans text-sm tracking-widest uppercase text-stone-500 font-medium',
};

const variantTags: Record<TypographyVariant, string> = {
    'display-hero': 'h1',
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'body-lg': 'p',
    'body': 'p',
    'caption': 'span',
};

export default function Typography({
    children,
    variant = 'body',
    as,
    className = '',
    gradient = false,
    ...props
}: TypographyProps) {

    const Component = as || variantTags[variant] || 'p';

    const gradientClass = gradient ? 'bg-clip-text text-transparent bg-gradient-to-br from-passion-900 to-passion-600' : '';

    return (
        // @ts-ignore
        <Component className={`${styles[variant]} ${gradientClass} ${className}`} {...props}>
            {children}
        </Component>
    );
}

export function RevealTypography({ children, delay = 0, variant = 'body', ...props }: TypographyProps & { delay?: number }) {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
            >
                <Typography variant={variant} {...props}>
                    {children}
                </Typography>
            </motion.div>
        </div>
    );
}
