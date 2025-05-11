import { motion } from "framer-motion";
import { Link } from "wouter";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/types";
import { ChevronRight } from "lucide-react";
import { useBlogPosts } from "@/lib/prismic";

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

const BlogSection = () => {
  const { data: blogPosts, isLoading, error } = useBlogPosts({ limit: 3 });

  // Fallback blog posts to show while loading or if error
  const fallbackPosts: BlogPost[] = [
    {
      id: "1",
      title: "Mastering Next.js 13 App Router: A Complete Guide",
      description: "Learn how to leverage the new App Router in Next.js 13 for better organization, improved performance, and enhanced developer experience.",
      date: "June 12, 2023",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Next.js",
      slug: "mastering-nextjs-13-app-router"
    },
    {
      id: "2",
      title: "Advanced Tailwind CSS Techniques for Modern UIs",
      description: "Explore advanced techniques in Tailwind CSS to build sophisticated user interfaces with less code and better performance.",
      date: "May 28, 2023",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "CSS",
      slug: "advanced-tailwind-css-techniques"
    },
    {
      id: "3",
      title: "Optimizing React Performance in Complex Applications",
      description: "Practical strategies to identify and fix performance bottlenecks in React applications with complex state management.",
      date: "April 15, 2023",
      image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "React",
      slug: "optimizing-react-performance"
    }
  ];

  // Use the fetched posts or fallback if loading/error
  const posts = (isLoading || error || !blogPosts) ? fallbackPosts : blogPosts;

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on frontend development and technology.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <a className="inline-flex items-center text-primary dark:text-primary font-medium hover:text-primary/90 dark:hover:text-primary/90 transition-colors">
              View All Posts
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
