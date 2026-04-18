import React from 'react';
import { Briefcase, Globe, GraduationCap, Laptop, Sparkles, Zap, LaptopMinimalIcon as Laptop2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const categories = [
  {
    title: 'Internships',
    count: '150+',
    icon: GraduationCap,
    color: 'blue',
    path: '/internships',
    description: 'Explore opportunities to gain industry experience.'
  },
  {
    title: 'Remote Jobs',
    count: '80+',
    icon: Globe,
    color: 'emerald',
    path: '/remote-jobs',
    description: 'Work from anywhere for global companies.'
  },
  {
    title: 'Fresh Graduates',
    count: '240+',
    icon: Briefcase,
    color: 'indigo',
    path: '/fresh-graduate-jobs',
    description: 'Entry-level positions for recent university finishers.'
  },
  {
    title: 'Scholarships',
    count: '45+',
    icon: Sparkles,
    color: 'amber',
    path: '/scholarships',
    description: 'Fund your education with national & global grants.'
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Browse by Category</h2>
          <p className="text-gray-600 font-medium">Find the perfect start to your professional journey.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.title}
              to={cat.path}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all h-full"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   <cat.icon className={`w-7 h-7 text-${cat.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">{cat.count} Jobs</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
