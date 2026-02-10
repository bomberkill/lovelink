'use client';

import { useState } from 'react';
import { testFirebaseConnection } from '@/lib/firebaseUtils';

export default function TestFirebasePage() {
    const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleTest = async () => {
        setStatus('testing');
        setMessage('Testing Firebase connection...');

        try {
            const success = await testFirebaseConnection();
            if (success) {
                setStatus('success');
                setMessage('✅ Firebase connection successful! Firestore is working.');
            } else {
                setStatus('error');
                setMessage('❌ Firebase connection failed. Check console for details.');
            }
        } catch (error) {
            setStatus('error');
            setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    🔥 Firebase Test
                </h1>

                <div className="space-y-4">
                    <button
                        onClick={handleTest}
                        disabled={status === 'testing'}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'testing' ? 'Testing...' : 'Test Firebase Connection'}
                    </button>

                    {message && (
                        <div className={`p-4 rounded-lg ${status === 'success' ? 'bg-green-100 text-green-800' :
                                status === 'error' ? 'bg-red-100 text-red-800' :
                                    'bg-blue-100 text-blue-800'
                            }`}>
                            {message}
                        </div>
                    )}

                    <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Project:</strong> portfolio-237aa</p>
                        <p><strong>Storage Prefix:</strong> lovelink/</p>
                        <p><strong>Collection:</strong> lovePages</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
