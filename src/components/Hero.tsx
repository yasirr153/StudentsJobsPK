import React from 'react';
import { Search, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">AI-Powered Job Board</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8"
          >
            Your First Step to a <span className="text-blue-600">Great Career</span> in Pakistan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed mb-12"
          >
            We aggregate the best internships, entry-level jobs, and remote opportunities specifically for Pakistani students and fresh graduates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white p-4 rounded-xl shadow-xl shadow-black/5 border border-border-main flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 flex items-center gap-3 px-2 w-full">
                <Search className="w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full py-2 bg-transparent border-none outline-none text-text-main placeholder:text-text-muted font-medium"
                />
              </div>
              <div className="w-px h-8 bg-border-main hidden md:block" />
              <div className="flex-1 flex items-center gap-3 px-2 w-full">
                <MapPin className="w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Anywhere (Remote)"
                  className="w-full py-2 bg-transparent border-none outline-none text-text-main placeholder:text-text-muted font-medium"
                />
              </div>
              <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-all active:scale-95 shadow-md shadow-primary/20">
                Search
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-500 font-medium pt-1">Popular:</span>
              {['Frontend', 'Remote', 'Internship', 'Mobile App', 'UI/UX'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-white hover:border-gray-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
