import { LovePage } from './types';

// --- CURATED ASSETS (5-6 Images, 3 Music Tracks) ---

// 1 Curated Local Track (Lightweight)
const SHARED_MUSIC = [
    '/romantic-piano.wav',
];

// 6 Curated High-Quality Images (Mood: Moody, Romantic, Soft)
const SHARED_IMAGES = [
    'https://images.unsplash.com/photo-1561442456-fca930364be4?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1557206843-1cf213a7a608?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZCUyMHJvbWFuY2V8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1601241682289-b7cf561b0f36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNhZCUyMHJvbWFuY2V8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=2500&auto=format&fit=crop', // Hands holding (Warm/Light)
    'https://images.unsplash.com/photo-1483135504826-f60ad6c7924e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FkJTIwbG92ZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1732668021356-ef63e3815996?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFsb25lJTIwY2l0eSUyMG5pZ2h0fGVufDB8fDB8fHww',// Couple walking away (Back view)
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2574&auto=format&fit=crop', // Book/Coffee/Cozy (Intimate)
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
    {
        slug: 'demo-suffocated-love',
        experience: 'timeline',
        ownerName: 'Anonyme',
        targetName: 'Alice',
        musicUrl: getAsset('demo-suffocated-love', 0, 'music'),
        finalMessage: "T'aimer n'était pas t'étouffer. Je l'ai compris trop tard.",
        timelineEvents: [
            {
                date: 'Début',
                title: 'Quand tout a commencé',
                description: `Je pensais que passer tout mon temps avec toi était une preuve d’amour. Quand tu me disais : “Je vais sortir avec les filles ce soir”, je répondais : “Ok.” Je souriais même.`,
                photoUrl: getAsset('demo-suffocated-love', 0, 'image')
            },
            {
                date: 'Plus tard',
                title: 'L’inquiétude silencieuse',
                description: `Puis je restais éveillé un peu plus longtemps que prévu. Je regardais l’heure. Je regardais si tu étais “en ligne”. Je posais mon téléphone. Je le reprenais. Je ne te faisais pas de scène. Je devenais simplement plus silencieux le lendemain.`,
                photoUrl: getAsset('demo-suffocated-love', 1, 'image')
            },
            {
                date: 'Un soir',
                title: 'Les petites fissures',
                description: `Tu me demandais : “Qu’est-ce qu’il y a ?” Et je disais : “Rien.” Mais il y avait quelque chose. Ce n’était pas de la jalousie violente. C’était plus discret que ça. Une sensation étrange quand j’imaginais que tu pouvais rire sans moi.`,
                photoUrl: getAsset('demo-suffocated-love', 2, 'image')
            },
            {
                date: 'Révélation',
                title: 'Apprendre à aimer différemment',
                description: `Je croyais que si on s’aimait vraiment, on devait toujours vouloir être ensemble. Je ne comprenais pas encore qu’aimer quelqu’un ce n’est pas avoir besoin qu’il soit dépendant. Alors j’ai commencé à poser des questions qui ressemblaient à de l’inquiétude. À faire des remarques qui ressemblaient à de l’humour. Rien de grave. Juste assez pour que tu te sentes un peu coupable d’être libre. Le jour où tu m’as dit : “Je t’aime, mais je respire moins”, j’ai senti quelque chose se fissurer. Pas entre nous. En moi. Je voulais être ton refuge. Je suis devenu ta limite. Aujourd’hui je comprends que l’amour n’étouffe pas. Ce sont les peurs qu’on cache dedans. Et la mienne était simple : si tu pouvais être heureuse sans moi, alors peut-être que je n’étais pas indispensable.`,
                photoUrl: getAsset('demo-suffocated-love', 3, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-chased-success',
        experience: 'timeline',
        ownerName: 'Thomas',
        targetName: 'Sarah',
        musicUrl: getAsset('demo-chased-success', 1, 'music'),
        finalMessage: "Le succès ne remplit les silences que si on a quelqu'un pour le célébrer.",
        timelineEvents: [
            {
                date: 'Début',
                title: 'Quand je courais après nous… et après moi',
                description: `Tu disais que tu étais fière de moi. Quand je travaillais tard. Quand j’annulais un dîner pour “un truc important”. Quand je répondais à mes mails pendant qu’on était ensemble. Tu disais que tu comprenais. Moi, je me répétais que c’était temporaire. Que c’était pour nous. Que plus tard, je serai plus présent. Je ne voyais pas que “plus tard” devenait un endroit où je te rangeais.`,
                photoUrl: getAsset('demo-chased-success', 4, 'image')
            },
            {
                date: 'Un soir',
                title: 'Le poids des petites attentions',
                description: `Un soir, tu avais préparé quelque chose. Rien d’extraordinaire. Juste un moment à deux. Je suis arrivé en retard. Encore. Tu n’as pas crié. Tu as juste dit : “J’aimerais parfois passer avant tes projets.” Je me suis défendu. J’ai parlé d’ambition. D’avenir. De sacrifices nécessaires.`,
                photoUrl: getAsset('demo-chased-success', 1, 'image')
            },
            {
                date: 'Prise de conscience',
                title: 'Comprendre ce que j’ai négligé',
                description: `Mais au fond, je crois que j’avais peur. Peur de ne rien devenir. Peur que sans réussite, je ne sois pas assez. Alors je me suis rendu indispensable ailleurs. Et j’ai supposé que toi, tu resterais.`,
                photoUrl: getAsset('demo-chased-success', 5, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'L’amour réel vs les priorités',
                description: `Je t’aimais. Mais je t’ai aimée comme une certitude, pas comme une priorité. Aujourd’hui je sais qu’on ne construit pas un futur solide en négligeant le présent fragile.`,
                photoUrl: getAsset('demo-chased-success', 6, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-left-to-discover',
        experience: 'timeline',
        ownerName: 'Clara',
        targetName: 'Julien',
        musicUrl: getAsset('demo-left-to-discover', 2, 'music'),
        finalMessage: "Il fallait qu'on se perde pour que je puisse enfin me trouver.",
        timelineEvents: [
            {
                date: 'Le départ',
                title: 'Quand tu as choisi de partir',
                description: `Quand tu m’as dit que tu avais besoin de vivre, j’ai entendu que je n’étais plus suffisante. Je n’ai pas pleuré devant toi. J’ai hoché la tête. J’ai dit que je comprenais.`,
                photoUrl: getAsset('demo-left-to-discover', 0, 'image')
            },
            {
                date: 'Seule',
                title: 'Regarder ce qui était à nous',
                description: `Puis je suis rentrée chez moi et j’ai regardé nos photos comme si elles appartenaient déjà à quelqu’un d’autre. Je me suis comparée. À celles qui semblaient plus libres. Plus légères. Moins attachées.`,
                photoUrl: getAsset('demo-left-to-discover', 1, 'image')
            },
            {
                date: 'Réflexion',
                title: 'Comprendre sans rancune',
                description: `Je me suis demandé si j’avais été trop stable. Trop présente. Trop “acquise”. Je ne comprenais pas comment on pouvait aimer et vouloir partir en même temps. Avec le temps, j’ai compris quelque chose de moins violent : tu n’étais pas contre moi. Tu étais contre l’idée de te figer trop tôt.`,
                photoUrl: getAsset('demo-left-to-discover', 2, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'Exister seule',
                description: `Moi, je m’étais construite autour de nous. Toi, tu voulais encore te construire tout court. Ça a fait mal. Mais j’ai découvert que je pouvais exister seule.`,
                photoUrl: getAsset('demo-left-to-discover', 3, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-never-assumed',
        experience: 'timeline',
        ownerName: 'Anonyme',
        targetName: 'Sophie',
        musicUrl: getAsset('demo-never-assumed', 3, 'music'),
        finalMessage: "L'amour ne se cache pas. Soit on le vit, soit on le perd.",
        timelineEvents: [
            {
                date: 'Au début',
                title: 'L’amour discret',
                description: `Je disais que je n’aimais pas exposer ma vie. Que les réseaux, ce n’était pas important. Que l’amour n’avait pas besoin d’être affiché. C’était presque crédible.`,
                photoUrl: getAsset('demo-never-assumed', 4, 'image')
            },
            {
                date: 'La peur',
                title: 'Quand aimer devient silence',
                description: `Mais la vérité, c’est que j’avais peur. Peur des remarques. Peur qu’on me dise que je pouvais “mieux faire”. Peur que mes amis ne comprennent pas. Alors je t’aimais discrètement. Trop discrètement.`,
                photoUrl: getAsset('demo-never-assumed', 1, 'image')
            },
            {
                date: 'Les apparences',
                title: 'Changer juste assez',
                description: `Quand on croisait quelqu’un que je connaissais, je changeais légèrement d’attitude. Rien d’évident. Juste assez pour que tu le sentes. Tu ne demandais pas des photos. Tu demandais de la clarté.`,
                photoUrl: getAsset('demo-never-assumed', 5, 'image')
            },
            {
                date: 'La prise de conscience',
                title: 'Le jour où tu as parlé',
                description: `Le jour où tu m’as dit : “Je ne veux pas être une partie cachée de ta vie”, j’ai compris que le silence peut ressembler à de la honte.`,
                photoUrl: getAsset('demo-never-assumed', 6, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-almost-lost',
        experience: 'timeline',
        ownerName: 'Lucas',
        targetName: 'Emma',
        musicUrl: getAsset('demo-almost-lost', 4, 'music'),
        finalMessage: "Il n'y a pas de filtre plus beau que la réalité de tes yeux.",
        timelineEvents: [
            {
                date: 'Au début',
                title: 'Notre quotidien',
                description: `On allait bien. On riait. On parlait de tout. On n’avait pas grand-chose, mais on était tranquilles.`,
                photoUrl: getAsset('demo-almost-lost', 0, 'image')
            },
            {
                date: 'La distraction',
                title: 'Regarder ailleurs',
                description: `Puis j’ai commencé à regarder ailleurs. Pas vers quelqu’un. Vers des images. Des couples parfaits. Des surprises filmées. Des voyages spontanés. Notre quotidien a commencé à me sembler ordinaire.`,
                photoUrl: getAsset('demo-almost-lost', 1, 'image')
            },
            {
                date: 'La confrontation',
                title: 'Question directe',
                description: `Un soir, tu m’as demandé : “Pourquoi tu as l’air ailleurs ces derniers temps ?” Je n’ai pas su répondre. Parce que comment expliquer qu’on peut être insatisfait d’une réalité sincère à cause d’illusions bien montées ?`,
                photoUrl: getAsset('demo-almost-lost', 2, 'image')
            },
            {
                date: 'La leçon',
                title: 'L’amour réel',
                description: `J’ai failli te faire porter le poids d’une comparaison injuste. Ce que je n’avais pas compris, c’est que l’amour réel ne performe pas. Il ne cherche pas l’applaudissement. Il vit dans des gestes simples qu’aucune caméra ne trouve intéressants. Et c’est peut-être pour ça qu’il est vrai.`,
                photoUrl: getAsset('demo-almost-lost', 3, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        slug: 'demo-silent-treatment',
        experience: 'timeline',
        ownerName: 'Anonyme',
        targetName: 'Léa',
        musicUrl: getAsset('demo-silent-treatment', 5, 'music'),
        finalMessage: "Mon silence t'a blessé plus que n'importe quelle parole. Désolé.",
        timelineEvents: [
            {
                date: 'Le début',
                title: 'Quand le silence est devenu [léger->pesant]',
                description: `Tu me demandais ce qui n’allait pas. Je répondais : “Rien.” Je pensais que si je ne disais rien, ça allait passer. Mais ça ne passait pas. Ça s’accumulait, invisible, comme une pluie fine qui trempe tout doucement.`,
                photoUrl: getAsset('demo-silent-treatment', 4, 'image')
            },
            {
                date: 'Un soir',
                title: 'La tension [silencieuse->invisible]',
                description: `Un soir, tu as essayé de parler. Tu as posé des questions. J’ai répondu par monosyllabes. Je ne voulais pas créer de conflit. Mais en évitant le conflit, j’ai créé autre chose. Une distance. Froide. Inexpliquée. Tu souriais, mais je sentais ton cœur reculer.`,
                photoUrl: getAsset('demo-silent-treatment', 1, 'image')
            },
            {
                date: 'Prise de conscience',
                title: 'Comprendre l’impact de mon silence',
                description: `Je croyais que si je ne disais rien, je te protégeais. En réalité, je te faisais douter. Je te faisais imaginer le pire. Je te faisais sentir que tu étais responsable de mon mal-être. Sans jamais te dire pourquoi. Et chaque regard que tu baissais me tordait l’estomac.`,
                photoUrl: getAsset('demo-silent-treatment', 5, 'image')
            },
            {
                date: 'Aujourd’hui',
                title: 'Le poids des [non-dits->silences]',
                description: `Je t’aimais. Mais je t’ai fait sentir que mon silence était plus lourd que mes mots. Aujourd’hui je sais que le silence n’est pas neutre. C’est une réponse. Et parfois, c’est la plus blessante. J’aimerais pouvoir revenir en arrière et réécrire chaque moment où je t’ai laissé deviner mes peurs.`,
                photoUrl: getAsset('demo-silent-treatment', 6, 'image')
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
