import { motion } from "framer-motion";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, 
  FaFigma, FaServer, FaDatabase
} from "react-icons/fa";
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMui, 
  SiAntdesign, SiRedux, SiGraphql, SiJest, SiWebpack
} from "react-icons/si";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Define skills with icons and categories
const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <FaReact className="h-8 w-8" /> },
      { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8" /> },
      { name: "TypeScript", icon: <SiTypescript className="h-8 w-8" /> },
      { name: "JavaScript", icon: <FaJs className="h-8 w-8" /> },
      { name: "HTML5", icon: <FaHtml5 className="h-8 w-8" /> },
      { name: "CSS3", icon: <FaCss3Alt className="h-8 w-8" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="h-8 w-8" /> },
      { name: "Material UI", icon: <SiMui className="h-8 w-8" /> },
      { name: "Ant Design", icon: <SiAntdesign className="h-8 w-8" /> },
    ]
  },
  {
    category: "State Management & APIs",
    items: [
      { name: "Redux", icon: <SiRedux className="h-8 w-8" /> },
      { name: "Context API", icon: <FaReact className="h-8 w-8" /> },
      { name: "GraphQL", icon: <SiGraphql className="h-8 w-8" /> },
      { name: "REST APIs", icon: <FaServer className="h-8 w-8" /> },
    ]
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git", icon: <FaGitAlt className="h-8 w-8" /> },
      { name: "Jest", icon: <SiJest className="h-8 w-8" /> },
      { name: "Figma", icon: <FaFigma className="h-8 w-8" /> },
      { name: "Webpack", icon: <SiWebpack className="h-8 w-8" /> },
      { name: "Node.js", icon: <FaNodeJs className="h-8 w-8" /> },
      { name: "Databases", icon: <FaDatabase className="h-8 w-8" /> },
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of technologies and tools I've worked with throughout my career.
          </p>
        </motion.div>

        <div className="space-y-16">
          {skills.map((skillCategory, categoryIndex) => (
            <div key={categoryIndex}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              >
                {skillCategory.category}
              </motion.h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              >
                {skillCategory.items.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-primary dark:text-primary mb-3">
                      {skill.icon}
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-center">
                      {skill.name}
                    </h4>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;