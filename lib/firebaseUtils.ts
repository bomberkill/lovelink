import { db, storage, STORAGE_PREFIX } from './firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Get a reference to the lovePages collection
 */
export const lovePagesCollection = collection(db, 'lovePages');

/**
 * Get a storage reference with the lovelink prefix
 * @param path - Path within the lovelink folder (e.g., 'photos/image.jpg')
 */
export function getStorageRef(path: string) {
    return ref(storage, `${STORAGE_PREFIX}${path}`);
}

/**
 * Upload a file to Firebase Storage in the lovelink folder
 * @param file - File to upload
 * @param path - Path within lovelink folder
 * @returns Download URL
 */
export async function uploadFile(file: File, path: string): Promise<string> {
    const storageRef = getStorageRef(path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}

/**
 * Test Firebase connection by creating a test document
 */
export async function testFirebaseConnection() {
    try {
        const testDocRef = doc(db, 'lovePages', '_test');
        await setDoc(testDocRef, {
            test: true,
            timestamp: new Date().toISOString()
        });

        const docSnap = await getDoc(testDocRef);
        return docSnap.exists();
    } catch (error) {
        console.error('Firebase connection test failed:', error);
        return false;
    }
}
