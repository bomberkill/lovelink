import { DEMO_stories } from '@/lib/demo-data';
import LiveStoryWrapper from './LiveStoryWrapper';
import { Metadata } from 'next';

// Generate metadata for social sharing
export async function generateMetadata(
    { searchParams }: { searchParams: Promise<{ story?: string }> }
): Promise<Metadata> {
    const { story: slug } = await searchParams;
    const story = DEMO_stories.find(s => s.slug === slug) || DEMO_stories[0]; // Fallback to first for metadata if random

    return {
        title: `L'histoire de ${story.ownerName} & ${story.targetName} | LoveLink`,
        description: `Découvre leur histoire : "${story.finalMessage}"`,
        openGraph: {
            title: `L'histoire de ${story.ownerName} & ${story.targetName}`,
            description: story.timelineEvents?.[0]?.description || "Une histoire d'amour unique.",
            images: story.timelineEvents?.[0]?.photoUrl ? [story.timelineEvents[0].photoUrl] : [],
        },
    };
}

export default async function DemoLiveStoryPage({ searchParams }: { searchParams: Promise<{ story?: string }> }) {
    const { story } = await searchParams;
    let selectedStory = null;

    if (story) {
        selectedStory = DEMO_stories.find(s => s.slug === story);
    }

    // If no story found or no param, pick random
    if (!selectedStory) {
        const randomIndex = Math.floor(Math.random() * DEMO_stories.length);
        selectedStory = DEMO_stories[randomIndex];
    }

    return <LiveStoryWrapper lovePage={selectedStory} />;
}
