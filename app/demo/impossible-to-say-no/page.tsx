'use client';

import ImpossibleToSayNo from '@/components/experiences/ImpossibleToSayNo';
import { LovePage } from '@/lib/types';

export default function DemoImpossiblePage() {
    const demoPage: LovePage = {
        slug: 'demo-impossible',
        experience: 'impossible-to-say-no',
        ownerName: 'Alex',
        targetName: 'Ella',
        question: 'Veux-tu être ma Valentine ? 💕',
        finalMessage: 'Tu es la meilleure chose qui me soit arrivée. Je t\'aime de tout mon cœur. ❤️',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return <ImpossibleToSayNo lovePage={demoPage} />;
}
