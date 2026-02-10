import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { LovePage } from './types';

/**
 * Create an example LovePage document for testing
 * This should be run once to populate the database with test data
 */
export async function createExamplePage() {
    const examplePage: LovePage = {
        slug: 'test-valentine',
        experience: 'impossible-to-say-no',
        ownerName: 'Alex',
        targetName: 'Jordan',
        question: 'Veux-tu être ma Valentine ? 💕',
        finalMessage: 'Je savais que tu dirais oui ! Tu es la meilleure chose qui me soit arrivée. ❤️',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        await setDoc(doc(db, 'lovePages', examplePage.slug), examplePage);
        console.log('✅ Example page created successfully!');
        return examplePage;
    } catch (error) {
        console.error('❌ Error creating example page:', error);
        throw error;
    }
}

/**
 * Create an example timeline page
 */
export async function createExampleTimelinePage() {
    const timelinePage: LovePage = {
        slug: 'notre-histoire',
        experience: 'timeline',
        ownerName: 'Marie',
        targetName: 'Thomas',
        finalMessage: 'Chaque moment avec toi est un trésor. Je t\'aime. 💖',
        timelineEvents: [
            {
                date: '2023-01-15',
                title: 'Notre première rencontre',
                description: 'Ce jour-là, nos regards se sont croisés et tout a changé.',
            },
            {
                date: '2023-03-20',
                title: 'Notre premier rendez-vous',
                description: 'Un dîner inoubliable sous les étoiles.',
            },
            {
                date: '2023-06-10',
                title: 'Notre premier voyage',
                description: 'Paris, la ville de l\'amour, où nous avons créé tant de souvenirs.',
            },
        ],
        photos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        await setDoc(doc(db, 'lovePages', timelinePage.slug), timelinePage);
        console.log('✅ Example timeline page created successfully!');
        return timelinePage;
    } catch (error) {
        console.error('❌ Error creating timeline page:', error);
        throw error;
    }
}
