import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD4eGmm102BZTcB7b7_sX7LqbzRyzADB-0",
  authDomain: "portfolio-237aa.firebaseapp.com",
  projectId: "portfolio-237aa",
  storageBucket: "nobisoft-nextjs-website.appspot.com",
  messagingSenderId: "10697683869",
  appId: "1:10697683869:web:28889247a9dbe48ac8b574"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth
import { getAuth } from 'firebase/auth';
export const auth = getAuth(app);

// Storage path prefix for LoveLink project
export const STORAGE_PREFIX = 'lovelink/';
