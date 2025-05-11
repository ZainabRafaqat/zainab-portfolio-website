import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5
    }
  }
};

// Helper function to get tag color classes
const getTagColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    sky: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
    lime: "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300",
    gray: "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
  };
  
  return colorMap[color] || colorMap.primary;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-800/10 transition-all duration-300 overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} Project`}
          className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 ${getTagColorClasses(project.tagColors[index])} text-xs font-medium rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <a 
            href={project.demoUrl} 
            className="text-primary dark:text-primary font-medium hover:text-primary/80 dark:hover:text-primary/80 transition-colors"
          >
            View Project
          </a>
          <a 
            href={project.githubUrl} 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label={`GitHub repository for ${project.title}`}
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
