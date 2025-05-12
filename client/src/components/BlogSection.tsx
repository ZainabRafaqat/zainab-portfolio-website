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
      title: "Building Inclusive Web Apps with React.js: Accessibility Made Easy!",
      description: "Learn how to create accessible React applications that can be used by everyone, including people with disabilities. Discover practical techniques for implementing ARIA attributes, keyboard navigation, focus management, and more.",
      date: "May 5, 2023",
      image: "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Accessibility",
      slug: "building-inclusive-web-apps-with-react"
    },
    {
      id: "2",
      title: "Deep Dive into useMemo and useCallback: Optimizing React Performance",
      description: "Explore the nuances of React's performance optimization hooks and learn when (and when not) to use them. This detailed guide shows how to effectively implement useMemo and useCallback to prevent unnecessary renders.",
      date: "April 18, 2023",
      image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "React",
      slug: "deep-dive-usememo-usecallback-performance"
    },
    {
      id: "3",
      title: "CSR vs SSR vs SSG in Next.js: Choosing the Right Rendering Strategy",
      description: "Understand the differences between Client-Side Rendering, Server-Side Rendering, and Static Site Generation in Next.js. Learn how to select the optimal approach for different scenarios in your applications.",
      date: "March 22, 2023",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Next.js",
      slug: "nextjs-rendering-strategies-comparison"
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
