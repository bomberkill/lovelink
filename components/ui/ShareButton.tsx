'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
    variant?: 'luxury' | 'ghost' | 'magnetic';
}

export default function ShareButton({ title, text, url, variant = 'luxury' }: ShareButtonProps) {
    const [justCopied, setJustCopied] = useState(false);

    const fallbackCopyTextToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setJustCopied(true);
                setTimeout(() => setJustCopied(false), 2000);
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    const handleShare = async () => {
        // Explicitly check for share support
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
                return; // Exit if share was initiated (even if cancelled by user)
            } catch (error) {
                console.log('Error sharing:', error);
                // Only fallback if it was a technical error, not user cancellation
                // But detecting cancellation is hard. 
                // However, usually we don't want to auto-copy if user just clicked cancel.
                return;
            }
        }

        // Fallback to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(url);
                setJustCopied(true);
                setTimeout(() => setJustCopied(false), 2000);
            } catch (err) {
                fallbackCopyTextToClipboard(url);
            }
        } else {
            fallbackCopyTextToClipboard(url);
        }
    };

    return (
        <div className="relative inline-block group">
            <Button
                variant={variant}
                onClick={handleShare}
                className="w-14 h-14 !p-0 rounded-full flex items-center justify-center relative z-10 !shadow-lg hover:bg-stone-100 bg-white/90 backdrop-blur-sm border border-stone-200"
            >
                {justCopied ? (
                    <span className="text-xl">✅</span>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-stone-700"
                    >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                )}
            </Button>

            <AnimatePresence>
                {justCopied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none whitespace-nowrap bg-stone-900 text-white text-xs px-3 py-1.5 rounded-full shadow-xl z-50"
                    >
                        Lien copié !
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
