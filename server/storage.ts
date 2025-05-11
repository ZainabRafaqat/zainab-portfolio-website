import { 
  type ContactMessage, 
  type InsertContactMessage, 
  type NewsletterSubscriber, 
  type InsertNewsletterSubscriber 
} from "@shared/schema";

export interface IStorage {
  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Newsletter subscribers
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  private contactMessageId: number;
  private subscriberId: number;

  constructor() {
    this.contactMessages = new Map();
    this.newsletterSubscribers = new Map();
    this.contactMessageId = 1;
    this.subscriberId = 1;
  }

  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    // Ensure createdAt is a Date
    const createdAt = message.createdAt || new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  // Newsletter subscriber methods
  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = this.subscriberId++;
    // Ensure subscribedAt is a Date
    const subscribedAt = subscriber.subscribedAt || new Date();
    const newsletterSubscriber: NewsletterSubscriber = { ...subscriber, id, subscribedAt };
    this.newsletterSubscribers.set(id, newsletterSubscriber);
    return newsletterSubscriber;
  }

  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    return Array.from(this.newsletterSubscribers.values()).find(
      (subscriber) => subscriber.email === email
    );
  }
}

export const storage = new MemStorage();
