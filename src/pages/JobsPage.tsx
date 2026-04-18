import React from 'react';
import { Search, MapPin, Filter, X, ChevronDown, Loader2 } from 'lucide-react';
import JobCard, { Job } from '../components/JobCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { getApprovedJobs } from '../services/jobService';

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];
const CATEGORIES = [
  { label: 'Remote Jobs', value: 'remote' },
  { label: 'Internships', value: 'internship' },
  { label: 'Fresh Graduate', value: 'fresh-graduate' },
  { label: 'Scholarships', value: 'scholarship' }
];

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  React.useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const approvedJobs = await getApprovedJobs({
          type: selectedType || undefined,
          category: selectedCategory || undefined
        });
        setJobs(approvedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [selectedType, selectedCategory]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-app-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-8 w-60 shrink-0">
             <div>
               <div className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-4">Categories</div>
               <div className="flex flex-col gap-1">
                 <button 
                   onClick={() => setSelectedCategory(null)}
                   className={cn(
                     "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all text-left w-full",
                     !selectedCategory ? "bg-[#eff6ff] text-primary font-bold" : "text-text-main hover:bg-white"
                   )}
                 >
                   <span>Latest Jobs</span>
                   <span className="bg-border-main px-2 py-0.5 rounded-full text-[11px] text-text-muted">{jobs.length}</span>
                 </button>
                 {CATEGORIES.map(cat => (
                   <button 
                     key={cat.value}
                     onClick={() => setSelectedCategory(cat.value)}
                     className={cn(
                       "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all text-left w-full",
                       selectedCategory === cat.value ? "bg-[#eff6ff] text-primary font-bold" : "text-text-main hover:bg-white"
                     )}
                   >
                     <span>{cat.label}</span>
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <div className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-4">Employment Type</div>
               <div className="flex flex-col gap-1">
                 {JOB_TYPES.map(type => (
                   <button 
                     key={type}
                     onClick={() => setSelectedType(type === selectedType ? null : type)}
                     className={cn(
                       "flex items-center px-3.5 py-2.5 rounded-lg text-sm transition-all text-left w-full",
                       selectedType === type ? "bg-[#eff6ff] text-primary font-bold" : "text-text-main hover:bg-white"
                     )}
                   >
                     {type}
                   </button>
                 ))}
               </div>
             </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <div className="bg-white p-4 rounded-xl border border-border-main flex gap-3 shadow-md shadow-black/5">
                <div className="flex-1 flex items-center relative gap-2 px-2">
                  <Search className="w-4 h-4 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search titles, skills, or companies..."
                    className="flex-1 border-none outline-none text-[15px] bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-px bg-border-main" />
                <div className="flex-1 hidden sm:flex items-center relative gap-2 px-2">
                  <MapPin className="w-4 h-4 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Location (Optional)"
                    className="flex-1 border-none outline-none text-[15px] bg-transparent"
                  />
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all">
                  Find Jobs
                </button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="p-32 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                  <p className="text-text-muted font-medium italic">Scoping new opportunities...</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-border-main rounded-xl p-16 text-center">
                   <p className="text-text-muted font-bold text-lg mb-2">No results found</p>
                   <p className="text-text-muted text-sm mb-6">Try adjusting your filters or search keywords.</p>
                   <button 
                     onClick={() => {
                        setSelectedType(null);
                        setSelectedCategory(null);
                        setSearchQuery('');
                     }}
                     className="text-primary font-bold underline"
                   >
                     Reset all filters
                   </button>
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
