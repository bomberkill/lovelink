'use client';

import { useState } from 'react';
import { createExamplePage, createExampleTimelinePage } from '@/lib/createExamples';

export default function CreateExamplesPage() {
    const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [createdSlug, setCreatedSlug] = useState('');

    const handleCreateExample = async (type: 'simple' | 'timeline') => {
        setStatus('creating');
        setMessage(`Création de l'exemple ${type}...`);

        try {
            const page = type === 'simple'
                ? await createExamplePage()
                : await createExampleTimelinePage();

            setStatus('success');
            setCreatedSlug(page.slug);
            setMessage(`✅ Page créée avec succès !`);
        } catch (error) {
            setStatus('error');
            setMessage(`❌ Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    📝 Créer des exemples
                </h1>

                <div className="space-y-4">
                    <button
                        onClick={() => handleCreateExample('simple')}
                        disabled={status === 'creating'}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'creating' ? 'Création...' : 'Créer "Impossible de dire non"'}
                    </button>

                    <button
                        onClick={() => handleCreateExample('timeline')}
                        disabled={status === 'creating'}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'creating' ? 'Création...' : 'Créer "Live Story"'}
                    </button>

                    {message && (
                        <div className={`p-4 rounded-lg ${status === 'success' ? 'bg-green-100 text-green-800' :
                            status === 'error' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {message}
                        </div>
                    )}

                    {createdSlug && status === 'success' && (
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <p className="text-sm text-purple-800 mb-2">
                                <strong>Lien de la page:</strong>
                            </p>
                            <a
                                href={`/l/${createdSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 underline break-all"
                            >
                                /l/{createdSlug}
                            </a>
                        </div>
                    )}

                    <div className="text-sm text-gray-600 space-y-1 pt-4 border-t">
                        <p><strong>Note:</strong> Cette page est temporaire pour créer des exemples de test.</p>
                        <p className="text-xs text-gray-500">Les règles Firestore doivent autoriser l'écriture pour que cela fonctionne.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
