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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <a className="font-heading font-bold text-2xl text-primary dark:text-primary">ZR.</a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={`font-medium transition-colors ${isActive("/") ? "text-primary dark:text-primary" : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"}`}>
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a className={`font-medium transition-colors ${isActive("/projects") ? "text-primary dark:text-primary" : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"}`}>
                Projects
              </a>
            </Link>
            <Link href="/blog">
              <a className={`font-medium transition-colors ${isActive("/blog") ? "text-primary dark:text-primary" : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"}`}>
                Blog
              </a>
            </Link>
            <Link href="/contact">
              <a className={`font-medium transition-colors ${isActive("/contact") ? "text-primary dark:text-primary" : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"}`}>
                Contact
              </a>
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200"
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
