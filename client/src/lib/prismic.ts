import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/types";

// This would normally connect to Prismic CMS API
// Here we're simulating the API calls with sample data

// Sample data (would come from Prismic)
const sampleBlogPosts: BlogPost[] = [
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
