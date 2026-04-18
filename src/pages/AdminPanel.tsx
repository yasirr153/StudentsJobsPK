import React from 'react';
import { Plus, Trash2, Edit3, CheckCircle, Clock, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, updateDoc, doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

export default function AdminPanel() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'pending' | 'active'>('active');
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'jobs'));
      const snapshot = await getDocs(q);
      setJobs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const handleAggregate = async () => {
     setIsProcessing(true);
     try {
       const response = await fetch('/api/admin/aggregate', { method: 'POST' });
       const result = await response.json();
       alert(result.message);
     } catch (error) {
       console.error("Aggregation failed:", error);
     } finally {
       setIsProcessing(false);
     }
  };

  const addSampleData = async () => {
    setIsProcessing(true);
    try {
      const sampleJobs = [
        {
          title: "Senior React Developer",
          company: "System Limited",
          location: "Lahore",
          job_type: "Full-time",
          category: "fresh-graduate",
          description: "We are looking for a senior developer...",
          summary: "Senior React role at Systems Limited Lahore.",
          apply_link: "https://systems.ltd/careers",
          status: "approved",
          createdAt: serverTimestamp(),
          tags: ["React", "TypeScript", "Node.js"]
        },
        {
          title: "UI/UX Design Intern",
          company: "Devsinc",
          location: "Remote",
          job_type: "Internship",
          category: "internship",
          description: "Passionate about design?",
          summary: "UI/UX Internship at Devsinc.",
          apply_link: "https://devsinc.com",
          status: "pending",
          createdAt: serverTimestamp(),
          tags: ["Figma", "Design", "UI"]
        }
      ];

      for (const job of sampleJobs) {
        const newDoc = doc(collection(db, 'jobs'));
        await setDoc(newDoc, job);
      }
      alert("Sample data added!");
      fetchJobs();
    } catch (error) {
       console.error("Failed to add sample data:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const approveJob = async (id: string) => {
    try {
      await updateDoc(doc(db, 'jobs', id), { status: 'approved' });
      fetchJobs();
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, 'jobs', id));
      fetchJobs();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredJobs = jobs.filter(j => activeTab === 'active' ? j.status === 'approved' : j.status === 'pending');

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 font-medium">Manage job listings and automated aggregation.</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={addSampleData}
               disabled={isProcessing}
               className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50"
             >
               Add Sample Jobs
             </button>
             <button 
               onClick={handleAggregate}
               disabled={isProcessing}
               className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
             >
               {isProcessing ? <Clock className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
               Run Aggregator
             </button>
             <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all">
               <Plus className="w-5 h-5" />
               New Job
             </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-8 py-5 text-sm font-bold tracking-wide uppercase transition-colors ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Active Listings
            </button>
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-8 py-5 text-sm font-bold tracking-wide uppercase transition-colors ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Pending Approval (5)
            </button>
          </div>

          <div className="p-0 overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="text-gray-400 font-medium italic">Synchronizing database...</span>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Job Details</th>
                    <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Source</th>
                    <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredJobs.length > 0 ? filteredJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 uppercase">
                            {job.title.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{job.title}</div>
                            <div className="text-xs text-gray-500 font-medium">{job.company} • {job.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-medium text-gray-600">{job.source || 'Manual'}</span>
                      </td>
                      <td className="px-8 py-5">
                         <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-full border border-green-100">
                           {job.category}
                         </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          {job.status === 'pending' && (
                            <button 
                              onClick={() => approveJob(job.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => deleteJob(job.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-400 font-medium italic">
                        No {activeTab} jobs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
