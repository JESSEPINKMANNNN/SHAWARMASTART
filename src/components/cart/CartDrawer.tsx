"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, cartTotal, updateQuantity, removeFromCart, user, setOrder, clearCart } = useAppContext();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push("/signup");
      setIsOpen(false);
      return;
    }
    
    // Generate order ID
    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
    
    // Generate WhatsApp Link
    const waLink = generateWhatsAppLink(user, cart, cartTotal, orderId);
    
    // Save order in context
    setOrder({
      id: orderId,
      items: [...cart],
      total: cartTotal,
      status: "Preparing",
      date: new Date().toISOString(),
      estimatedTime: "40 minutes"
    });
    
    // Clear the cart
    clearCart();
    
    // Close Drawer, redirect to order status, and open WhatsApp for notification
    setIsOpen(false);
    window.open(waLink, "_blank");
    router.push("/order-status");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-foreground hover:text-primary transition-colors"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-[#111111] shadow-2xl border-l border-border transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-[#1A1A1A]">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2 text-white">
              <ShoppingCart className="h-6 w-6 text-primary" />
              Your Cart
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <ShoppingCart className="h-16 w-16 opacity-20" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/menu");
                  }}
                  className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
                >
                  Browse Menu
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[#1A1A1A] border border-gray-800">
                  {item.image && (
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white line-clamp-1">{item.name}</h3>
                      <p className="text-primary font-bold text-sm">Rs. {item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-[#222222] border border-gray-700 rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-sm min-w-[1ch] text-center text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 hover:text-red-400 font-medium underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#1A1A1A] border-t border-gray-800 space-y-4">
              <div className="flex justify-between text-lg font-medium text-white">
                <span>Subtotal</span>
                <span className="font-bold">Rs. {cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Delivery Fee</span>
                <span>Calculated via WhatsApp</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between text-xl font-heading font-bold text-white">
                <span>Total</span>
                <span className="text-primary">Rs. {cartTotal}</span>
              </div>
              
              <Button 
                size="lg" 
                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white"
                onClick={handleCheckout}
              >
                {user ? "Complete Order" : "Enter Details to Checkout"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
