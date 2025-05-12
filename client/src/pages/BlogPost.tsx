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

  // Get the appropriate content based on the post slug
  const getBlogContent = (slug: string) => {
    switch(slug) {
      case 'building-inclusive-web-apps-with-react':
        return `
          <p class="text-lg mb-6">
            Creating accessible web applications isn't just about compliance with standards like WCAG (Web Content Accessibility Guidelines)—it's about ensuring your React applications can be used by everyone, including people with disabilities. This article dives deep into implementing accessibility in React.js applications with practical code examples and best practices.
          </p>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Understanding Accessibility Fundamentals</h2>
          
          <p class="mb-4">
            Before diving into React-specific implementations, it's crucial to understand the four core principles of accessibility (often abbreviated as POUR):
          </p>
          
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Perceivable</strong>: Information and UI components must be presentable to users in ways they can perceive.</li>
            <li><strong>Operable</strong>: UI components and navigation must be operable through various inputs beyond just mouse clicks.</li>
            <li><strong>Understandable</strong>: Information and operation of the interface must be understandable.</li>
            <li><strong>Robust</strong>: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.</li>
          </ul>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Semantic HTML: The Foundation of Accessibility</h2>
          
          <p class="mb-4">
            Always prefer semantic HTML elements. React lets you use all HTML elements, so there's no excuse for not using the right element for the job:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              {/* ❌ Bad Practice */}
              const BadNavigation = () => (
                &lt;div className="navigation">
                  &lt;div className="nav-item">Home&lt;/div>
                  &lt;div className="nav-item">About&lt;/div>
                  &lt;div className="nav-item">Contact&lt;/div>
                &lt;/div>
              );
              
              {/* ✅ Good Practice */}
              const GoodNavigation = () => (
                &lt;nav>
                  &lt;ul>
                    &lt;li>&lt;a href="/">Home&lt;/a>&lt;/li>
                    &lt;li>&lt;a href="/about">About&lt;/a>&lt;/li>
                    &lt;li>&lt;a href="/contact">Contact&lt;/a>&lt;/li>
                  &lt;/ul>
                &lt;/nav>
              );
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Implementing ARIA Attributes in React</h2>
          
          <p class="mb-4">
            Accessible Rich Internet Applications (ARIA) attributes help convey state and properties to assistive technologies when native HTML is insufficient. React supports all ARIA attributes with camelCase naming:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              const ExpandableSection = ({ isExpanded, onClick, children, title }) => {
                const headingId = \`heading-\${title.replace(/\\s+/g, '-').toLowerCase()}\`;
                const contentId = \`content-\${title.replace(/\\s+/g, '-').toLowerCase()}\`;
                
                return (
                  &lt;div>
                    &lt;button
                      onClick={onClick}
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      id={headingId}
                    >
                      {title} {isExpanded ? '▼' : '►'}
                    &lt;/button>
                    
                    &lt;div 
                      id={contentId}
                      role="region"
                      aria-labelledby={headingId}
                      hidden={!isExpanded}
                    >
                      {children}
                    &lt;/div>
                  &lt;/div>
                );
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Focus Management in React Applications</h2>
          
          <p class="mb-4">
            Proper focus management is essential, especially for keyboard users and those using screen readers. React provides useRef and useEffect hooks to manage focus:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              const ModalDialog = ({ isOpen, onClose, title, children }) => {
                const modalRef = useRef(null);
                const previousFocus = useRef(null);
              
                useEffect(() => {
                  if (isOpen) {
                    // Store the current focused element to restore later
                    previousFocus.current = document.activeElement;
                    
                    // Move focus to the modal
                    modalRef.current?.focus();
                    
                    // Trap focus inside modal
                    const focusableElements = modalRef.current?.querySelectorAll(
                      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    const firstElement = focusableElements?.[0];
                    const lastElement = focusableElements?.[focusableElements.length - 1];
                    
                    // Handle tab key press to trap focus
                    const handleTabKey = (e) => {
                      if (e.key === 'Tab') {
                        if (e.shiftKey) {
                          if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                          }
                        } else {
                          if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                          }
                        }
                      }
                    };
                    
                    document.addEventListener('keydown', handleTabKey);
                    
                    return () => {
                      document.removeEventListener('keydown', handleTabKey);
                      // Restore focus when modal closes
                      previousFocus.current?.focus();
                    };
                  }
                }, [isOpen]);
              
                if (!isOpen) return null;
              
                return (
                  &lt;div 
                    className="modal-overlay"
                    onClick={onClose}
                  >
                    &lt;div 
                      className="modal"
                      ref={modalRef}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-title"
                      onClick={e => e.stopPropagation()}
                      tabIndex={-1}
                    >
                      &lt;h2 id="modal-title">{title}&lt;/h2>
                      &lt;div>{children}&lt;/div>
                      &lt;button 
                        onClick={onClose}
                        aria-label="Close modal"
                      >
                        Close
                      &lt;/button>
                    &lt;/div>
                  &lt;/div>
                );
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Custom Hooks for Accessibility</h2>
          
          <p class="mb-4">
            Create reusable hooks to implement common accessibility patterns across your React application:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Custom hook for keyboard navigation
              const useKeyboardNavigation = (items, selectedIndex, setSelectedIndex) => {
                useEffect(() => {
                  const handleKeyDown = (e) => {
                    switch (e.key) {
                      case 'ArrowDown':
                        e.preventDefault();
                        setSelectedIndex((prevIndex) => 
                          (prevIndex + 1) % items.length
                        );
                        break;
                      case 'ArrowUp':
                        e.preventDefault();
                        setSelectedIndex((prevIndex) => 
                          (prevIndex - 1 + items.length) % items.length
                        );
                        break;
                      default:
                        break;
                    }
                  };
              
                  document.addEventListener('keydown', handleKeyDown);
                  return () => {
                    document.removeEventListener('keydown', handleKeyDown);
                  };
                }, [items, setSelectedIndex]);
              };
              
              // Example usage in a dropdown component
              const AccessibleDropdown = ({ items }) => {
                const [isOpen, setIsOpen] = useState(false);
                const [selectedIndex, setSelectedIndex] = useState(0);
                const dropdownRef = useRef(null);
              
                useKeyboardNavigation(items, selectedIndex, setSelectedIndex);
              
                // Implementation details...
                
                return (
                  &lt;div 
                    ref={dropdownRef}
                    className="dropdown"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                  >
                    {/* Dropdown content */}
                  &lt;/div>
                );
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Screen Reader Announcements</h2>
          
          <p class="mb-4">
            For dynamic content updates, you need to ensure screen readers announce these changes. React can leverage ARIA live regions for this purpose:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Announcer component for screen readers
              const ScreenReaderAnnouncer = () => (
                &lt;div 
                  aria-live="polite" 
                  aria-atomic="true" 
                  className="sr-only"
                  style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: '0' }}
                >
                  {message}
                &lt;/div>
              );
              
              // Hook to control announcements
              const useAnnouncer = () => {
                const [message, setMessage] = useState('');
              
                const announce = (text) => {
                  setMessage('');
                  // This timeout ensures the screen reader detects the change
                  setTimeout(() => setMessage(text), 50);
                };
              
                return {
                  announce,
                  Announcer: () => (
                    &lt;div 
                      aria-live="polite" 
                      aria-atomic="true" 
                      className="sr-only"
                    >
                      {message}
                    &lt;/div>
                  )
                };
              };
              
              // Usage in a component
              const SearchResults = ({ results, query }) => {
                const { announce, Announcer } = useAnnouncer();
              
                useEffect(() => {
                  if (results?.length) {
                    announce(\`Found \${results.length} results for \${query}\`);
                  } else if (query) {
                    announce(\`No results found for \${query}\`);
                  }
                }, [results, query, announce]);
              
                return (
                  &lt;div>
                    &lt;Announcer />
                    {/* Search results UI */}
                  &lt;/div>
                );
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Testing Accessibility in React Applications</h2>
          
          <p class="mb-4">
            Automated testing for accessibility issues can be integrated into your React development workflow:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // In your Jest test file
              import { render } from '@testing-library/react';
              import { axe, toHaveNoViolations } from 'jest-axe';
              import MyComponent from './MyComponent';
              
              expect.extend(toHaveNoViolations);
              
              describe('Accessibility tests', () => {
                it('should not have accessibility violations', async () => {
                  const { container } = render(&lt;MyComponent />);
                  const results = await axe(container);
                  
                  expect(results).toHaveNoViolations();
                });
              });
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
          
          <p class="mb-6">
            Building accessible React applications is a multifaceted process that requires attention to semantic HTML, ARIA attributes, keyboard navigation, focus management, and proper testing. By incorporating these techniques into your development workflow, you create applications that are not only more usable for people with disabilities but also better for all users.
          </p>
          
          <p class="mb-4">
            Remember that accessibility isn't a one-time task but an ongoing commitment. Regular testing with actual assistive technologies and getting feedback from users with disabilities are crucial steps in ensuring your React applications are truly inclusive.
          </p>
        `;
        
      case 'deep-dive-usememo-usecallback-performance':
        return `
          <p class="text-lg mb-6">
            React's useMemo and useCallback hooks are powerful tools for performance optimization, but are often misunderstood or misused. This article provides an in-depth analysis of these hooks, their inner workings, optimal usage patterns, and real-world performance implications.
          </p>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Understanding Referential Equality in React</h2>
          
          <p class="mb-4">
            To understand why useMemo and useCallback exist, we first need to understand how React determines when to re-render components and how JavaScript compares objects and functions.
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // In JavaScript, objects and functions are compared by reference, not by value
              const obj1 = { name: 'John' };
              const obj2 = { name: 'John' };
              console.log(obj1 === obj2); // false, different references
              
              // Same for functions
              const func1 = () => console.log('Hello');
              const func2 = () => console.log('Hello');
              console.log(func1 === func2); // false, different references
              
              // In React, this means:
              const Component = ({ callback }) => {
                useEffect(() => {
                  // This effect runs every time callback changes
                  callback();
                }, [callback]);
                
                return &lt;div>Hello&lt;/div>;
              };
              
              // In the parent component:
              const ParentComponent = () => {
                // This creates a new function reference on EVERY render
                const handleClick = () => console.log('Clicked');
                
                return &lt;Component callback={handleClick} />;
              };
              // Result: The effect in Component runs on every re-render of ParentComponent
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Deep Dive into useCallback</h2>
          
          <p class="mb-4">
            The useCallback hook returns a memoized callback function that only changes if one of its dependencies changes:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Basic syntax
              const memoizedCallback = useCallback(
                () => {
                  doSomething(a, b);
                },
                [a, b], // dependency array
              );
              
              // Real-world example: Event handler in a list item
              const TodoList = ({ todos, onToggle }) => {
                return (
                  &lt;ul>
                    {todos.map(todo => (
                      &lt;TodoItem 
                        key={todo.id}
                        todo={todo}
                        // Without useCallback, this creates a new function for each todo on every render
                        onToggle={() => onToggle(todo.id)}
                      />
                    ))}
                  &lt;/ul>
                );
              };
              
              // Optimized version
              const TodoList = ({ todos, onToggle }) => {
                // Creating a map of memoized callbacks for each todo.id
                const toggleCallbacks = useMemo(() => {
                  const callbackMap = {};
                  todos.forEach(todo => {
                    callbackMap[todo.id] = () => onToggle(todo.id);
                  });
                  return callbackMap;
                }, [todos, onToggle]);
                
                return (
                  &lt;ul>
                    {todos.map(todo => (
                      &lt;TodoItem 
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleCallbacks[todo.id]}
                      />
                    ))}
                  &lt;/ul>
                );
              };
              
              // Even better, move the callback inside the child component
              const TodoItem = memo(({ todo, onToggleBase }) => {
                // This useCallback only depends on stable props
                const onToggle = useCallback(() => {
                  onToggleBase(todo.id);
                }, [onToggleBase, todo.id]);
                
                return (
                  &lt;li>
                    &lt;input 
                      type="checkbox"
                      checked={todo.completed}
                      onChange={onToggle}
                    />
                    {todo.text}
                  &lt;/li>
                );
              });
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Deep Dive into useMemo</h2>
          
          <p class="mb-4">
            While useCallback memoizes functions, useMemo memoizes any computed value:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Basic syntax
              const memoizedValue = useMemo(
                () => computeExpensiveValue(a, b),
                [a, b], // dependency array
              );
              
              // Real-world example: Expensive filtering and sorting
              const ProductList = ({ products, category, sortBy }) => {
                // Without useMemo, this filtering and sorting happens on every render
                const filteredAndSortedProducts = products
                  .filter(product => product.category === category)
                  .sort((a, b) => {
                    if (sortBy === 'price') return a.price - b.price;
                    if (sortBy === 'name') return a.name.localeCompare(b.name);
                    return 0;
                  });
                
                return (
                  &lt;ul>
                    {filteredAndSortedProducts.map(product => (
                      &lt;ProductItem key={product.id} product={product} />
                    ))}
                  &lt;/ul>
                );
              };
              
              // Optimized version
              const ProductList = ({ products, category, sortBy }) => {
                // Memoize the expensive operation
                const filteredAndSortedProducts = useMemo(() => {
                  console.log('Computing filtered and sorted products');
                  return products
                    .filter(product => product.category === category)
                    .sort((a, b) => {
                      if (sortBy === 'price') return a.price - b.price;
                      if (sortBy === 'name') return a.name.localeCompare(b.name);
                      return 0;
                    });
                }, [products, category, sortBy]); // Only recompute when these dependencies change
                
                return (
                  &lt;ul>
                    {filteredAndSortedProducts.map(product => (
                      &lt;ProductItem key={product.id} product={product} />
                    ))}
                  &lt;/ul>
                );
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Advanced Patterns and Anti-patterns</h2>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">1. Using Dependencies Correctly</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // ❌ Anti-pattern: Missing dependencies
              const UserProfile = ({ userId }) => {
                const fetchUserData = useCallback(() => {
                  // userId is used here but not included in dependencies
                  fetch(\`/api/users/\${userId}\`);
                }, []); // Missing userId in the dependency array
                
                // ✅ Correct pattern
                const fetchUserData = useCallback(() => {
                  fetch(\`/api/users/\${userId}\`);
                }, [userId]); // userId is correctly included
              };
            </code>
          </pre>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">2. Over-memoization</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // ❌ Anti-pattern: Unnecessary memoization
              const SimpleComponent = () => {
                // Simple values don't need memoization
                const count = useMemo(() => 42, []);
                
                // Simple calculations don't need memoization
                const doubledCount = useMemo(() => count * 2, [count]);
                
                // ✅ These should simply be:
                const count = 42;
                const doubledCount = count * 2;
              };
            </code>
          </pre>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">3. useCallback with Empty Dependencies</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // ❌ Anti-pattern: Creating a static function for each component instance
              const Button = () => {
                const handleClick = useCallback(() => {
                  console.log('Clicked');
                }, []);
                
                return &lt;button onClick={handleClick}>Click me&lt;/button>;
              };
              
              // ✅ Better pattern: Move static functions outside component
              const handleClick = () => {
                console.log('Clicked');
              };
              
              const Button = () => {
                return &lt;button onClick={handleClick}>Click me&lt;/button>;
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Performance Measurement</h2>
          
          <p class="mb-4">
            Before implementing these optimizations, measure to ensure they actually improve performance:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Using the React Profiler API
              import { Profiler } from 'react';
              
              const onRenderCallback = (
                id, // the "id" prop of the Profiler tree
                phase, // "mount" or "update"
                actualDuration, // time spent rendering
                baseDuration, // estimated time for the entire subtree
                startTime, // when React began rendering
                commitTime // when React committed changes
              ) => {
                console.log(\`\${id} \${phase}: actual=\${actualDuration.toFixed(2)}ms base=\${baseDuration.toFixed(2)}ms\`);
              };
              
              const App = () => (
                &lt;Profiler id="MyComponent" onRender={onRenderCallback}>
                  &lt;MyComponent />
                &lt;/Profiler>
              );
              
              // Production measurement with web-vitals
              import { getFID, getLCP, getCLS } from 'web-vitals';
              
              // Measure and log Field Input Delay (FID)
              getFID(console.log);
              // Measure and log Largest Contentful Paint (LCP)
              getLCP(console.log);
              // Measure and log Cumulative Layout Shift (CLS)
              getCLS(console.log);
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">When Not to Use useMemo and useCallback</h2>
          
          <p class="mb-4">
            These hooks come with their own performance cost and shouldn't be used blindly:
          </p>
          
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Simple components</strong>: For components that rarely re-render or have simple logic, the overhead of memoization might exceed the benefits.</li>
            <li><strong>Non-pure components</strong>: If your component has side effects that need to run on each render, memoization might break expected behavior.</li>
            <li><strong>Development-only optimizations</strong>: Always profile in production mode, as React's development mode has different performance characteristics.</li>
          </ul>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
          
          <p class="mb-6">
            The useMemo and useCallback hooks are powerful tools for optimizing React applications, but they should be used judiciously. Understanding how React's rendering mechanism works and where the actual performance bottlenecks are in your application is crucial for effective optimization.
          </p>
          
          <p class="mb-4">
            Remember the React team's advice: "Write code without these optimizations first, and then add them where needed." Profile your application, identify bottlenecks, and only then apply these optimizations in a measured way.
          </p>
        `;
        
      case 'nextjs-rendering-strategies-comparison':
        return `
          <p class="text-lg mb-6">
            Next.js offers three primary rendering strategies: Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG). Each serves different use cases and comes with its own set of advantages and trade-offs. This article provides an in-depth technical analysis of when and how to use each strategy effectively.
          </p>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">The Rendering Spectrum: Understanding the Fundamentals</h2>
          
          <p class="mb-4">
            Before diving into specific Next.js implementations, let's understand the core differences between these rendering strategies:
          </p>
          
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-6">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider bg-gray-100 dark:bg-gray-800">Strategy</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider bg-gray-100 dark:bg-gray-800">When HTML is Generated</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider bg-gray-100 dark:bg-gray-800">Data Fetching</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider bg-gray-100 dark:bg-gray-800">Best For</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">CSR</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">Client runtime</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">After page load in browser</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">Private, user-specific content</td>
              </tr>
              <tr>
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">SSR</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">Request time</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">On each request at server</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">Dynamic, frequently updated content</td>
              </tr>
              <tr>
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">SSG</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">Build time</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">During build process</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">Static, infrequently updated content</td>
              </tr>
            </tbody>
          </table>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Client-Side Rendering (CSR) in Next.js</h2>
          
          <p class="mb-4">
            In CSR, the initial HTML is minimal, and JavaScript is responsible for rendering the page in the browser.
          </p>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Implementation in Next.js</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // pages/dashboard.js
              import { useEffect, useState } from 'react';
              
              const Dashboard = () => {
                const [userData, setUserData] = useState(null);
                const [loading, setLoading] = useState(true);
                
                useEffect(() => {
                  // Client-side data fetching
                  const fetchUserData = async () => {
                    try {
                      const res = await fetch('/api/user/dashboard');
                      const data = await res.json();
                      setUserData(data);
                    } catch (error) {
                      console.error('Failed to fetch user data:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
                  
                  fetchUserData();
                }, []);
                
                if (loading) return &lt;div>Loading...&lt;/div>;
                
                return (
                  &lt;div>
                    &lt;h1>Dashboard&lt;/h1>
                    &lt;p>Welcome, {userData?.name}&lt;/p>
                    {/* Dashboard content */}
                  &lt;/div>
                );
              };
              
              export default Dashboard;
            </code>
          </pre>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">When to Use CSR</h3>
          
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>User-specific content</strong>: For pages that display personalized content</li>
            <li><strong>Dashboard-like interfaces</strong>: For highly interactive UIs where SEO isn't critical</li>
            <li><strong>Private pages</strong>: For pages behind authentication where SEO doesn't matter</li>
            <li><strong>Frequent updates</strong>: For content that updates very frequently based on user interaction</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">CSR Optimization Techniques</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Advanced CSR with SWR for data fetching
              import useSWR from 'swr';
              
              const fetcher = (url) => fetch(url).then((res) => res.json());
              
              const Dashboard = () => {
                const { data, error, isLoading } = useSWR('/api/user/dashboard', fetcher, {
                  refreshInterval: 30000, // Auto-refresh every 30 seconds
                  revalidateOnFocus: true, // Refresh when tab regains focus
                });
                
                if (isLoading) return &lt;div>Loading...&lt;/div>;
                if (error) return &lt;div>Error loading dashboard&lt;/div>;
                
                return (
                  &lt;div>
                    &lt;h1>Dashboard&lt;/h1>
                    &lt;p>Welcome, {data?.name}&lt;/p>
                    {/* Dashboard content */}
                  &lt;/div>
                );
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Server-Side Rendering (SSR) in Next.js</h2>
          
          <p class="mb-4">
            With SSR, the server generates the full HTML for each request, sending a complete page to the browser.
          </p>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Implementation in Next.js</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // pages/products/[category].js
              export async function getServerSideProps(context) {
                const { category } = context.params;
                const { sort = 'newest' } = context.query;
                
                try {
                  // Server-side data fetching
                  const res = await fetch(
                    \`https://api.example.com/products?category=\${category}&sort=\${sort}\`
                  );
                  const products = await res.json();
                  
                  return {
                    props: {
                      products,
                      category,
                      sort,
                    },
                  };
                } catch (error) {
                  console.error('Failed to fetch products:', error);
                  return {
                    props: {
                      products: [],
                      category,
                      sort,
                      error: 'Failed to load products',
                    },
                  };
                }
              }
              
              const CategoryPage = ({ products, category, sort, error }) => {
                if (error) {
                  return &lt;div>Error: {error}&lt;/div>;
                }
                
                return (
                  &lt;div>
                    &lt;h1>{category} Products&lt;/h1>
                    &lt;p>Sorted by: {sort}&lt;/p>
                    &lt;div className="product-grid">
                      {products.map(product => (
                        &lt;ProductCard key={product.id} product={product} />
                      ))}
                    &lt;/div>
                  &lt;/div>
                );
              };
              
              export default CategoryPage;
            </code>
          </pre>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">When to Use SSR</h3>
          
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>SEO-critical dynamic pages</strong>: For content that changes frequently but needs to be indexed</li>
            <li><strong>Real-time data</strong>: For pages that must show the latest data from the server</li>
            <li><strong>Pages with request-specific content</strong>: For content that depends on cookies, user location, etc.</li>
            <li><strong>A/B testing</strong>: For serving different versions of pages based on server-side logic</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">SSR Advanced Patterns</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Hybrid approach with authentication
              export async function getServerSideProps(context) {
                const session = await getSession(context);
                
                // Redirect if not authenticated
                if (!session) {
                  return {
                    redirect: {
                      destination: '/login',
                      permanent: false,
                    },
                  };
                }
                
                // Fetch data based on user permissions
                const userRole = session.user.role;
                const res = await fetch(
                  \`https://api.example.com/dashboard?role=\${userRole}\`,
                  {
                    headers: {
                      'Authorization': \`Bearer \${session.accessToken}\`
                    }
                  }
                );
                const dashboardData = await res.json();
                
                return {
                  props: {
                    session,
                    dashboardData,
                  },
                };
              }
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Static Site Generation (SSG) in Next.js</h2>
          
          <p class="mb-4">
            With SSG, pages are pre-rendered at build time, resulting in static HTML files that can be served from a CDN.
          </p>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Implementation in Next.js</h3>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // pages/blog/[slug].js
              
              // Generate static paths at build time
              export async function getStaticPaths() {
                // Fetch list of all blog posts
                const res = await fetch('https://api.example.com/posts');
                const posts = await res.json();
                
                // Generate paths for each post
                const paths = posts.map(post => ({
                  params: { slug: post.slug },
                }));
                
                return {
                  paths,
                  fallback: 'blocking', // See "fallback" section below
                };
              }
              
              // Fetch data for each page at build time
              export async function getStaticProps({ params }) {
                const { slug } = params;
                
                try {
                  // Fetch the specific post data
                  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
                  
                  // Handle 404 scenarios
                  if (res.status === 404) {
                    return { notFound: true };
                  }
                  
                  const post = await res.json();
                  
                  return {
                    props: {
                      post,
                    },
                    // Re-generate page at most once per hour
                    revalidate: 3600,
                  };
                } catch (error) {
                  console.error('Failed to fetch post data:', error);
                  return { notFound: true };
                }
              }
              
              const BlogPost = ({ post }) => {
                return (
                  &lt;article>
                    &lt;h1>{post.title}&lt;/h1>
                    &lt;div className="metadata">
                      &lt;span>By {post.author}&lt;/span>
                      &lt;span>Published on {new Date(post.date).toLocaleDateString()}&lt;/span>
                    &lt;/div>
                    &lt;div dangerouslySetInnerHTML={{ __html: post.content }} />
                  &lt;/article>
                );
              };
              
              export default BlogPost;
            </code>
          </pre>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Understanding the 'fallback' Option</h3>
          
          <p class="mb-4">
            The 'fallback' option in getStaticPaths controls how Next.js handles requests for paths not generated at build time:
          </p>
          
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>false</strong>: Any paths not generated at build time will result in a 404 page</li>
            <li><strong>true</strong>: Shows a fallback page while generating the page on first request, then caches it for future requests</li>
            <li><strong>'blocking'</strong>: Server-renders the page on first request (like SSR) then caches it for future requests (like SSG)</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Incremental Static Regeneration (ISR)</h3>
          
          <p class="mb-4">
            ISR combines the benefits of SSG and SSR, allowing you to update static pages without rebuilding the entire site:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // Using revalidate for ISR
              export async function getStaticProps() {
                const res = await fetch('https://api.example.com/products');
                const products = await res.json();
                
                return {
                  props: {
                    products,
                  },
                  // Re-generate at most once per minute
                  revalidate: 60,
                };
              }
            </code>
          </pre>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">On-Demand Revalidation</h3>
          
          <p class="mb-4">
            Next.js 12.1+ allows triggering ISR on-demand via an API route:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // pages/api/revalidate.js
              export default async function handler(req, res) {
                // Check for secret to confirm this is a valid request
                if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
                  return res.status(401).json({ message: 'Invalid token' });
                }
                
                try {
                  // Path to revalidate
                  const path = req.query.path;
                  
                  // Using Next.js revalidation API
                  await res.revalidate(path);
                  
                  return res.json({ revalidated: true });
                } catch (err) {
                  // If there was an error, Next.js will continue
                  // to show the last successfully generated page
                  return res.status(500).send('Error revalidating');
                }
              }
              
              // Example usage:
              // GET /api/revalidate?secret=YOUR_TOKEN&path=/blog/post-1
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Choosing the Right Strategy: A Decision Framework</h2>
          
          <p class="mb-4">
            To decide which rendering strategy to use, consider these key factors:
          </p>
          
          <ol class="list-decimal pl-6 mb-6 space-y-2">
            <li><strong>Data Freshness</strong>: How frequently does the data change?</li>
            <li><strong>User Personalization</strong>: Is the content personalized for each user?</li>
            <li><strong>SEO Requirements</strong>: Is the page critical for search engine indexing?</li>
            <li><strong>Performance Needs</strong>: Is initial load time critical for the user experience?</li>
            <li><strong>Infrastructure Constraints</strong>: What are your hosting and budget limitations?</li>
          </ol>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Hybrid Rendering Strategies</h3>
          
          <p class="mb-4">
            Many Next.js applications use a mix of rendering strategies:
          </p>
          
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              // pages/index.js - Static homepage with ISR
              export async function getStaticProps() {
                // ... fetch data
                return { props: { data }, revalidate: 3600 };
              }
              
              // pages/product/[id].js - Static product pages with fallback
              export async function getStaticPaths() {
                // Generate only the most popular products at build time
                return { paths: popularProductPaths, fallback: true };
              }
              export async function getStaticProps({ params }) {
                // ... fetch product data
                return { props: { product }, revalidate: 60 };
              }
              
              // pages/search.js - Fully dynamic search page with SSR
              export async function getServerSideProps({ query }) {
                // ... handle search parameters
                return { props: { results } };
              }
              
              // pages/dashboard.js - Private page with client-side rendering
              const Dashboard = () => {
                // ... use SWR or React Query for client-side data fetching
              };
            </code>
          </pre>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Measuring and Optimizing Performance</h2>
          
          <p class="mb-4">
            Each rendering strategy has different performance characteristics. Here's how to measure and optimize them:
          </p>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Key Performance Metrics</h3>
          
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Time to First Byte (TTFB)</strong>: The time it takes for the browser to receive the first byte of content</li>
            <li><strong>First Contentful Paint (FCP)</strong>: When the first bit of content is painted</li>
            <li><strong>Largest Contentful Paint (LCP)</strong>: When the largest content element is painted</li>
            <li><strong>Time to Interactive (TTI)</strong>: When the page becomes interactive</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-8 mb-3">Optimizing for Each Strategy</h3>
          
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-6">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider bg-gray-100 dark:bg-gray-800">Strategy</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider bg-gray-100 dark:bg-gray-800">Optimization Techniques</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">CSR</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <ul class="list-disc pl-4">
                    <li>Lazy loading components</li>
                    <li>Code splitting with dynamic imports</li>
                    <li>Implementing skeleton screens</li>
                    <li>Optimizing bundle size</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">SSR</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <ul class="list-disc pl-4">
                    <li>Optimizing data fetching with caching</li>
                    <li>Reducing Time to First Byte with server optimizations</li>
                    <li>Streaming server responses</li>
                    <li>Minimizing blocking operations</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">SSG</td>
                <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <ul class="list-disc pl-4">
                    <li>Optimizing build times</li>
                    <li>Using CDN caching effectively</li>
                    <li>Strategic use of ISR</li>
                    <li>Minimizing JavaScript sent to client</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          
          <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
          
          <p class="mb-6">
            Next.js provides a powerful and flexible framework for building web applications with different rendering needs. By understanding the strengths and trade-offs of CSR, SSR, and SSG, you can make informed decisions about which strategy to use for each part of your application.
          </p>
          
          <p class="mb-4">
            Remember that these strategies are not mutually exclusive—most production Next.js applications combine different rendering methods to optimize for both user experience and developer experience. Always profile your application to ensure your chosen rendering strategy is delivering the performance you need.
          </p>
        `;
        
      default:
        return `
          <p class="text-lg mb-6">
            Content not found for this blog post.
          </p>
        `;
    }
  };

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

              {/* Blog content based on slug */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary dark:prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: getBlogContent(slug) }}
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
