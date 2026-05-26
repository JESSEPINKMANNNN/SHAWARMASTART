"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function SignupPage() {
  const router = useRouter();
  const { user, setUser } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isPhoneValid = /^\d{10,11}$/.test(formData.phone);
  const isFormValid = formData.name.trim() !== "" && isPhoneValid && formData.address.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    router.push("/menu");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-card p-8 rounded-3xl border border-border shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-extrabold text-foreground mb-2">Delivery Details</h2>
            <p className="text-muted-foreground">Tell us where to send your hot shawarma.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-colors ${
                  formData.phone && !isPhoneValid
                    ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    : "border-input focus:ring-primary/50 focus:border-primary"
                }`}
                placeholder="03xxxxxxxxx"
              />
              {formData.phone && !isPhoneValid && (
                <p className="text-red-500 text-xs mt-1">Enter a valid 10-11 digit phone number (digits only)</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                placeholder="House #, Street #, Sector..."
              />
            </div>

            {isFormValid && (
              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
                Continue to Menu
              </Button>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
