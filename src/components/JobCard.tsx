import React from 'react';
import { MapPin, Building2, Clock, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  category: 'remote' | 'internship' | 'scholarship' | 'fresh-graduate';
  postedAt: Date;
  summary: string;
  logoUrl?: string;
  applyUrl: string;
  salary?: string;
  tags?: string[];
  description?: string;
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-white border border-border-main p-5 rounded-xl hover:shadow-lg hover:shadow-black/5 transition-all relative"
    >
      <span className="absolute top-5 right-5 bg-[#f0fdf4] text-[#166534] text-[10px] font-bold px-2 py-0.5 rounded border border-[#bbf7d0] uppercase tracking-wider">
        AI Enhanced
      </span>

      <div className="flex gap-4 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center font-bold text-secondary shrink-0">
          {job.logoUrl ? (
            <img src={job.logoUrl} alt={job.company} className="max-w-[70%] max-h-[70%] object-contain" referrerPolicy="no-referrer" />
          ) : (
            job.company.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <div className="text-base font-bold text-text-main line-clamp-1">{job.title}</div>
          <div className="text-sm font-medium text-text-muted flex items-center gap-1.5">
            {job.company} • {job.location}
          </div>
        </div>
      </div>

      <div className="bg-app-bg p-3 rounded-lg text-xs leading-relaxed text-[#475569] border-l-[3px] border-primary mb-3 italic">
        {job.summary}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-text-muted font-medium">
          {job.type}
        </span>
        {job.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-text-muted font-medium capitalize">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-border-main">
        <div className="font-bold text-text-main text-sm">
          {job.salary ? `PKR ${job.salary}` : 'Competitive Pay'}
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={`/job/${job.id}`}
            className="text-[13px] font-semibold text-text-muted hover:text-primary transition-colors"
          >
            Details
          </Link>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold text-primary hover:underline flex items-center gap-1"
          >
            Apply Now →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
