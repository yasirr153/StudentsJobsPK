import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Globe, ArrowLeft, Share2, Bookmark, ShieldCheck, Sparkles, Send, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { getJobById, saveJob, unsaveJob } from '../services/jobService';
import { Job } from '../components/JobCard';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function JobDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleSave = async () => {
    if (!user || !id) return;
    setIsSaving(true);
    try {
      await saveJob(user.uid, id);
      alert("Job saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <span className="text-gray-500 font-medium">Loading job details...</span>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50/30 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to all jobs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
                  <img src={job.logoUrl} alt={job.company} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 capitalize">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-blue max-w-none">
                <ReactMarkdown>{job.description || ''}</ReactMarkdown>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4" />
                AI Smart Apply
              </div>
              <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
                This job matches your skill profile perfectly. Apply now to get prioritized by our AI matching engine.
              </p>
              
              <div className="space-y-3">
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20"
                >
                  <Send className="w-5 h-5" />
                  Apply Externally
                </a>
                <button 
                  onClick={handleSave}
                  disabled={isSaving || !user}
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Bookmark className={cn("w-5 h-5", isSaving && "animate-pulse")} />
                  {isSaving ? 'Saving...' : 'Save this job'}
                </button>
                {!user && (
                  <p className="text-[10px] text-center text-gray-400 font-medium">Login to save jobs and apply</p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-sm font-bold text-gray-900">Job Share</h4>
                   <button className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-blue-600">
                     <Share2 className="w-4 h-4" />
                   </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Recruitment
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
