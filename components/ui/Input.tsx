'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface InputProps extends HTMLMotionProps<"input"> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
        const baseStyles = 'px-4 py-3 border rounded-xl transition-smooth focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent';
        const errorStyles = error ? 'border-red-500' : 'border-neutral-300 hover:border-neutral-400';
        const widthStyles = fullWidth ? 'w-full' : '';

        return (
            <div className={`${fullWidth ? 'w-full' : ''}`}>
                {label && (
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {label}
                    </label>
                )}
                <motion.input
                    ref={ref}
                    whileFocus={{ scale: 1.01 }}
                    className={`${baseStyles} ${errorStyles} ${widthStyles} ${className}`}
                    {...props}
                />
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
