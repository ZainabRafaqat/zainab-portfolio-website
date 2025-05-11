import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { BriefcaseIcon, GraduationCapIcon, CalendarIcon, MapPinIcon } from "lucide-react";

// Define the structure for experience entries
interface ExperienceEntry {
  id: number;
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  skills?: string[];
}

// Sample experience data - replace with your actual information
const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    type: "work",
    title: "Frontend Engineer",
    organization: "Current Company",
    location: "City, Country",
    period: "Jan 2023 - Present",
    description: [
      "Led development of responsive, accessible interfaces using Next.js and TypeScript",
      "Implemented state management solutions with Redux and Context API",
      "Collaborated with designers to create pixel-perfect UI components",
      "Improved application performance, achieving a 30% increase in load speed"
    ],
    skills: ["Next.js", "TypeScript", "React", "Redux", "Tailwind CSS"]
  },
  {
    id: 2,
    type: "work",
    title: "Frontend Developer (Internship)",
    organization: "Previous Company",
    location: "City, Country",
    period: "May 2022 - Dec 2022",
    description: [
      "Developed and maintained React components for a SaaS application",
      "Created user interfaces following Ant Design guidelines",
      "Integrated RESTful APIs and implemented data visualization features",
      "Participated in code reviews and agile development processes"
    ],
    skills: ["React", "JavaScript", "Ant Design", "REST APIs"]
  },
  {
    id: 3,
    type: "work",
    title: "Web Development Intern",
    organization: "First Company",
    location: "City, Country",
    period: "Jan 2022 - Apr 2022",
    description: [
      "Assisted in building responsive web applications using modern JavaScript frameworks",
      "Fixed UI bugs and implemented new features",
      "Worked with senior developers to optimize website performance",
      "Gained experience in version control and collaborative development"
    ],
    skills: ["HTML", "CSS", "JavaScript", "Git"]
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor's in Computer Science",
    organization: "University Name",
    location: "City, Country",
    period: "Sep 2018 - Jun 2022",
    description: [
      "Specialized in Web Development and UI/UX Design",
      "Relevant coursework: Data Structures, Algorithms, Web Development, Human-Computer Interaction",
      "Graduated with honors (GPA: 3.8/4.0)",
      "Completed capstone project on interactive web applications"
    ]
  },
  {
    id: 5,
    type: "education",
    title: "High School Diploma",
    organization: "School Name",
    location: "City, Country",
    period: "Sep 2015 - Jun 2018",
    description: [
      "Focus on Mathematics and Computer Science",
      "Participated in coding competitions and hackathons",
      "Developed foundational skills in programming and problem-solving"
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Experience & Education - Zainab Rafaqat</title>
        <meta name="description" content="Professional journey and educational background of Zainab Rafaqat, Frontend-Focused Software Engineer." />
        <meta property="og:title" content="Experience & Education - Zainab Rafaqat" />
        <meta property="og:description" content="Professional journey and educational background of Zainab Rafaqat, Frontend-Focused Software Engineer." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
              Experience & Education
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              My professional journey, from education to current role. Explore my growth as a frontend engineer.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/30 dark:bg-primary/20 z-0"></div>

            {experienceData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative z-10 mb-12 flex items-center ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-gray-900"></div>

                {/* Content card */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 mr-4">
                        {item.type === "work" ? (
                          <BriefcaseIcon className="h-6 w-6 text-primary" />
                        ) : (
                          <AcademicCapIcon className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-primary dark:text-primary/90 font-medium">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 space-y-1 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {item.period}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {item.location}
                      </div>
                    </div>

                    <ul className="mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {item.skills && (
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Want to know more about my experience or discuss a project?
            </p>
            <div className="mt-4">
              <a
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
              >
                View LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Experience;