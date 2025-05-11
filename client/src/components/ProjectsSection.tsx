import { motion } from "framer-motion";
import { Link } from "wouter";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types";
import { ChevronRight } from "lucide-react";

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A comprehensive dashboard for online stores with real-time analytics and inventory management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Charts.js"],
    demoUrl: "#",
    githubUrl: "#",
    tagColors: ["primary", "blue", "teal", "amber"]
  },
  {
    id: 2,
    title: "Fitness Tracker",
    description: "A mobile-first application for tracking workouts, nutrition, and progress with personalized recommendations.",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    tags: ["React Native", "Node.js", "GraphQL", "Firebase"],
    demoUrl: "#",
    githubUrl: "#",
    tagColors: ["primary", "green", "violet", "red"]
  },
  {
    id: 3,
    title: "Collaborative Notes",
    description: "A real-time collaborative note-taking app with rich text editing, markdown support, and team workspaces.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    tags: ["React.js", "Socket.io", "Express", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    tagColors: ["primary", "emerald", "blue", "yellow"]
  },
  {
    id: 4,
    title: "Travel Planner",
    description: "A comprehensive travel planning application with itinerary creation, budget tracking, and local recommendations.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    tags: ["Next.js", "MUI", "Mapbox API", "Prisma"],
    demoUrl: "#",
    githubUrl: "#",
    tagColors: ["primary", "sky", "lime", "gray"]
  },
  {
    id: 5,
    title: "Music Streaming App",
    description: "A music streaming platform with personalized recommendations, playlist management, and social sharing.",
    image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    tags: ["React.js", "Redux", "Web Audio API", "Styled-Components"],
    demoUrl: "#",
    githubUrl: "#",
    tagColors: ["primary", "red", "purple", "indigo"]
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description: "A beautiful weather application with 7-day forecasts, radar maps, and detailed meteorological data.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    tags: ["React.js", "D3.js", "Weather API", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
    tagColors: ["primary", "cyan", "orange", "pink"]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work, featuring web applications built with modern technologies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <a className="inline-flex items-center text-primary dark:text-primary font-medium hover:text-primary/90 dark:hover:text-primary/90 transition-colors">
              View All Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
