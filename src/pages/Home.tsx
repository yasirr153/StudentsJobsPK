import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import JobCard, { Job } from '../components/JobCard';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApprovedJobs } from '../services/jobService';

export default function Home() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const approvedJobs = await getApprovedJobs();
        setJobs(approvedJobs.slice(0, 3)); // Only show top 3 for home
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryGrid />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Featured Opportunities</h2>
              <p className="text-gray-600 font-medium">Handpicked jobs for students and fresh graduates.</p>
            </div>
            <Link to="/jobs" className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              View All Jobs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <span>Checking for latest opportunities...</span>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 border border-gray-100 rounded-3xl">
              <p className="text-gray-500 font-medium">No active jobs found. Check back later!</p>
            </div>
          )}

          {/* AI Tools Promo Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border border-border-main p-10 rounded-[2rem] shadow-xl shadow-black/5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 font-bold text-[10px] text-primary uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" />
                Next-Gen Career Tools
              </div>
              <h3 className="text-4xl font-black text-text-main italic mb-6 leading-tight">
                Land Your Dream Job <br />
                <span className="text-primary italic">Faster with AI.</span>
              </h3>
              <p className="text-text-muted font-medium mb-8 leading-relaxed">
                Applying for jobs shouldn't be a full-time job. Use our AI-powered suite to generate professional cover letters, fix your CV, and simplify complex job descriptions in seconds.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "AI Cover Letter Generator",
                  "Resume Grammarian",
                  "Job Description Simplifier",
                  "Skill Extractor Engine"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-bold text-text-main">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/tools"
                className="mt-10 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                Try AI Tools for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative aspect-square md:aspect-auto md:h-[500px] bg-app-bg rounded-3xl border border-border-main overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                 className="w-full max-w-[80%] p-6 bg-white border border-border-main rounded-2xl shadow-2xl relative z-10"
               >
                 <div className="flex items-center gap-2 mb-4">
                   <div className="w-2 h-2 rounded-full bg-red-400" />
                   <div className="w-2 h-2 rounded-full bg-yellow-400" />
                   <div className="w-2 h-2 rounded-full bg-green-400" />
                 </div>
                 <div className="space-y-3">
                   <div className="h-4 bg-app-bg rounded w-3/4 animate-pulse" />
                   <div className="h-4 bg-app-bg rounded w-full animate-pulse" />
                   <div className="h-4 bg-app-bg rounded w-5/6 animate-pulse" />
                   <div className="h-4 bg-app-bg rounded w-2/3 animate-pulse" />
                   <div className="pt-4 border-t border-border-main flex justify-between items-center">
                      <div className="h-3 bg-app-bg rounded w-20" />
                      <div className="h-8 bg-primary rounded px-4 w-24" />
                   </div>
                 </div>
               </motion.div>
               <motion.div 
                 animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                 className="absolute top-1/2 right-10 w-24 h-24 bg-white border border-border-main rounded-2xl shadow-xl z-20 flex items-center justify-center -translate-y-1/2 rotate-12"
               >
                 <Zap className="w-8 h-8 text-primary" />
               </motion.div>
            </div>
          </div>

          <div className="mt-16 bg-blue-600 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="max-w-2xl relative">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Get Job Alerts Directly in Your <span className="text-blue-200 underline decoration-wavy underline-offset-8">Inbox</span>
              </h3>
              <p className="text-blue-100 text-lg font-medium mb-10">
                Don't miss out on the perfect internship or job. Subscribe to our daily alerts tailored for your interests.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                />
                <button className="bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-black/10">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
