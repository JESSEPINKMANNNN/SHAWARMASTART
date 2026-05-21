"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
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
    
    const tax = cartTotal * 0.16;
    const grandTotalWithDelivery = cartTotal + tax + 120;
    const deliveryCharge = grandTotalWithDelivery >= 2000 ? 0 : 120;
    const grandTotal = cartTotal + tax + deliveryCharge;

    // Generate WhatsApp Link
    const waLink = generateWhatsAppLink(user, cart, grandTotal, orderId);
    
    // Save order in context
    setOrder({
      id: orderId,
      items: [...cart],
      total: grandTotal,
      status: "Preparing",
      date: new Date().toISOString(),
      estimatedTime: "40 minutes"
    });
    
    // Clear the cart
    clearCart();
    
    // Silently send the order details to Netlify Forms for email notification
    const formData = new URLSearchParams();
    formData.append("form-name", "new-orders");
    formData.append("orderId", orderId);
    formData.append("customerName", user.name);
    formData.append("customerPhone", user.phone);
    formData.append("customerAddress", user.address);
    formData.append("orderDetails", cart.map(i => `${i.quantity}x ${i.name}`).join("\n"));
    formData.append("totalBill", grandTotal.toString());

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    }).catch(console.error);

    // Close Drawer, redirect to order status, and open WhatsApp for notification
    setIsOpen(false);
    window.open(waLink, "_blank");
    router.push("/order-status");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculations for UI matching
  const tax = cartTotal * 0.16;
  const grandTotalWithDelivery = cartTotal + tax + 120;
  const deliveryCharge = grandTotalWithDelivery >= 2000 ? 0 : 120;
  const grandTotal = cartTotal + tax + deliveryCharge;
  const amountToFreeDelivery = 2000 - grandTotalWithDelivery;

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
        className={`fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-[#111111] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col border-l border-[#2A2A2A] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A] bg-[#1A1A1A] shadow-sm z-10">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            Your Cart
          </h2>
          <div className="flex items-center gap-4">
            {cart.length > 0 && (
              <button 
                onClick={clearCart}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Clear cart
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto bg-[#111111]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 p-6">
              <ShoppingCart className="h-16 w-16 opacity-20" />
              <p className="text-lg font-medium text-white">Your cart is empty</p>
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  router.push("/menu");
                }}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-[#1e1e1e] rounded-xl shadow-lg border border-[#333333] hover:border-primary/50 transition-colors">
                  {item.image && (
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0 border border-[#333333] shadow-inner">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-extrabold text-white text-lg leading-tight line-clamp-2">{item.name}</h3>
                      <p className="text-primary font-black text-lg whitespace-nowrap">Rs. {item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 mb-auto line-clamp-2">{item.description || "Fresh and delicious."}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-[#111111] p-1 rounded-lg border border-[#333333]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-white hover:text-primary h-7 w-7 rounded flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-sm min-w-[20px] text-center text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-white hover:text-primary h-7 w-7 rounded flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="bg-[#1A1A1A] border-t border-[#2A2A2A] pb-safe">
            {/* Free Delivery Banner */}
            {amountToFreeDelivery > 0 ? (
              <div className="bg-primary/10 text-primary text-sm font-medium px-4 py-2 mx-4 mt-4 rounded-md border border-primary/20">
                Add Rs. {amountToFreeDelivery.toFixed(2)} more to get free delivery.
              </div>
            ) : (
              <div className="bg-green-500/10 text-green-500 text-sm font-medium px-4 py-2 mx-4 mt-4 rounded-md border border-green-500/20 flex items-center justify-center">
                You've unlocked free delivery! 🎉
              </div>
            )}

            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>Delivery Charges</span>
                <span>Rs. {deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 border-b border-[#2A2A2A] pb-2">
                <span>Tax (16%)</span>
                <span>Rs. {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-lg pt-1">
                <span>Grand total <span className="text-xs font-normal text-gray-400">(Incl. Tax)</span></span>
                <span>Rs. {grandTotal.toFixed(2)}</span>
              </div>
              
              {amountToFreeDelivery <= 0 && (
                <div className="bg-[#111111] text-white border border-primary text-sm px-4 py-2 rounded-md flex items-center justify-center gap-2 mt-2">
                  <span className="text-primary font-bold">Great! You saved Rs. 120.00 on delivery.</span>
                </div>
              )}

              <div className="pt-3">
                <Button 
                  size="lg" 
                  className="w-full h-12 text-lg rounded-md font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
