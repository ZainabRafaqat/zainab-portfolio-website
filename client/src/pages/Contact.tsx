import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Zainab Rafaqat</title>
        <meta name="description" content="Get in touch with Zainab Rafaqat for freelance projects, collaboration opportunities, or just to say hello." />
        <meta property="og:title" content="Contact - Zainab Rafaqat" />
        <meta property="og:description" content="Get in touch with Zainab Rafaqat for freelance projects, collaboration opportunities, or just to say hello." />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContactSection />
      </motion.div>
    </>
  );
};

export default Contact;
