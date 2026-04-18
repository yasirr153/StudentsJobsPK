import React from 'react';
import { Briefcase, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                StudentJobs<span className="text-blue-500">PK</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Empowering the next generation of professionals in Pakistan with the best opportunities and AI-enhanced career growth tools.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Job Seekers</h4>
            <ul className="space-y-4">
              <li><Link to="/jobs" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Browse Jobs</Link></li>
              <li><Link to="/internships" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Internships</Link></li>
              <li><Link to="/scholarships" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Scholarships</Link></li>
              <li><Link to="/saved-jobs" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Saved Jobs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Employers</h4>
            <ul className="space-y-4">
              <li><Link to="/post-job" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Post a Job</Link></li>
              <li><Link to="/employer-dashboard" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/hiring-tips" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Hiring Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} StudentJobsPK. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Mail className="w-4 h-4" />
            <span>hello@studentjobspk.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
