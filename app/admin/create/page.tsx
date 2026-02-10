'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import Link from 'next/link';

export default function AdminCreateRedirect() {
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33612345678';
        const phoneNumber = rawNumber.replace(/\D/g, '');
        const message = encodeURIComponent("Bonjour, je suis intéressé par la création d'une LoveLink !");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        // Try to open in new tab
        const newWindow = window.open(whatsappUrl, '_blank');

        // Check if blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            setBlocked(true);
        } else {
            // Optional: Redirect current tab back to home or keep it open?
            // User asked "dont close the site". Keeping this page open with a "Back" button is safest.
        }
    }, []);

    const getWhatsappUrl = () => {
        const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33612345678';
        const phoneNumber = rawNumber.replace(/\D/g, '');
        const message = encodeURIComponent("Bonjour, je suis intéressé par la création d'une LoveLink !");
        return `https://wa.me/${phoneNumber}?text=${message}`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center space-y-8">

            <div className="space-y-4 max-w-md">
                <Typography variant="h2" className="text-3xl text-passion-900">Contact Commercial</Typography>
                <Typography variant="body" className="text-stone-600">
                    Nous vous redirigeons vers WhatsApp pour finaliser votre demande...
                </Typography>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="luxury" size="lg" fullWidth>
                        Ouvrir WhatsApp 💬
                    </Button>
                </a>

                <Link href="/" className="w-full">
                    <Button variant="ghost" size="sm" fullWidth>
                        Retour à l'accueil
                    </Button>
                </Link>
            </div>

        </div>
    );
}
