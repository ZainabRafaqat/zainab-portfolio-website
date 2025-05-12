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

// Experience data based on the provided resume
const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    type: "work",
    title: "Software Engineer",
    organization: "Focusteck",
    location: "Lahore, Pakistan",
    period: "Jul 2023 - Present",
    description: [
      "Developed a tree growth tracking app using MapboxGL, React.js, and Firebase, enhancing geospatial accuracy by 30% through marker clustering algorithms",
      "Contributed to a banking enterprise app, improving client management and streamlining financial reporting, reducing manual effort by 40%",
      "Optimized financial reporting in the banking app, ensuring 100% data accuracy and improving processing speed by 3% through customized back-end solutions",
      "Built a whitelabelable apartment booking platform using Next.js, allowing partner companies to deploy fully customized themes and integrate over 10 third-party APIs seamlessly",
      "Automated dropshipping operations with Google Sheets API, creating dynamic workflows to track inventory, orders, and sales—increasing operational efficiency by 60% and minimizing errors"
    ],
    skills: ["React.js", "Next.js", "TypeScript", "MapboxGL", "Firebase", "Chart.js", "API Integration", "Google Sheets API"]
  },
  {
    id: 2,
    type: "work",
    title: "Software Engineer Intern",
    organization: "Exinia",
    location: "Lahore, Pakistan",
    period: "Jan 2023 - May 2023",
    description: [
      "Gained hands-on experience with Angular, working on component-based architecture, routing, and state management",
      "Contributed to the development of a large-scale no-code platform, applying Angular's core functionalities to deliver a dynamic and user-friendly interface"
    ],
    skills: ["Angular", "Component Architecture", "Routing", "State Management"]
  },
  {
    id: 3,
    type: "work",
    title: "Software Engineer Intern",
    organization: "Techverx",
    location: "Lahore, Pakistan",
    period: "June 2022 - August 2022",
    description: [
      "Acquired practical experience of React and associated libraries",
      "Utilized Formik, Yup, Tailwind CSS, and Redux for efficient form validation, styling, and global state management"
    ],
    skills: ["React", "Formik", "Yup", "Tailwind CSS", "Redux"]
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor of Computer Science",
    organization: "UET Lahore",
    location: "Lahore, Pakistan",
    period: "2019 - 2023",
    description: [
      "Developed strong foundations in computer science principles and programming",
      "Completed projects including a recruitment platform with React and Django, a social networking app with Flutter and Firebase, and a blog website with React and Prismic CMS",
      "Served as Chief Editor for 'Humans of UET', conducting interviews of people from diverse backgrounds",
      "Active member of UET Debating Society as a Declamation Speaker"
    ]
  },
  {
    id: 5,
    type: "education",
    title: "Pre-Engineering",
    organization: "Kinnaird College for Women University",
    location: "Lahore, Pakistan",
    period: "2017 - 2019",
    description: [
      "Focused on mathematics and sciences, building a strong foundation for engineering studies",
      "Developed analytical thinking and problem-solving skills"
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
                          <GraduationCapIcon className="h-6 w-6 text-primary" />
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