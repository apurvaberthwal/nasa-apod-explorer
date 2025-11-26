import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/explorer', label: 'Explorer' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <nav className="max-w-5xl mx-auto glass-panel rounded-2xl md:rounded-full px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-blue-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                NASA <span className="text-accent-cyan">Explorer</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                    location.pathname === link.path
                      ? "text-white"
                      : "text-space-200 hover:text-white hover:bg-white/5"
                  )}
                >
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Nav Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden relative z-50 bg-space-900/90 backdrop-blur-xl rounded-2xl mt-2 border border-white/10"
              >
                <div className="flex flex-col space-y-2 pt-4 pb-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        location.pathname === link.path
                          ? "bg-white/10 text-white border border-white/10"
                          : "text-space-200 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content with Page Transitions */}
      <main className="flex-grow pt-24 md:pt-28 px-4 pb-12 relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-space-400 text-sm relative z-10">
        <div className="glass-panel inline-block px-6 py-3 rounded-full">
          <p>
            Powered by <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer" className="text-accent-cyan hover:underline">NASA API</a>
            {' • '}
            Built with React & Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
