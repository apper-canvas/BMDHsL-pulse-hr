import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-surface-100 dark:bg-surface-800 p-4 inline-flex">
            <AlertTriangle size={48} className="text-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;