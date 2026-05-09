"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-heading font-extrabold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-12">We'd love to hear from you! Whether you have a question about our menu, an order issue, or just want to say hi.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Phone Support</h3>
              <p className="text-muted-foreground text-sm mb-2">Call us for immediate assistance.</p>
              <a href="tel:03143181361" className="text-primary font-bold hover:underline">0314-3181361</a>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground text-sm mb-2">Drop us an email anytime.</p>
              <a href="mailto:support@shawarmastart.com" className="text-primary font-bold hover:underline">support@shawarmastart.com</a>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-muted-foreground text-sm mb-2">Visit our main kitchen in Lahore.</p>
              <span className="text-primary font-bold">Lahore, Pakistan</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
