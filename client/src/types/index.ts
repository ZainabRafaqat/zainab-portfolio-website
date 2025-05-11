// Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  tagColors: string[];
}

// Blog post type
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  content?: string; // Optional full content
}

// Form states
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Theme
export type Theme = "light" | "dark";
