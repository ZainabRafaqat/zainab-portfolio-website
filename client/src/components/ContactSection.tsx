import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Clock, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Contact form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your server
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50 relative">
      {/* Background pattern for tech-inspired look */}
      <div className="absolute inset-0 tech-pattern opacity-5 dark:opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 dark:neon-glow-primary code-bracket-left code-bracket-right">
              Get In Touch
            </h2>
            <p className="font-inter text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-primary/5 dark:hover:neon-box-glow-primary overflow-hidden transition-all duration-300"
          >
            <div className="md:flex">
              {/* Contact info with morphing gradient background */}
              <div className="md:w-1/2 p-8 md:p-10 relative overflow-hidden">
                <div className="absolute inset-0 morphing-gradient opacity-90 z-0"></div>
                <div className="relative z-10">
                  <h3 className="font-space-grotesk font-bold text-2xl mb-6 text-white dark:neon-glow-white">
                    Contact Information
                  </h3>
                  <p className="mb-8 text-white/90">
                    Feel free to reach out if you have any questions or just want to say hello!
                  </p>

                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <div className="mr-4 text-white bg-white/20 p-2 rounded-full">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a
                          href="mailto:contact@zainabrafaqat.com"
                          className="text-white/80 hover:text-white transition-colors hover-scale-slight inline-block"
                        >
                          contact@zainabrafaqat.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className="mr-4 text-white bg-white/20 p-2 rounded-full">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Location</p>
                        <p className="text-white/80">Remote - Available Worldwide</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <div className="mr-4 text-white bg-white/20 p-2 rounded-full">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Working Hours</p>
                        <p className="text-white/80 font-roboto-mono">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-10 flex space-x-5">
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      href="#"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      href="#"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-white" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      href="#"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5 text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Contact form with animated inputs */}
              <div className="md:w-1/2 p-8 md:p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-space-grotesk text-sm text-gray-700 dark:text-gray-300">
                            Your Name
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="relative"
                            >
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                                         bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-primary focus:border-primary 
                                         dark:focus:ring-primary dark:focus:neon-box-glow-primary
                                         transition-all duration-300 font-inter"
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-space-grotesk text-sm text-gray-700 dark:text-gray-300">
                            Your Email
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="relative"
                            >
                              <Input
                                placeholder="john@example.com"
                                {...field}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                                         bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-primary focus:border-primary 
                                         dark:focus:ring-primary dark:focus:neon-box-glow-primary
                                         transition-all duration-300 font-inter"
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-space-grotesk text-sm text-gray-700 dark:text-gray-300">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="relative"
                            >
                              <Input
                                placeholder="Project Inquiry"
                                {...field}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                                         bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-primary focus:border-primary 
                                         dark:focus:ring-primary dark:focus:neon-box-glow-primary
                                         transition-all duration-300 font-inter"
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-space-grotesk text-sm text-gray-700 dark:text-gray-300">
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="relative"
                            >
                              <Textarea
                                placeholder="Hello, I'd like to discuss a potential project..."
                                {...field}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                                         bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-primary focus:border-primary 
                                         dark:focus:ring-primary dark:focus:neon-box-glow-primary
                                         transition-all duration-300 resize-none font-inter"
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg 
                                transition-all duration-300 h-auto font-space-grotesk
                                dark:hover:neon-box-glow-primary shadow-md hover:shadow-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
