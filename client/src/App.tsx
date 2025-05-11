import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Experience from "./pages/Experience";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Theme context
import { ThemeProvider } from "./lib/theme.tsx";

function App() {
  const [mounted, setMounted] = useState(false);

  // Ensure hydration before rendering to avoid layout shift
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            {mounted && (
              <>
                <Header />
                <main className="flex-grow">
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/experience" component={Experience} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/blog/:slug" component={BlogPost} />
                    <Route path="/contact" component={Contact} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
                <Footer />
              </>
            )}
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
