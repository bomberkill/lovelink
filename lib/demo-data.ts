import { LovePage } from './types';

// --- CURATED ASSETS (5-6 Images, 3 Music Tracks) ---

// 3 Curated Melancholic/Romantic Piano Tracks (Direct MP3s)
const SHARED_MUSIC = [
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3', // Melancholic / Atmospheric
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_09_-_Homeroad.mp3', // Soft / Hopeful
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Chapter_One__Cold/Kai_Engel_-_08_-_Daemones.mp3' // Deep / Emotional
];

// 6 Curated High-Quality Images (Mood: Moody, Romantic, Soft)
const SHARED_IMAGES = [
    'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=2500&auto=format&fit=crop', // Hands holding (Warm/Light)
    'https://images.unsplash.com/photo-1583336130561-1d9e25cc22b2?q=80&w=2500&auto=format&fit=crop', // Silhouette sunset (Deep/Orange)
    'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=2500&auto=format&fit=crop', // Rainy window / Mood (Blue/Grey)
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2500&auto=format&fit=crop', // Couple walking away (Back view)
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2574&auto=format&fit=crop', // Abstract lights / Bokeh (Dreamy)
    'https://images.unsplash.com/photo-1501901609772-df0848060b33?q=80&w=2500&auto=format&fit=crop'  // Book/Coffee/Cozy (Intimate)
];

// Helper to get consistent random assets based on slug length (pseudo-random)
const getAsset = (slug: string, index: number, type: 'music' | 'image') => {
    const seed = slug.length + index;
    if (type === 'music') {
        return SHARED_MUSIC[seed % SHARED_MUSIC.length];
    }
    return SHARED_IMAGES[seed % SHARED_IMAGES.length];
};

export const DEMO_stories: LovePage[] = [
    // --- ORIGINAL 3 STORIES (Updated with new assets) ---
    {
        slug: 'demo-reconciliation',
        experience: 'timeline',
        ownerName: 'Thomas',
        targetName: 'Sarah',
        musicUrl: getAsset('demo-reconciliation', 0, 'music'),
        finalMessage: "Je ne veux plus perdre une seconde sans toi. Recommençons tout ?",
        timelineEvents: [
            {
                date: 'Juillet 2023',
                title: 'Notre rupture',
                description: 'Le silence s\'est installé. J\'ai cru que c\'était la fin, mais chaque jour sans toi me prouvait le contraire.',
                photoUrl: getAsset('demo-reconciliation', 1, 'image')
            },
            {
                date: 'Octobre 2023',
                title: 'L\'absence',
                description: 'J\'ai croisé ton parfum dans le métro. J\'ai failli t\'écrire dix fois ce jour-là. "Tu me manques" restait bloqué dans mes brouillons.',
                photoUrl: getAsset('demo-reconciliation', 2, 'image')
            },
            {
                date: 'Aujourd\'hui',
                title: 'Une évidence',
                description: 'Je ne peux pas effacer nos erreurs, mais je peux te promettre de ne plus jamais te lâcher la main.',
                photoUrl: getAsset('demo-reconciliation', 3, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-rencontre',
        experience: 'timeline',
        ownerName: 'Léo',
        targetName: 'Clara',
        musicUrl: getAsset('demo-rencontre', 0, 'music'),
        finalMessage: "Depuis ce café, je n'ai jamais arrêté de penser à toi.",
        timelineEvents: [
            {
                date: '14 Février',
                title: 'Le Café de Flore',
                description: 'Il pleuvait. Tu as renversé ton parapluie, j\'ai renversé mon café. Le début du chaos, le début de nous.',
                photoUrl: getAsset('demo-rencontre', 1, 'image')
            },
            {
                date: '20 Février',
                title: 'Premier message',
                description: 'J\'ai mis 3 heures à écrire "C\'était sympa le café nettoyé". Tu as répondu en 3 secondes.',
                photoUrl: getAsset('demo-rencontre', 2, 'image')
            },
            {
                date: 'Mars',
                title: 'Premier baiser',
                description: 'Sous ce porche, rue de Rivoli. Le monde s\'est arrêté de tourner exactement à 23h42.',
                photoUrl: getAsset('demo-rencontre', 3, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-distance',
        experience: 'timeline',
        ownerName: 'Marc',
        targetName: 'Hélène',
        musicUrl: getAsset('demo-distance', 0, 'music'),
        finalMessage: "La distance n'est rien quand quelqu'un compte autant.",
        timelineEvents: [
            {
                date: 'L\'Aéroport',
                title: 'Le départ',
                description: 'Te voir passer la sécurité a été la chose la plus dure de ma vie. 6000 km, c\'est loin, mais mon cœur est parti avec toi.',
                photoUrl: getAsset('demo-distance', 1, 'image')
            },
            {
                date: '6 mois plus tard',
                title: 'Les Facetimes',
                description: 'Dormir avec l\'écran allumé juste pour t\'entendre respirer. On a créé notre propre monde à travers ces pixels.',
                photoUrl: getAsset('demo-distance', 2, 'image')
            },
            {
                date: 'J-7',
                title: 'Le compte à rebours',
                description: 'Plus qu\'une semaine. Prépare-toi, car je ne compte plus jamais te laisser repartir.',
                photoUrl: getAsset('demo-distance', 3, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },

    // --- NEW REALISTIC/COMPLEX STORIES (User added) ---

    {
        slug: 'demo-dark-immature-love',
        experience: 'timeline',
        ownerName: 'Nicolas',
        targetName: 'Clara',
        musicUrl: getAsset('demo-dark-immature-love', 0, 'music'),
        finalMessage: 'Tu méritais un homme, pas un garçon perdu.',
        timelineEvents: [
            {
                date: 'Quand tu es arrivée',
                title: 'T’aimer sans savoir comment',
                description: 'Je voulais l’amour sans les responsabilités.',
                photoUrl: getAsset('demo-dark-immature-love', 1, 'image')
            },
            {
                date: 'Les erreurs',
                title: 'Te blesser sans m’en rendre compte',
                description: 'Je fuyais dès que ça devenait sérieux.',
                photoUrl: getAsset('demo-dark-immature-love', 2, 'image')
            },
            {
                date: 'La fin',
                title: 'Te voir partir sans te retenir',
                description: 'Je savais que tu avais raison.',
                photoUrl: getAsset('demo-dark-immature-love', 3, 'image')
            },
            {
                date: 'Maintenant',
                title: 'Grandir trop tard',
                description: 'Mais grandir quand même.',
                photoUrl: getAsset('demo-dark-immature-love', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-dark-doubt',
        experience: 'timeline',
        ownerName: 'Romain',
        targetName: 'Sofia',
        musicUrl: getAsset('demo-dark-doubt', 0, 'music'),
        finalMessage: 'Je t’ai aimée avec méfiance. J’aurais dû t’aimer avec confiance.',
        timelineEvents: [
            {
                date: 'Au début',
                title: 'Te vouloir rien qu’à moi',
                description: 'Je croyais que l’amour excluait le reste du monde.',
                photoUrl: getAsset('demo-dark-doubt', 1, 'image')
            },
            {
                date: 'Les soupçons',
                title: 'Quand le doute a remplacé l’amour',
                description: 'Chaque retard devenait une accusation.',
                photoUrl: getAsset('demo-dark-doubt', 2, 'image')
            },
            {
                date: 'La rupture',
                title: 'Te perdre à force de t’interroger',
                description: 'Tu as choisi la paix.',
                photoUrl: getAsset('demo-dark-doubt', 3, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'Apprendre à faire confiance',
                description: 'Même quand tu n’es plus là.',
                photoUrl: getAsset('demo-dark-doubt', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-love-toxic-rebirth',
        experience: 'timeline',
        ownerName: 'Élise',
        targetName: 'Mathieu',
        musicUrl: getAsset('demo-love-toxic-rebirth', 0, 'music'),
        finalMessage: 'On s’est fait du mal, mais l’amour a été plus [fort->grand] que nos erreurs. Je te choisis encore. Toujours.',
        timelineEvents: [
            {
                date: 'Au début',
                title: 'L’amour [brûlant->dévorant]',
                description: 'On s’aimait trop fort. Trop vite. Tu étais mon [refuge->obsession]. Je ne respirais plus sans toi, et ça me semblait normal.',
                photoUrl: getAsset('demo-love-toxic-rebirth', 1, 'image')
            },
            {
                date: 'Puis',
                title: 'Quand aimer faisait [mal->peur]',
                description: 'Les mots sont devenus des armes. Les silences, des punitions. Je me perdais, mais je restais. Parce que t’aimer était plus fort que me [respecter->sauver].',
                photoUrl: getAsset('demo-love-toxic-rebirth', 2, 'image')
            },
            {
                date: 'La rupture',
                title: 'Partir pour ne pas [mourir->disparaître]',
                description: 'Je suis partie en pleurant, convaincue que c’était la fin. J’ai appris à vivre sans toi, le cœur encore accroché.',
                photoUrl: getAsset('demo-love-toxic-rebirth', 3, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'S’aimer [mieux->autrement]',
                description: 'On s’est retrouvés différents. Plus calmes. Plus vrais. Cette fois, on s’aime sans se détruire.',
                photoUrl: getAsset('demo-love-toxic-rebirth', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-forgive-impossible',
        experience: 'timeline',
        ownerName: 'Nina',
        targetName: 'Lucas',
        musicUrl: getAsset('demo-forgive-impossible', 0, 'music'),
        finalMessage: 'Je t’ai pardonné non pas parce que c’était facile… mais parce que je t’aime encore.',
        timelineEvents: [
            {
                date: 'Avant',
                title: 'La confiance [aveugle->totale]',
                description: 'Je croyais en toi plus qu’en moi-même. Tu étais mon évidence.',
                photoUrl: getAsset('demo-forgive-impossible', 1, 'image')
            },
            {
                date: 'Le jour où tout a basculé',
                title: 'La [trahison->vérité]',
                description: 'Quand j’ai compris, mon monde s’est effondré. J’ai eu mal comme jamais. J’ai pensé te perdre à jamais.',
                photoUrl: getAsset('demo-forgive-impossible', 2, 'image')
            },
            {
                date: 'Le silence',
                title: 'Des nuits sans [toi->réponses]',
                description: 'Tu t’excusais. Moi je doutais. Chaque message était un combat entre ma colère et mon amour.',
                photoUrl: getAsset('demo-forgive-impossible', 3, 'image')
            },
            {
                date: 'Le choix',
                title: 'Pardonner par [amour->force]',
                description: 'Je n’ai pas oublié. Mais j’ai choisi de te laisser une chance. Parce que ce qu’on a vaut le risque.',
                photoUrl: getAsset('demo-forgive-impossible', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-emotional-dependence',
        experience: 'timeline',
        ownerName: 'Camille',
        targetName: 'Alex',
        musicUrl: getAsset('demo-emotional-dependence', 0, 'music'),
        finalMessage: 'Je t’aime sans me perdre. Et ça change tout.',
        timelineEvents: [
            {
                date: 'Quand tout a commencé',
                title: 'Tu étais mon [monde->tout]',
                description: 'Tes messages rythmaient mes journées. Ton absence me faisait paniquer.',
                photoUrl: getAsset('demo-emotional-dependence', 1, 'image')
            },
            {
                date: 'Avec le temps',
                title: 'Aimer jusqu’à [s’oublier->disparaître]',
                description: 'Je vivais pour toi. J’avais peur que tu partes, peur de ne pas être assez.',
                photoUrl: getAsset('demo-emotional-dependence', 2, 'image')
            },
            {
                date: 'Le déclic',
                title: 'Me retrouver [sans->avant] toi',
                description: 'J’ai compris que l’amour ne devait pas faire mal. Que je méritais d’exister aussi.',
                photoUrl: getAsset('demo-emotional-dependence', 3, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'Aimer sans [chaînes->peur]',
                description: 'Je t’aime librement. Et c’est encore plus beau.',
                photoUrl: getAsset('demo-emotional-dependence', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-on-off-love',
        experience: 'timeline',
        ownerName: 'Sarah',
        targetName: 'Yanis',
        musicUrl: getAsset('demo-on-off-love', 0, 'music'),
        finalMessage: 'On s’est toujours retrouvés. Comme si nos cœurs refusaient d’abandonner.',
        timelineEvents: [
            {
                date: 'La première fois',
                title: 'Se quitter pour la [première->énième] fois',
                description: 'On disait que c’était fini. On n’y croyait jamais vraiment.',
                photoUrl: getAsset('demo-on-off-love', 1, 'image')
            },
            {
                date: 'Les retours',
                title: 'Toujours revenir [l’un->l’une] vers l’autre',
                description: 'Chaque rupture nous brisait un peu plus… mais nous rapprochait aussi.',
                photoUrl: getAsset('demo-on-off-love', 2, 'image')
            },
            {
                date: 'Le ras-le-bol',
                title: 'Soit on s’aime, soit on [arrête->souffre]',
                description: 'Cette fois, on a décidé de se battre. Pour de vrai.',
                photoUrl: getAsset('demo-on-off-love', 3, 'image')
            },
            {
                date: 'Maintenant',
                title: 'Enfin [stables->ensemble]',
                description: 'On a choisi l’amour mature, pas l’amour qui fait mal.',
                photoUrl: getAsset('demo-on-off-love', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-unconditional-love',
        experience: 'timeline',
        ownerName: 'Lina',
        targetName: 'Hugo',
        musicUrl: getAsset('demo-unconditional-love', 0, 'music'),
        finalMessage: 'Je connais tes défauts, tes peurs, tes failles… et je t’aime quand même.',
        timelineEvents: [
            {
                date: 'Au début',
                title: 'Tomber amoureuse de tes [lumières->ombres]',
                description: 'Tu n’étais pas parfait. Moi non plus. Mais quelque chose était évident.',
                photoUrl: getAsset('demo-unconditional-love', 1, 'image')
            },
            {
                date: 'Les tempêtes',
                title: 'Quand l’amour est [mis->mis à] l’épreuve',
                description: 'La vie nous a frappés fort. On a douté. On a pleuré.',
                photoUrl: getAsset('demo-unconditional-love', 2, 'image')
            },
            {
                date: 'Le choix',
                title: 'Rester par [amour->conviction]',
                description: 'Ce n’était plus une question de facilité, mais de cœur.',
                photoUrl: getAsset('demo-unconditional-love', 3, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'Encore [là->ensemble]',
                description: 'Et malgré tout, je te choisis.',
                photoUrl: getAsset('demo-unconditional-love', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-dark-prison-love',
        experience: 'timeline',
        ownerName: 'Adrien',
        targetName: 'Léa',
        musicUrl: getAsset('demo-dark-prison-love', 0, 'music'),
        finalMessage: 'Je t’ai enfermée par peur de te perdre. Aujourd’hui, je t’aime assez pour t’ouvrir la porte.',
        timelineEvents: [
            {
                date: 'Au début',
                title: 'Tu étais mon [calme->monde]',
                description: 'Quand tu étais là, tout allait bien. J’avais besoin de toi pour me sentir entier. Je ne voyais pas encore que je te faisais porter un poids qui n’était pas le tien.',
                photoUrl: getAsset('demo-dark-prison-love', 1, 'image')
            },
            {
                date: 'Progressivement',
                title: 'Quand aimer devient [surveiller->contrôler]',
                description: 'Je voulais savoir où tu étais, avec qui, pourquoi. Je disais que c’était de l’amour. C’était de la peur.',
                photoUrl: getAsset('demo-dark-prison-love', 2, 'image')
            },
            {
                date: 'Le trop-plein',
                title: 'Le jour où tu as [suffoqué->craqué]',
                description: 'Tu as pleuré. Tu m’as dit que tu n’en pouvais plus. Je t’ai accusée d’exagérer.',
                photoUrl: getAsset('demo-dark-prison-love', 3, 'image')
            },
            {
                date: 'La fin',
                title: 'Te perdre pour comprendre',
                description: 'Quand tu es partie, j’ai compris que je t’avais aimée comme on possède, pas comme on respecte.',
                photoUrl: getAsset('demo-dark-prison-love', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-dark-words-hurt',
        experience: 'timeline',
        ownerName: 'Maxime',
        targetName: 'Inès',
        musicUrl: getAsset('demo-dark-words-hurt', 0, 'music'),
        finalMessage: 'Je ne pourrai jamais reprendre mes mots. Mais je peux enfin reconnaître ce qu’ils t’ont fait.',
        timelineEvents: [
            {
                date: 'Quand on allait bien',
                title: 'L’amour [simple->facile]',
                description: 'On riait. On se comprenait. Je me sentais fort avec toi.',
                photoUrl: getAsset('demo-dark-words-hurt', 1, 'image')
            },
            {
                date: 'Les disputes',
                title: 'Quand je voulais [gagner->blesser]',
                description: 'Au lieu de parler, j’attaquais. Je savais exactement quoi dire pour faire mal.',
                photoUrl: getAsset('demo-dark-words-hurt', 2, 'image')
            },
            {
                date: 'La fracture',
                title: 'Le regard que je n’oublierai jamais',
                description: 'Tu m’as regardé comme si tu ne me reconnaissais plus. J’avais gagné la dispute. J’avais perdu tout le reste.',
                photoUrl: getAsset('demo-dark-words-hurt', 3, 'image')
            },
            {
                date: 'Après',
                title: 'Comprendre trop tard',
                description: 'Le silence m’a appris ce que mes cris m’avaient caché.',
                photoUrl: getAsset('demo-dark-words-hurt', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-dark-collapse',
        experience: 'timeline',
        ownerName: 'Julien',
        targetName: 'Manon',
        musicUrl: getAsset('demo-dark-collapse', 0, 'music'),
        finalMessage: 'Je croyais que tu me complétais. J’ai compris que je devais d’abord me construire.',
        timelineEvents: [
            {
                date: 'Avant',
                title: 'Tu étais mon [équilibre->béquille]',
                description: 'Sans toi, je ne savais pas qui j’étais.',
                photoUrl: getAsset('demo-dark-collapse', 1, 'image')
            },
            {
                date: 'La rupture',
                title: 'Quand tout s’est écroulé',
                description: 'Tu es partie, et je n’avais plus rien. Plus de direction.',
                photoUrl: getAsset('demo-dark-collapse', 2, 'image')
            },
            {
                date: 'La chute',
                title: 'Me perdre sans toi',
                description: 'J’ai touché le fond. Et personne à blâmer que moi.',
                photoUrl: getAsset('demo-dark-collapse', 3, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'Me relever seul',
                description: 'Je ne te demande plus de me sauver.',
                photoUrl: getAsset('demo-dark-collapse', 4, 'image')
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
