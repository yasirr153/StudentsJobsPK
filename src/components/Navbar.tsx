import React from 'react';
import { Briefcase, Search, Bell, User, LayoutDashboard, LogOut, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, isAdmin, signIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Jobs', path: '/jobs', icon: Search },
    { name: 'Internships', path: '/internships', icon: Briefcase },
    { name: 'Scholarships', path: '/scholarships', icon: Bell },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b h-16 flex items-center bg-white border-border-main",
      isScrolled ? "shadow-sm" : ""
    )}>
      <div className="max-w-7xl mx-auto px-10 w-full">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-[20px] font-extrabold tracking-tight text-primary">
              StudentJobs<span className="text-text-main">PK</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary font-semibold" : "text-text-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-indigo-600 flex items-center gap-1",
                  location.pathname === '/admin' ? "text-indigo-600" : "text-text-muted"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-border-main">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <button
                  onClick={logout}
                  className="text-text-muted hover:text-red-500 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg text-[13px] font-semibold hover:bg-primary-dark transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
