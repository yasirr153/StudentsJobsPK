import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Job } from '../components/JobCard';

const JOBS_COLLECTION = 'jobs';

export async function getApprovedJobs(filters?: { type?: string, category?: string }) {
  let q = query(
    collection(db, JOBS_COLLECTION),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc')
  );

  if (filters?.type) {
    q = query(q, where('job_type', '==', filters.type));
  }
  if (filters?.category) {
    q = query(q, where('category', '==', filters.category));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    postedAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Job[];
}

export async function getJobById(id: string) {
  const jobDoc = await getDoc(doc(db, JOBS_COLLECTION, id));
  if (!jobDoc.exists()) return null;
  return {
    id: jobDoc.id,
    ...jobDoc.data(),
    postedAt: jobDoc.data().createdAt?.toDate() || new Date(),
  } as Job;
}

export async function saveJob(userId: string, jobId: string) {
  const saveRef = doc(db, 'users', userId, 'savedJobs', jobId);
  await setDoc(saveRef, {
    savedAt: serverTimestamp()
  });
}

export async function unsaveJob(userId: string, jobId: string) {
  const saveRef = doc(db, 'users', userId, 'savedJobs', jobId);
  await deleteDoc(saveRef);
}

export async function getSavedJobs(userId: string) {
  const q = query(collection(db, 'users', userId, 'savedJobs'), orderBy('savedAt', 'desc'));
  const snapshot = await getDocs(q);
  const jobIds = snapshot.docs.map(doc => doc.id);
  
  if (jobIds.length === 0) return [];
  
  const jobs: Job[] = [];
  for (const id of jobIds) {
    const job = await getJobById(id);
    if (job) jobs.push(job);
  }
  return jobs;
}
