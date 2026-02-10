'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LovePage } from '@/lib/types';
import { getExperienceComponent } from '@/lib/experienceMapper';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function LovePageRoute({ params }: PageProps) {
    const [lovePage, setLovePage] = useState<LovePage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [slug, setSlug] = useState<string>('');

    useEffect(() => {
        params.then((resolvedParams) => {
            setSlug(resolvedParams.slug);
        });
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        async function fetchLovePage() {
            try {
                setLoading(true);
                const docRef = doc(db, 'lovePages', slug);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setLovePage(docSnap.data() as LovePage);
                } else {
                    setError('Cette page n\'existe pas 💔');
                }
            } catch (err) {
                console.error('Error fetching love page:', err);
                setError('Une erreur est survenue lors du chargement de la page');
            } finally {
                setLoading(false);
            }
        }

        fetchLovePage();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-solid mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium">Chargement de votre page...</p>
                </div>
            </div>
        );
    }

    if (error || !lovePage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
                    <div className="text-6xl mb-4">💔</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Page introuvable</h1>
                    <p className="text-gray-600">{error || 'Cette page n\'existe pas'}</p>
                </div>
            </div>
        );
    }

    // Get the appropriate experience component
    const ExperienceComponent = getExperienceComponent(lovePage);

    if (!ExperienceComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Type d'expérience inconnu</h1>
                    <p className="text-gray-600">Cette expérience n'est pas encore supportée.</p>
                </div>
            </div>
        );
    }

    return <ExperienceComponent lovePage={lovePage} />;
}

