import { Link } from "wouter";
import { motion } from "framer-motion";
import { GitPullRequest, Linkedin, Twitter } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Dynamic morphing gradient background */}
      <div className="absolute inset-0 z-0 morphing-gradient opacity-20 dark:opacity-30"></div>
      
      {/* Tech-inspired circuit pattern overlay in dark mode */}
      <div className="absolute inset-0 z-0 opacity-0 dark:opacity-10 circuit-pattern"></div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 -left-24 w-80 h-80 bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-36 w-72 h-72 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Role badge with glow effect in dark mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 dark:bg-primary/20 
                      text-primary dark:text-primary/90 text-sm font-medium 
                      dark:neon-box-glow-primary transform hover:scale-105 transition-all duration-300"
          >
            <span className="font-space-grotesk dark:neon-glow-primary">Frontend-Focused Software Engineer</span>
          </motion.div>

          {/* Name with animated gradient text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-space-grotesk font-bold text-4xl sm:text-5xl md:text-6xl 
                          bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary 
                          dark:from-primary dark:via-accent dark:to-secondary mx-auto
                          dark:neon-glow-primary"
            >
              I'm Zainab Rafaqat
            </h1>
          </motion.div>

          {/* Description with animated text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-inter text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Building clean, scalable UIs using Next.js, React.js, Tailwind CSS, MUI, and Ant Design.
          </motion.p>

          {/* Call to action buttons with glow effect in dark mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="/projects"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg 
                        transition-all duration-300 hover-scale-slight dark:neon-box-glow-primary"
            >
              View My Work
            </Link>
            <Link 
              href="/contact"
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                        text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 
                        dark:hover:bg-gray-700 transition-all duration-300 hover-scale-slight 
                        dark:hover:neon-box-glow-accent"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Social media links with hover animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 flex justify-center space-x-8"
          >
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary 
                      transition-all duration-300 transform hover:scale-125 dark:hover:neon-glow-primary"
              aria-label="GitPullRequest"
            >
              <GitPullRequest className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary 
                       transition-all duration-300 transform hover:scale-125 dark:hover:neon-glow-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary 
                       transition-all duration-300 transform hover:scale-125 dark:hover:neon-glow-primary"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
