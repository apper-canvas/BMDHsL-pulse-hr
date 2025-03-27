import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Bell, User, LogOut } from 'lucide-react';
import Home from './pages/Home';
import Employees from './pages/Employees';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check user preference
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Employees', path: '/employees' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Leave', path: '/leave' },
    { name: 'Payroll', path: '/payroll' },
    { name: 'Performance', path: '/performance' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-primary">Pulse<span className="text-accent">HR</span></span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.path}
                    className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Notifications */}
              <button className="p-2 rounded-full text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent ring-2 ring-white dark:ring-surface-800"></span>
              </button>
              
              {/* User menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                </button>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
                  aria-expanded="false"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="border-t border-surface-200 dark:border-surface-700 mt-4 pt-4">
                  <a
                    href="/logout"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign out
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-bold text-primary">Pulse<span className="text-accent">HR</span></span>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                Streamlining HR operations and enhancing employee experiences
              </p>
            </div>
            <div className="text-sm text-surface-500 dark:text-surface-400">
              © {new Date().getFullYear()} PulseHR. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;