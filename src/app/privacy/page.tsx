"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-extrabold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="mb-4">
              At ShawarmaStart, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and delivery services.
            </p>
            <p className="mb-4">
              <strong>Information We Collect:</strong> When you place an order, we collect essential details such as your name, phone number, and delivery address to ensure accurate and timely delivery of your food. We do not store any payment information on our servers, as all transactions are handled securely through your preferred payment methods or via WhatsApp ordering.
            </p>
            <p className="mb-4">
              <strong>How We Use Your Information:</strong> Your data is used exclusively to fulfill your orders, communicate with you regarding your delivery, and occasionally send you updates or promotions if you have opted in. We do not sell, rent, or share your personal information with third parties for their marketing purposes.
            </p>
            <p className="mb-4">
              <strong>Security:</strong> We implement standard security measures to protect your personal information from unauthorized access or disclosure. However, please be aware that no method of transmission over the internet is 100% secure.
            </p>
            <p>
              If you have any questions or concerns about our privacy practices, please contact our support team at 0314-3181361.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
