"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isValidPakistaniPhone, PAKISTANI_PHONE_ERROR } from "@/lib/phone";

export default function SignupPage() {
  const router = useRouter();
  const { user, setUser, cart, cartTotal, setOrder, clearCart } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const validatePhone = (phone: string) => {
    if (!phone.trim()) {
      setPhoneError("");
      return false;
    }
    if (!isValidPakistaniPhone(phone)) {
      setPhoneError(PAKISTANI_PHONE_ERROR);
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") validatePhone(value);
  };

  const handleConfirmCheckout = () => {
    if (cart.length > 0) {
      const FREE_DELIVERY_THRESHOLD = 2000;
      const DELIVERY_FEE = 120;
      const TAX_RATE = 0.16;

      const tax = cartTotal * TAX_RATE;
      const subtotalWithTax = cartTotal + tax;
      const totalWithDelivery = subtotalWithTax + DELIVERY_FEE;
      const deliveryCharge = totalWithDelivery >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      const grandTotal = subtotalWithTax + deliveryCharge;

      const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

      setUser(formData);

      setOrder({
        id: orderId,
        items: [...cart],
        total: grandTotal,
        status: "Preparing",
        date: new Date().toISOString(),
        estimatedTime: "40 minutes",
      });

      clearCart();

      const netlifyData = new URLSearchParams();
      netlifyData.append("form-name", "new-orders");
      netlifyData.append("orderId", orderId);
      netlifyData.append("customerName", formData.name);
      netlifyData.append("customerPhone", formData.phone);
      netlifyData.append("customerEmail", formData.email);
      netlifyData.append("customerAddress", formData.address);
      netlifyData.append("orderDetails", cart.map((i) => `${i.quantity}x ${i.name}`).join("\n"));
      netlifyData.append("totalBill", grandTotal.toString());

      fetch("/forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyData.toString(),
      }).catch(console.error);

      setShowConfirmModal(false);
      router.push("/order-status");
    } else {
      setShowConfirmModal(false);
      router.push("/menu");
    }
  };

  const handleConfirmCheckoutRef = useRef(handleConfirmCheckout);
  useEffect(() => {
    handleConfirmCheckoutRef.current = handleConfirmCheckout;
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirmModal) {
      if (countdown <= 0) {
        handleConfirmCheckoutRef.current();
        return;
      }
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showConfirmModal, countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      alert(PAKISTANI_PHONE_ERROR);
      return;
    }
    setCountdown(10);
    setShowConfirmModal(true);
  };

  const isPhoneValid = isValidPakistaniPhone(formData.phone);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar showCart={false} />

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
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="customer@example.com"
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
                onBlur={() => validatePhone(formData.phone)}
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  phoneError ? "border-primary focus:border-primary" : "border-input focus:border-primary"
                }`}
                placeholder="03xx-xxxxxxx"
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "phone-error" : undefined}
              />
              {phoneError && (
                <p id="phone-error" className="mt-2 text-sm text-primary font-medium">
                  {phoneError}
                </p>
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

            <Button
              type="submit"
              disabled={!isPhoneValid}
              className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </Button>
          </form>
        </div>
      </main>

      <Footer />

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] p-8 rounded-3xl max-w-sm w-full shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
            <h3 className="font-heading font-extrabold text-2xl text-white mb-2">Confirm Order</h3>
            <p className="text-gray-400 text-sm mb-6">
              We&apos;re about to fire up the kitchen! Auto-confirming in <span className="text-primary font-bold text-base">{countdown}s</span>...
            </p>
            
            {/* Visual Progress Bar */}
            <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full overflow-hidden mb-8 border border-border/10">
              <div 
                className="bg-primary h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 10) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={handleConfirmCheckout}
                className="w-full h-12 font-bold text-base rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white"
              >
                YEAH, LOOKS GOOD
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmModal(false);
                  router.push("/menu");
                }}
                className="w-full h-12 font-bold text-base rounded-xl bg-transparent border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#111]"
              >
                MODIFY
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
