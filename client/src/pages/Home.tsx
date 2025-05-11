import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Zainab Rafaqat - Frontend Engineer</title>
        <meta name="description" content="Frontend-Focused Software Engineer building clean, scalable UIs using Next.js, React.js, Tailwind CSS, MUI, and Ant Design." />
        <meta property="og:title" content="Zainab Rafaqat - Frontend Engineer" />
        <meta property="og:description" content="Frontend-Focused Software Engineer building clean, scalable UIs using Next.js, React.js, Tailwind CSS, MUI, and Ant Design." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default Home;
