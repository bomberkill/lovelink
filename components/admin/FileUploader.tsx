'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, STORAGE_PREFIX } from '@/lib/firebase';

interface FileUploaderProps {
    label: string;
    accept: string;
    multiple?: boolean;
    onUploadComplete: (urls: string[]) => void;
}

export default function FileUploader({ label, accept, multiple = false, onUploadComplete }: FileUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setProgress(0);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // Generate unique filename
                const timestamp = Date.now();
                const randomString = Math.random().toString(36).substring(7);
                const extension = file.name.split('.').pop();
                const filename = `${timestamp}_${randomString}.${extension}`;

                // Upload to Storage
                const storageRef = ref(storage, `${STORAGE_PREFIX}${filename}`);
                await uploadBytes(storageRef, file);

                // Get download URL
                const downloadURL = await getDownloadURL(storageRef);
                return downloadURL;
            });

            const urls = await Promise.all(uploadPromises);
            setUploadedFiles(urls);
            onUploadComplete(urls);
            setProgress(100);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Erreur lors de l\'upload des fichiers');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 disabled:opacity-50"
            />

            {uploading && (
                <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Upload en cours...</p>
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                    {uploadedFiles.map((url, index) => (
                        <div key={index} className="text-sm text-green-600 flex items-center gap-2">
                            <span>✓</span>
                            <span className="truncate">Fichier {index + 1} uploadé</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
