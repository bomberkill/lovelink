'use client';

import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LovePage, TimelineEvent } from '@/lib/types';
import FileUploader from './FileUploader';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import ShareButton from '@/components/ui/ShareButton';

interface ExperienceFormProps {
    initialData?: LovePage;
    onSuccess?: () => void;
    onCancel?: () => void;
    lockedExperienceType?: 'impossible-to-say-no' | 'timeline';
}

export default function ExperienceForm({ initialData, onSuccess, onCancel, lockedExperienceType }: ExperienceFormProps) {
    const [formData, setFormData] = useState({
        slug: '',
        experience: lockedExperienceType || 'impossible-to-say-no',
        ownerName: '',
        targetName: '',
        question: '',
        finalMessage: '',
        musicUrl: '',
        photos: [] as string[],
    });

    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
        { date: '', title: '', description: '' }
    ]);

    const [creating, setCreating] = useState(false);
    const [createdSlug, setCreatedSlug] = useState('');
    const [error, setError] = useState('');

    // Load initial data if editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                slug: initialData.slug,
                experience: initialData.experience,
                ownerName: initialData.ownerName,
                targetName: initialData.targetName,
                question: initialData.question || '',
                finalMessage: initialData.finalMessage || '',
                musicUrl: initialData.musicUrl || '',
                photos: initialData.photos || [],
            });
            if (initialData.timelineEvents) {
                setTimelineEvents(initialData.timelineEvents);
            }
        }
    }, [initialData]);

    const generateSlug = () => {
        const ownerSlug = formData.ownerName.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const targetSlug = formData.targetName.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return `${ownerSlug}-pour-${targetSlug}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setError('');

        try {
            const slug = formData.slug || generateSlug();

            const lovePageData: LovePage = {
                slug,
                experience: formData.experience,
                ownerName: formData.ownerName,
                targetName: formData.targetName,
                finalMessage: formData.finalMessage,
                createdAt: initialData?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            if (formData.experience === 'impossible-to-say-no') {
                lovePageData.question = formData.question;
            } else if (formData.experience === 'timeline') {
                lovePageData.timelineEvents = timelineEvents.filter(
                    event => event.date && event.title
                );
                lovePageData.photos = formData.photos;
                lovePageData.musicUrl = formData.musicUrl;
            }

            if (initialData) {
                // Update existing
                await updateDoc(doc(db, 'lovePages', initialData.slug), lovePageData as object);
            } else {
                // Create new
                await setDoc(doc(db, 'lovePages', slug), lovePageData);
                setCreatedSlug(slug);
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Error saving page:', err);
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setCreating(false);
        }
    };

    const addTimelineEvent = () => {
        setTimelineEvents([...timelineEvents, { date: '', title: '', description: '' }]);
    };

    const updateTimelineEvent = (index: number, field: keyof TimelineEvent, value: string) => {
        const updated = [...timelineEvents];
        updated[index] = { ...updated[index], [field]: value };
        setTimelineEvents(updated);
    };

    const removeTimelineEvent = (index: number) => {
        setTimelineEvents(timelineEvents.filter((_, i) => i !== index));
    };

    if (createdSlug) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center justify-center h-full space-y-8"
            >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-4xl shadow-lg border border-green-100">
                    🎉
                </div>

                <div className="space-y-2">
                    <Typography variant="h2" className="text-3xl text-stone-900">Magie opérée !</Typography>
                    <Typography variant="body" className="text-stone-500">Votre page d&apos;amour est prête à être partagée.</Typography>
                </div>

                <Card variant="solid" padding="md" className="w-full max-w-lg bg-stone-50 border-stone-200">
                    <Typography variant="caption" className="text-left mb-2 block">LIEN UNIQUE</Typography>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-stone-200">
                        <span className="text-stone-400">🔗</span>
                        <a
                            href={`/l/${createdSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-passion-600 hover:text-passion-800 underline break-all font-medium flex-1 text-left"
                        >
                            {typeof window !== 'undefined' ? window.location.origin : ''}/l/{createdSlug}
                        </a>
                        <div className="flex-shrink-0">
                            <ShareButton
                                title={`Pour ${formData.targetName} 💌`}
                                text="J'ai créé une surprise pour toi..."
                                url={`${typeof window !== 'undefined' ? window.location.origin : ''}/l/${createdSlug}`}
                                variant="ghost"
                            />
                        </div>
                    </div>
                </Card>

                <Button
                    onClick={() => {
                        // Redirect to the created page
                        window.location.href = `/l/${createdSlug}`;
                    }}
                    variant="luxury"
                    className="shadow-xl"
                >
                    Continuer & Voir
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto pb-12">

            {initialData && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">✏️</span>
                        <div>
                            <Typography variant="h3" className="text-sm font-bold text-blue-900">Mode Édition</Typography>
                            <Typography variant="body" className="text-xs text-blue-600">Vous modifiez l&apos;histoire de {initialData.ownerName} & {initialData.targetName}</Typography>
                        </div>
                    </div>
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="text-xs text-blue-500 hover:text-blue-700 underline">
                            Annuler
                        </button>
                    )}
                </div>
            )}

            {/* Section 1: Qui ? */}
            <div className="space-y-6">
                <Typography variant="h3" className="text-lg font-medium text-stone-800 border-b border-stone-100 pb-2">
                    Les Protagonistes
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="De la part de (Owner)"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        required
                        placeholder="Ex: Roméo"
                        className="bg-white"
                    />
                    <Input
                        label="Pour (Target)"
                        value={formData.targetName}
                        onChange={(e) => setFormData({ ...formData, targetName: e.target.value })}
                        required
                        placeholder="Ex: Juliette"
                        className="bg-white"
                    />
                </div>
            </div>

            {/* Section 2: Quoi ? */}
            <div className="space-y-6">
                {!lockedExperienceType && (
                    <Typography variant="h3" className="text-lg font-medium text-stone-800 border-b border-stone-100 pb-2">
                        L&apos;Expérience
                    </Typography>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {!lockedExperienceType && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-stone-500 pl-1">Type d&apos;expérience</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['impossible-to-say-no', 'timeline'].map((type) => (
                                    <div
                                        key={type}
                                        onClick={() => setFormData({ ...formData, experience: type as "impossible-to-say-no" | "timeline" })}
                                        className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${formData.experience === type
                                            ? 'bg-passion-50 border-passion-500 ring-1 ring-passion-500 shadow-sm'
                                            : 'bg-white border-stone-200 hover:border-stone-400'
                                            }`}
                                    >
                                        <div className="font-medium text-stone-900 mb-1">
                                            {type === 'impossible-to-say-no' ? 'Impossible de dire non 💌' : 'Timeline Notre Histoire 🕰️'}
                                        </div>
                                        <div className="text-xs text-stone-500 leading-relaxed">
                                            {type === 'impossible-to-say-no'
                                                ? 'Une question interactive avec un "Non" fuyant.'
                                                : 'Une chronologie multimédia de vos moments forts.'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest uppercase text-stone-500 pl-1">URL Personnalisée (Slug)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">/l/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                                className={`w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-passion-500/20 focus:border-passion-500 outline-none transition-all placeholder:text-stone-300 ${initialData ? 'opacity-50 cursor-not-allowed bg-stone-100' : ''}`}
                                placeholder={formData.ownerName && formData.targetName ? `${formData.ownerName.toLowerCase()}-pour-${formData.targetName.toLowerCase()}` : "mon-lien-unique"}
                                disabled={!!initialData}
                            />
                        </div>
                        {initialData && <p className="text-[10px] text-stone-400 pl-1">L&apos;URL ne peut pas être modifiée une fois créée.</p>}
                    </div>
                </div>
            </div>

            {/* Section 3: Détails Spécifiques */}
            <div className="space-y-6">
                <Typography variant="h3" className="text-lg font-medium text-stone-800 border-b border-stone-100 pb-2">
                    Personnalisation
                </Typography>

                {formData.experience === 'impossible-to-say-no' && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700 mb-2 block">La Question Fatidique</label>
                            <textarea
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                required
                                placeholder="Veux-tu être ma Valentine ?"
                                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-passion-500/20 focus:border-passion-500 outline-none transition-all text-lg"
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {formData.experience === 'timeline' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="bg-stone-50/50 border border-stone-200 rounded-xl p-6 space-y-4 relative group hover:border-stone-300 transition-colors">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Événement #{index + 1}</span>
                                    {timelineEvents.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTimelineEvent(index)}
                                            className="text-stone-400 hover:text-red-500 transition-colors text-sm"
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="date"
                                        value={event.date}
                                        onChange={(e) => updateTimelineEvent(index, 'date', e.target.value)}
                                        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-passion-500/20 outline-none"
                                        required
                                    />
                                    <div className="md:col-span-2 space-y-1 relative">
                                        <input
                                            type="text"
                                            value={event.title}
                                            onChange={(e) => updateTimelineEvent(index, 'title', e.target.value)}
                                            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-passion-500/20 outline-none font-medium pr-24"
                                            placeholder="Titre (ex: Notre Rencontre)"
                                            required
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                            <button
                                                type="button"
                                                onClick={() => updateTimelineEvent(index, 'title', event.title + " [erreur->correction]")}
                                                className="text-[10px] text-stone-400 hover:text-passion-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-stone-100 shadow-sm transition-colors"
                                                title="Ajouter un effet de correction"
                                            >
                                                ✨ Hésitation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 relative">
                                    <textarea
                                        value={event.description}
                                        onChange={(e) => updateTimelineEvent(index, 'description', e.target.value)}
                                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-passion-500/20 outline-none"
                                        placeholder="Racontez ce moment..."
                                        rows={2}
                                    />
                                    <div className="absolute right-2 bottom-2">
                                        <button
                                            type="button"
                                            onClick={() => updateTimelineEvent(index, 'description', event.description + " [erreur->correction]")}
                                            className="text-[10px] text-stone-400 hover:text-passion-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-stone-100 shadow-sm transition-colors"
                                            title="Ajouter un effet de correction"
                                        >
                                            ✨ Hésitation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={addTimelineEvent}
                            className="w-full text-sm py-3 border-dashed border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400"
                        >
                            + Ajouter un moment clé
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <FileUploader
                                label="Galerie Photos"
                                accept="image/*"
                                multiple
                                onUploadComplete={(urls) => setFormData({ ...formData, photos: urls })}
                            />
                            <FileUploader
                                label="Musique d'ambiance"
                                accept="audio/*"
                                onUploadComplete={(urls) => setFormData({ ...formData, musicUrl: urls[0] || '' })}
                            />
                        </div>
                    </motion.div>
                )}

                <div className="pt-4">
                    <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold tracking-widest uppercase text-stone-500 pl-1 block">Message Final</label>
                        <button
                            type="button"
                            onClick={() => {
                                const tag = "[erreur->correction]";
                                setFormData(prev => ({ ...prev, finalMessage: prev.finalMessage + tag }));
                            }}
                            className="text-xs text-passion-600 hover:text-passion-800 bg-passion-50 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                        >
                            <span>✨</span> Insérer une hésitation
                        </button>
                    </div>
                    <textarea
                        value={formData.finalMessage}
                        onChange={(e) => setFormData({ ...formData, finalMessage: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-passion-500/20 focus:border-passion-500 outline-none transition-all"
                        rows={4}
                        placeholder="Le mot de la fin..."
                        required
                    />
                    <p className="text-[10px] text-stone-400 mt-1 pl-1">
                        Astuce : Écrivez naturellement, les apostrophes ( &apos; ) sont supportées ! <br />
                        Utilisez <code>[triste-&gt;heureux]</code> pour l&apos;effet de correction automatique.
                    </p>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-3"
                >
                    <span className="text-lg">⚠️</span>
                    {error}
                </motion.div>
            )}

            <div className="pt-8 border-t border-stone-100 flex gap-4">
                {onCancel && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                        className="flex-1"
                    >
                        Annuler
                    </Button>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="luxury"
                    size="lg"
                    disabled={creating}
                    className="shadow-magnetic hover:shadow-xl flex-[2]"
                >
                    {creating ? 'Sauvegarde...' : (initialData ? 'Mettre à jour ✨' : 'Générer l\'Expérience ✨')}
                </Button>
            </div>
        </form>
    );
}
