import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC2wz3iqq2Vav3oHlNnuqHEMMCQWN8FGJ4",
  authDomain: "saaslister.firebaseapp.com",
  projectId: "saaslister",
  storageBucket: "saaslister.firebasestorage.app",
  messagingSenderId: "1049699342423",
  appId: "1:1049699342423:web:2b6f9a931a72e2b25aeb12",
  measurementId: "G-YQTKD4Y90P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence enabled in first tab only');
  } else if (err.code === 'unimplemented') {
    console.warn('Browser doesn\'t support persistence');
  }
});

// Initialize analytics only in production
let analytics = null;
if (import.meta.env.PROD) {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { analytics };
export default app;