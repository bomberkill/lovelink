'use client';

import LiveStory from '@/components/experiences/LiveStory';
import { LovePage } from '@/lib/types';
import ShareButton from '@/components/ui/ShareButton';

export default function LiveStoryWrapper({ lovePage }: { lovePage: LovePage }) {
    // Determine the share URL (on client side to get origin, or passed from server)
    // We can use window.location.origin if we want, or just a relative path if supported, but share usually needs absolute.
    // Making it safe for SSR by checking window.

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/demo/live-story?story=${lovePage.slug}`
        : '';

    return (
        <>
            <LiveStory lovePage={lovePage} />

            {/* Floating Share Button for Demo 
                Positioned at bottom-28 (approx 112px) to sit ABOVE the MusicPlayer 
                which is at bottom-8 (32px) + height (approx 60px) + gap.
            */}
            <div className="fixed bottom-32 right-8 z-50">
                <ShareButton
                    title={`L'histoire de ${lovePage.ownerName} & ${lovePage.targetName}`}
                    text={`Découvre cette histoire d'amour unique sur LoveLink : "${lovePage.finalMessage}"`}
                    url={shareUrl}
                    variant="ghost"
                />
            </div>
        </>
    );
}
