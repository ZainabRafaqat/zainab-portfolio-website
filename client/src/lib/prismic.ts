import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/types";

// This would normally connect to Prismic CMS API
// Here we're simulating the API calls with sample data

// Sample data (would come from Prismic)
const sampleBlogPosts: BlogPost[] = [
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

// Simulated API function to fetch all blog posts
const fetchBlogPosts = async ({ limit }: { limit?: number } = {}): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return all posts or a limited number if specified
  return limit ? sampleBlogPosts.slice(0, limit) : sampleBlogPosts;
};

// Simulated API function to fetch a single blog post by slug
const fetchBlogPost = async ({ slug }: { slug: string }): Promise<BlogPost | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find the post by slug
  const post = sampleBlogPosts.find(post => post.slug === slug);
  return post || null;
};

// Hook to fetch all blog posts
export const useBlogPosts = ({ limit }: { limit?: number } = {}) => {
  return useQuery({
    queryKey: ['blog-posts', limit],
    queryFn: () => fetchBlogPosts({ limit }),
  });
};

// Hook to fetch a single blog post
export const useBlogPost = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => fetchBlogPost({ slug }),
    enabled: !!slug,
  });
};

/*
 * Prismic Schema Example - This would be used to configure Prismic CMS:
 * 
 * Custom Type: Blog Post
 * API ID: blog_post
 * Fields:
 * - title (UID, required): Post title and URL slug
 * - description (Rich Text, single): Short description for previews
 * - content (Rich Text, multi): Main content of the blog post
 * - published_date (Date): When the post was published
 * - category (Select): Category of the post (Next.js, React, CSS, etc.)
 * - featured_image (Image): Main image for the post
 * - author (Link to Author custom type): Reference to author profile
 * - related_posts (Group of Content Relationships): Links to related posts
 * - meta_title (Text): SEO title (if different from main title)
 * - meta_description (Text): SEO description
 * 
 * In a real implementation, we would use the Prismic JavaScript SDK to fetch content:
 * import * as prismic from '@prismicio/client'
 * 
 * const client = prismic.createClient('your-repository-name')
 * 
 * const fetchBlogPosts = async () => {
 *   return client.getAllByType('blog_post', {
 *     orderings: {
 *       field: 'document.first_publication_date',
 *       direction: 'desc'
 *     }
 *   })
 * }
 */
