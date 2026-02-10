/**
 * LovePage data structure
 */
export interface LovePage {
    slug: string;
    experience: 'impossible-to-say-no' | 'timeline';
    ownerName: string;
    targetName: string;

    // For "Impossible to say no" experience
    question?: string;
    finalMessage?: string;

    // For "Timeline" experience
    timelineEvents?: TimelineEvent[];
    photos?: string[]; // URLs from Storage
    musicUrl?: string; // URL from Storage

    createdAt: string;
    updatedAt: string;
}

/**
 * Timeline event structure
 */
export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    photoUrl?: string;
}
