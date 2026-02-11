'use client';

import ExperienceForm from '@/components/admin/ExperienceForm';
import Typography from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ImpossibleToSayNoPublicPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-stone-50 relative overflow-x-hidden selection:bg-passion-100 selection:text-passion-900">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-passion-100/30 rounded-full blur-[120px] mix-blend-multiply animate-float-slow" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-gold-100/40 rounded-full blur-[100px] mix-blend-multiply animate-float-medium" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
                <div className="text-center space-y-4 mb-16">
                    <Link href="/" className="inline-block hover:scale-105 transition-transform mb-4">
                        <span className="text-4xl">💌</span>
                    </Link>
                    <Typography variant="h1" className="text-5xl md:text-6xl text-passion-900 font-serif">
                        Impossible de dire Non
                    </Typography>
                    <Typography variant="body" className="max-w-xl mx-auto text-stone-600 text-lg">
                        Créez gratuitement votre propre page de demande interactive. <br />
                    </Typography>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-12">
                    <h1 className="text-4xl text-passion-900 font-serif mb-4">Créer &quot;Impossible de dire non&quot; 💔</h1>
                    <p className="text-stone-600 mb-8">
                        Personnalisez cette expérience unique pour une demande en mariage, une Saint-Valentin, ou juste pour jouer avec les nerfs de votre moitié(e).
                        Le bouton &quot;Non&quot; fuira la souris/le doigt, rendant le &quot;Oui&quot; inévitable !
                    </p>

                    <ExperienceForm
                        lockedExperienceType="impossible-to-say-no"
                        onSuccess={() => {
                            // Success handled by component
                        }}
                        onCancel={() => router.push('/')}
                    />

                    <p className="text-xs text-center text-stone-400 mt-8">
                        C&apos;est gratuit et instantané.
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <Typography variant="caption" className="text-stone-400">
                        Psst... Vous pouvez aussi créer une <Link href="/admin/create" className="text-passion-600 underline">Live Story</Link> ou une Timeline.
                        C&apos;est vous le chef.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
