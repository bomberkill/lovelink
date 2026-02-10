'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LovePage } from '@/lib/types';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { motion, AnimatePresence } from 'framer-motion';

interface ManageExperiencesProps {
    onEdit: (experience: LovePage) => void;
    onCreate: () => void;
}

export default function ManageExperiences({ onEdit, onCreate }: ManageExperiencesProps) {
    const [experiences, setExperiences] = useState<LovePage[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchExperiences = async () => {
        try {
            const q = query(collection(db, 'lovePages'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetched: LovePage[] = [];
            querySnapshot.forEach((doc) => {
                fetched.push(doc.data() as LovePage);
            });
            setExperiences(fetched);
        } catch (error) {
            console.error("Error fetching experiences:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleDelete = async (slug: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette histoire ? C\'est irréversible.')) return;

        setDeletingId(slug);
        try {
            await deleteDoc(doc(db, 'lovePages', slug));
            setExperiences(prev => prev.filter(e => e.slug !== slug));
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Erreur lors de la suppression");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return <div className="p-12 text-center text-stone-400">Chargement des histoires...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <Typography variant="h3" className="text-xl font-medium text-stone-800">
                    Histoires Existantes ({experiences.length})
                </Typography>
                <Button variant="luxury" size="sm" onClick={onCreate}>
                    + Nouvelle Histoire
                </Button>
            </div>

            {experiences.length === 0 ? (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center space-y-4">
                    <div className="text-4xl">📭</div>
                    <Typography variant="body" className="text-stone-500">
                        Aucune histoire pour le moment.
                    </Typography>
                    <Button variant="ghost" className="border border-stone-200" onClick={onCreate}>Créer la première</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence>
                        {experiences.map((exp) => (
                            <motion.div
                                key={exp.slug}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white border border-stone-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Typography variant="h3" className="text-lg font-serif italic text-passion-900">
                                            {exp.ownerName} & {exp.targetName}
                                        </Typography>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide font-bold ${exp.experience === 'timeline' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {exp.experience === 'timeline' ? 'Timeline' : 'Question'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-stone-400">
                                        <span>🔗 /l/{exp.slug}</span>
                                        <span>📅 {new Date(exp.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <a
                                        href={`/l/${exp.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 text-stone-500 hover:text-passion-600 transition-colors text-sm bg-stone-50 hover:bg-passion-50 rounded-lg flex-1 md:flex-none text-center"
                                        title="Voir"
                                    >
                                        👁️ Voir
                                    </a>
                                    <button
                                        onClick={() => onEdit(exp)}
                                        className="px-3 py-2 text-stone-500 hover:text-blue-600 transition-colors text-sm bg-stone-50 hover:bg-blue-50 rounded-lg flex-1 md:flex-none text-center"
                                        title="Éditer"
                                    >
                                        ✏️ Éditer
                                    </button>
                                    <button
                                        onClick={() => handleDelete(exp.slug)}
                                        disabled={deletingId === exp.slug}
                                        className="px-3 py-2 text-stone-500 hover:text-red-600 transition-colors text-sm bg-stone-50 hover:bg-red-50 rounded-lg flex-1 md:flex-none text-center"
                                        title="Supprimer"
                                    >
                                        {deletingId === exp.slug ? '...' : '🗑️'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
