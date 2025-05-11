import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();

  // Close menu when location changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location, isOpen, onClose]);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link 
              href="/"
              className={`block py-2 px-4 font-medium rounded transition-all duration-300 hover-scale-slight ${
                isActive("/")
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary dark:neon-glow-primary"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:neon-box-glow-primary"
              }`}
              onClick={onClose}
            >
              Home
            </Link>
            <Link 
              href="/projects"
              className={`block py-2 px-4 font-medium rounded transition-all duration-300 hover-scale-slight ${
                isActive("/projects")
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary dark:neon-glow-primary"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:neon-box-glow-primary"
              }`}
              onClick={onClose}
            >
              Projects
            </Link>
            <Link 
              href="/experience"
              className={`block py-2 px-4 font-medium rounded transition-all duration-300 hover-scale-slight ${
                isActive("/experience")
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary dark:neon-glow-primary"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:neon-box-glow-primary"
              }`}
              onClick={onClose}
            >
              Experience
            </Link>
            <Link 
              href="/blog"
              className={`block py-2 px-4 font-medium rounded transition-all duration-300 hover-scale-slight ${
                isActive("/blog")
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary dark:neon-glow-primary"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:neon-box-glow-primary"
              }`}
              onClick={onClose}
            >
              Blog
            </Link>
            <Link 
              href="/contact"
              className={`block py-2 px-4 font-medium rounded transition-all duration-300 hover-scale-slight ${
                isActive("/contact")
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary dark:neon-glow-primary"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:neon-box-glow-primary"
              }`}
              onClick={onClose}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
