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
    
    const deliveryCharge = 120;
    const tax = cartTotal * 0.16;
    const grandTotal = cartTotal + deliveryCharge + tax;

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
    
    // Close Drawer, redirect to order status, and open WhatsApp for notification
    setIsOpen(false);
    window.open(waLink, "_blank");
    router.push("/order-status");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculations for UI matching
  const deliveryCharge = 120;
  const tax = cartTotal * 0.16;
  const grandTotal = cartTotal + deliveryCharge + tax;

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
        className={`fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white shadow-sm z-10">
          <h2 className="text-xl font-bold flex items-center gap-2 text-black">
            Your Cart
          </h2>
          <div className="flex items-center gap-4">
            {cart.length > 0 && (
              <button 
                onClick={clearCart}
                className="text-[#E31837] font-semibold text-sm hover:underline"
              >
                Clear cart
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto bg-[#F9F9F9]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 p-6">
              <ShoppingCart className="h-16 w-16 opacity-20" />
              <p className="text-lg font-medium text-black">Your cart is empty</p>
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  router.push("/menu");
                }}
                className="bg-[#E31837] text-white hover:bg-[#c2142e]"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  {item.image && (
                    <div className="relative h-20 w-20 rounded-md overflow-hidden shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-black text-base leading-tight">{item.name}</h3>
                    </div>
                    
                    <div className="flex flex-col mt-3">
                      <div className="text-right w-full">
                        <p className="text-black font-bold text-base">Rs. {item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-[#E31837] text-white h-7 w-7 rounded-md flex items-center justify-center hover:bg-[#c2142e] transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-bold text-sm min-w-[20px] text-center text-black border border-gray-200 px-3 py-1 rounded-md bg-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-[#E31837] text-white h-7 w-7 rounded-md flex items-center justify-center hover:bg-[#c2142e] transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-gray-200 pb-safe">
            {/* Free Delivery Banner */}
            <div className="bg-[#FFF0F2] text-[#8C1823] text-sm px-4 py-2 mx-4 mt-4 rounded-md border border-[#FADCDF]">
              Add Rs.2043 more to get free delivery.
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charges</span>
                <span>Rs. {deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-2">
                <span>Tax (16%)</span>
                <span>Rs. {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-black text-lg pt-1">
                <span>Grand total <span className="text-xs font-normal text-gray-500">(Incl. Tax)</span></span>
                <span>Rs. {grandTotal.toFixed(2)}</span>
              </div>
              
              <div className="bg-white text-black border border-[#E31837] text-sm px-4 py-2 rounded-md flex items-center justify-center gap-2 mt-2">
                <span className="text-[#E31837] font-bold">Great! You saved Rs. 411.00.</span>
              </div>

              <div className="pt-3">
                <Button 
                  size="lg" 
                  className="w-full h-12 text-lg rounded-md font-bold bg-[#E31837] hover:bg-[#c2142e] text-white"
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
