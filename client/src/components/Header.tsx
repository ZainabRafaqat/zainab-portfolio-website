import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with neon effect in dark mode */}
          <Link 
            href="/" 
            className="font-space-grotesk font-bold text-2xl text-primary dark:text-primary transition-all duration-300 hover-scale-slight dark:neon-glow-primary"
          >
            ZR<span className="text-accent dark:text-accent dark:neon-glow-accent">.</span>
          </Link>

          {/* Desktop Navigation with animated underlines */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`nav-underline font-medium transition-all duration-300 ${
                isActive("/") 
                ? "text-primary dark:text-primary dark:neon-glow-primary" 
                : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className={`nav-underline font-medium transition-all duration-300 ${
                isActive("/projects") 
                ? "text-primary dark:text-primary dark:neon-glow-primary" 
                : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/experience" 
              className={`nav-underline font-medium transition-all duration-300 ${
                isActive("/experience") 
                ? "text-primary dark:text-primary dark:neon-glow-primary" 
                : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              }`}
            >
              Experience
            </Link>
            <Link 
              href="/blog" 
              className={`nav-underline font-medium transition-all duration-300 ${
                isActive("/blog") 
                ? "text-primary dark:text-primary dark:neon-glow-primary" 
                : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`nav-underline font-medium transition-all duration-300 ${
                isActive("/contact") 
                ? "text-primary dark:text-primary dark:neon-glow-primary" 
                : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button with hover effect */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Header;
