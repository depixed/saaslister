import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  writeBatch,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';
import type { Directory } from '../types';

const COLLECTION_NAME = 'directories';

export async function getAllDirectories(): Promise<Directory[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Directory));
  } catch (error) {
    console.error('Error getting directories:', error);
    // Return empty array instead of throwing to handle offline gracefully
    return [];
  }
}

export async function getDirectoryById(id: string): Promise<Directory | undefined> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Directory;
    }
    return undefined;
  } catch (error) {
    console.error('Error getting directory:', error);
    return undefined;
  }
}

export async function createDirectory(directory: Omit<Directory, 'id'>): Promise<Directory> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...directory,
      createdAt: new Date().toISOString()
    });
    
    return {
      id: docRef.id,
      ...directory
    };
  } catch (error) {
    console.error('Error creating directory:', error);
    throw new Error('Failed to create directory');
  }
}

export async function updateDirectory(id: string, updates: Partial<Directory>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating directory:', error);
    throw new Error('Failed to update directory');
  }
}

export async function deleteDirectory(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting directory:', error);
    throw new Error('Failed to delete directory');
  }
}

export async function seedInitialData(directories: Omit<Directory, 'id'>[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    const collectionRef = collection(db, COLLECTION_NAME);
    
    directories.forEach((directory) => {
      const docRef = doc(collectionRef);
      batch.set(docRef, {
        ...directory,
        createdAt: new Date().toISOString()
      });
    });
    
    await batch.commit();
    console.log('Successfully seeded initial data');
  } catch (error) {
    console.error('Error seeding initial data:', error);
    throw new Error('Failed to seed initial data');
  }
}