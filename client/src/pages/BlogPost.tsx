import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { useBlogPost } from "@/lib/prismic";
import { ChevronLeft, Calendar, Tag, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BlogPost = () => {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  
  const { data: post, isLoading, error } = useBlogPost({ slug });

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the blog post you're looking for doesn't exist or might have been removed.
            </p>
            <Link href="/blog">
              <a className="inline-flex items-center text-primary dark:text-primary font-medium hover:text-primary/90 dark:hover:text-primary/90">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder content (would be replaced with actual Prismic content)
  const sampleContent = `
    <p class="text-lg mb-6">
      The new App Router in Next.js 13 represents a major shift in how we structure and organize our Next.js applications. With improved features like nested layouts, server components, and simplified data fetching, it offers developers more flexibility and better performance.
    </p>
    
    <h2 class="text-2xl font-bold mt-10 mb-4">Understanding the App Router</h2>
    
    <p class="mb-4">
      Unlike the previous Pages Router, the App Router uses a directory-based approach to define routes. Each folder within the app directory represents a route segment, making the structure more intuitive and easier to understand.
    </p>
    
    <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
      <code>
        app/
        ├── layout.tsx      # Root layout (applied to all routes)
        ├── page.tsx        # Home route (/)
        ├── blog/
        │   ├── layout.tsx  # Blog layout
        │   ├── page.tsx    # Blog index page (/blog)
        │   └── [slug]/
        │       └── page.tsx # Individual blog post (/blog/:slug)
        └── about/
            └── page.tsx    # About page (/about)
      </code>
    </pre>
    
    <p class="mb-6">
      This structure allows for better code organization and makes it easier to understand the relationship between different parts of your application.
    </p>
    
    <h2 class="text-2xl font-bold mt-10 mb-4">Key Features of the App Router</h2>
    
    <h3 class="text-xl font-semibold mt-8 mb-3">1. Nested Layouts</h3>
    
    <p class="mb-4">
      One of the most powerful features of the App Router is nested layouts. You can create a layout.tsx file in any folder, and it will be applied to all routes within that folder.
    </p>
    
    <h3 class="text-xl font-semibold mt-8 mb-3">2. Server Components</h3>
    
    <p class="mb-4">
      By default, all components in the App Router are React Server Components. This allows for improved performance by reducing the amount of JavaScript sent to the client.
    </p>
    
    <h3 class="text-xl font-semibold mt-8 mb-3">3. Simplified Data Fetching</h3>
    
    <p class="mb-6">
      Data fetching is now more straightforward, especially in server components where you can directly use async/await without extra libraries.
    </p>
    
    <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
      <code>
        // app/blog/[slug]/page.tsx
        async function getPost(slug) {
          const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
          return res.json();
        }
        
        export default async function BlogPost({ params }) {
          const post = await getPost(params.slug);
          return <article>{/* Render post */}</article>;
        }
      </code>
    </pre>
    
    <h2 class="text-2xl font-bold mt-10 mb-4">Migrating from Pages to App Router</h2>
    
    <p class="mb-4">
      Migrating an existing Next.js application from the Pages Router to the App Router can be done incrementally. Next.js allows both routers to work side by side, so you can move routes one by one.
    </p>
    
    <h3 class="text-xl font-semibold mt-8 mb-3">Migration Steps:</h3>
    
    <ol class="list-decimal pl-6 mb-6 space-y-2">
      <li>Start by creating an app directory alongside your pages directory</li>
      <li>Move your global styles and configurations to the app directory</li>
      <li>Create a root layout.tsx with the HTML structure</li>
      <li>Migrate routes one by one, starting with simpler pages</li>
      <li>Update data fetching methods to use the new patterns</li>
      <li>Test thoroughly to ensure everything works as expected</li>
    </ol>
    
    <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
    
    <p class="mb-6">
      The App Router in Next.js 13 brings many improvements to how we build Next.js applications. While there is a learning curve, especially for developers familiar with the Pages Router, the benefits in terms of code organization, performance, and developer experience make it worth the effort.
    </p>
    
    <p class="mb-4">
      As you adopt the App Router in your projects, remember that the Next.js documentation is comprehensive and should be your primary reference for any questions or challenges you encounter along the way.
    </p>
  `;

  return (
    <>
      <Helmet>
        <title>{post.title} - Zainab Rafaqat</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} - Zainab Rafaqat`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <article className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/blog">
                <a className="inline-flex items-center text-primary dark:text-primary font-medium hover:text-primary/90 dark:hover:text-primary/90 mb-8">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </a>
              </Link>

              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl"
                />
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center text-primary dark:text-primary">
                  <Tag className="h-4 w-4 mr-1" />
                  {post.category}
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Blog content would be rendered from Prismic here */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary dark:prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: sampleContent }}
              />

              <Separator className="mt-12 mb-8" />

              <div className="flex justify-between items-center">
                <Link href="/blog">
                  <a className="inline-flex items-center text-primary dark:text-primary font-medium hover:text-primary/90 dark:hover:text-primary/90">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </a>
                </Link>

                <div className="flex space-x-4">
                  <span className="text-gray-700 dark:text-gray-300">Share:</span>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
