import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to store contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Please provide a valid email address" 
        });
      }
      
      // Save message to storage
      const contact = await storage.createContactMessage({
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      });
      
      return res.status(201).json({
        message: "Message sent successfully",
        contactId: contact.id
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  // API route to subscribe to newsletter
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate email
      if (!email) {
        return res.status(400).json({ 
          message: "Email is required" 
        });
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Please provide a valid email address" 
        });
      }
      
      // Check if already subscribed
      const existingSubscription = await storage.getNewsletterSubscriberByEmail(email);
      
      if (existingSubscription) {
        return res.status(200).json({ 
          message: "You're already subscribed to the newsletter" 
        });
      }
      
      // Save subscription
      const subscription = await storage.createNewsletterSubscriber({
        email,
        subscribedAt: new Date(),
      });
      
      return res.status(201).json({
        message: "Successfully subscribed to the newsletter",
        subscriptionId: subscription.id
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      return res.status(500).json({ 
        message: "Failed to subscribe. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
