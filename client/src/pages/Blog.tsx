import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { useBlogPosts } from "@/lib/prismic";
import { BlogPost } from "@/types";
import { Loader2 } from "lucide-react";

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

const Blog = () => {
  const { data: blogPosts, isLoading, error } = useBlogPosts({});

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
    },
    {
      id: "4",
      title: "Building Accessible Web Applications with React",
      description: "Learn how to create inclusive web experiences that work for everyone using React and ARIA attributes.",
      date: "March 22, 2023",
      image: "https://images.unsplash.com/photo-1551376347-075b0121a903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Accessibility",
      slug: "building-accessible-web-applications"
    },
    {
      id: "5",
      title: "State Management Showdown: Redux vs. Context API vs. Zustand",
      description: "A comprehensive comparison of popular state management solutions in the React ecosystem.",
      date: "February 18, 2023",
      image: "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "React",
      slug: "state-management-showdown"
    },
    {
      id: "6",
      title: "How to Create Custom React Hooks for Reusable Logic",
      description: "Extract and reuse stateful logic across components with custom hooks in React applications.",
      date: "January 05, 2023",
      image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80",
      category: "React",
      slug: "custom-react-hooks"
    }
  ];

  // Use the fetched posts or fallback if loading/error
  const posts = (isLoading || error || !blogPosts) ? fallbackPosts : blogPosts;

  return (
    <>
      <Helmet>
        <title>Blog - Zainab Rafaqat</title>
        <meta name="description" content="Articles and tutorials on frontend development, React, Next.js, and modern web technologies." />
        <meta property="og:title" content="Blog - Zainab Rafaqat" />
        <meta property="og:description" content="Articles and tutorials on frontend development, React, Next.js, and modern web technologies." />
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
              Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Thoughts, tutorials, and insights on frontend development, design patterns, and modern web technologies.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
