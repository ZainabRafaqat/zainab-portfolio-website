import { motion } from "framer-motion";
import { Link } from "wouter";
import { BlogPost } from "@/types";
import { ChevronRight } from "lucide-react";

type BlogCardProps = {
  post: BlogPost;
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

const BlogCard = ({ post }: BlogCardProps) => {
  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Next.js": "text-primary-600 dark:text-primary-400",
      "CSS": "text-teal-600 dark:text-teal-400",
      "React": "text-blue-600 dark:text-blue-400",
      "JavaScript": "text-yellow-600 dark:text-yellow-400",
      "TypeScript": "text-blue-600 dark:text-blue-400",
      "UI/UX": "text-purple-600 dark:text-purple-400",
      "Web Development": "text-green-600 dark:text-green-400",
    };
    
    return categoryMap[category] || "text-primary-600 dark:text-primary-400";
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl dark:shadow-gray-800/10 transition-all duration-300"
    >
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className={`text-sm font-medium ${getCategoryColor(post.category)}`}>{post.category}</span>
        </div>
        <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.description}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <a className="inline-flex items-center text-primary dark:text-primary font-medium hover:text-primary/90 dark:hover:text-primary/90 transition-colors">
            Read More
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
