'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import ExperienceForm from '@/components/admin/ExperienceForm';
import ManageExperiences from '@/components/admin/ManageExperiences';
import { LovePage } from '@/lib/types';

// 🔒 SÉCURITÉ : Email(s) autorisé(s) via variable d'environnement
// Supporte plusieurs emails séparés par une virgule
const ALLOWED_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(email => email.trim());

export default function AdminDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    // Dashboard State
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
    const [selectedExperience, setSelectedExperience] = useState<LovePage | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("🔐 Auth Check:", {
                email: currentUser?.email,
                allowed: ALLOWED_EMAILS,
                env: process.env.NEXT_PUBLIC_EMAIL_ADDRESS
            });

            if (currentUser && currentUser.email) {
                if (ALLOWED_EMAILS.includes(currentUser.email)) {
                    console.log("✅ Access Granted");
                    setUser(currentUser);
                } else {
                    console.warn(`⛔ Unauthorized access attempt: ${currentUser.email}`);
                    signOut(auth);
                    setAuthError(`Compte ${currentUser.email} non autorisé.`);
                    setUser(null);
                }
            } else {
                console.log("👋 No user");
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        setAuthError('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: unknown) {
            console.error("Login failed", error);
            setAuthError("Connexion échouée. Vérifiez que votre email est autorisé.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    const handleEdit = (exp: LovePage) => {
        setSelectedExperience(exp);
        setView('edit');
    };

    const handleCreate = () => {
        setSelectedExperience(undefined);
        setView('create');
    };

    const handleSuccess = () => {
        setView('list');
        setSelectedExperience(undefined);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-passion-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-stone-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-stone-50 selection:bg-passion-100 selection:text-passion-900">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-passion-100/30 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-float-slow" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-gold-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-float-medium" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6 md:p-12">

                <AnimatePresence mode="wait">
                    {!user ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-md"
                        >
                            <Card variant="deep-glass" padding="xl" className="space-y-8 border-white/60 shadow-glass">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center text-white mb-2 shadow-xl">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                    <div className="text-center space-y-1">
                                        <Typography variant="h3" className="font-medium text-stone-900">Espace Créateur</Typography>
                                        <Typography variant="body" className="text-sm text-stone-500">Accès sécurisé pour les administrateurs LoveLink.</Typography>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={handleGoogleLogin}
                                            variant="ghost"
                                            className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all w-full justify-center"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="font-medium">Continuer avec Google</span>
                                        </Button>
                                    </div>

                                    {authError && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3"
                                        >
                                            <span className="text-lg">🚫</span>
                                            <div>
                                                <p className="font-bold">Accès Refusé</p>
                                                <p className="opacity-90">{authError}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-7xl relative z-10"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                                <div className="space-y-2">
                                    <Typography variant="caption" className="tracking-widest text-passion-800">TABLEAU DE BORD</Typography>
                                    <Typography variant="h2" className="text-4xl md:text-5xl text-stone-900">
                                        {view === 'list' ? 'Mes Histoires' : (view === 'create' ? 'Nouvelle Histoire' : 'Modifier l\'Histoire')}
                                    </Typography>
                                </div>
                                <div className="flex gap-4">
                                    {view !== 'list' && (
                                        <Button variant="ghost" size="sm" onClick={() => setView('list')}>← Retour liste</Button>
                                    )}
                                    <Button variant="ghost" size="sm" onClick={handleLogout}>Déconnexion</Button>
                                </div>
                            </div>

                            <Card variant="deep-glass" padding="none" className="overflow-hidden border-white/60 shadow-glass-lg flex flex-col md:flex-row min-h-[600px]">
                                {/* Left Sidebar - Navigation */}
                                <div className="w-full md:w-64 bg-stone-50/80 border-b md:border-b-0 md:border-r border-stone-100 p-6 space-y-8 backdrop-blur-sm flex-shrink-0">
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setView('list')}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${view === 'list' ? 'bg-white shadow-sm ring-1 ring-stone-200 font-medium text-passion-900' : 'text-stone-500 hover:bg-white/50'}`}
                                        >
                                            📂 Toutes les histoires
                                        </button>
                                        <button
                                            onClick={handleCreate}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${view === 'create' ? 'bg-white shadow-sm ring-1 ring-stone-200 font-medium text-passion-900' : 'text-stone-500 hover:bg-white/50'}`}
                                        >
                                            ✨ Créer une histoire
                                        </button>
                                    </div>

                                    <div className="pt-8 border-t border-stone-200/50">
                                        <Typography variant="body" className="text-xs text-stone-400 text-center">LoveLink Admin v1.0</Typography>
                                    </div>
                                </div>

                                {/* Right Content */}
                                <div className="flex-1 bg-white/40 p-6 md:p-12">
                                    {view === 'list' && (
                                        <ManageExperiences onEdit={handleEdit} onCreate={handleCreate} />
                                    )}

                                    {(view === 'create' || view === 'edit') && (
                                        <ExperienceForm
                                            initialData={selectedExperience}
                                            onSuccess={handleSuccess}
                                            onCancel={() => setView('list')}
                                        />
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
