"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE = 120;
const TAX_RATE = 0.16;

/** ShawarmaStart menu — used for Popular Items (same items as /menu) */
const MENU_ITEMS = [
  { id: 1, name: "WAQI BADA SHAWARMA", price: 850, image: "/images/WAQI_BADA_SHAWARMA.png" },
  { id: 2, name: "That's A Wrap!", price: 650, image: "/images/That's_A_Wrap!.png" },
  { id: 3, name: "Dynamic Bites", price: 550, image: "/images/Dynamic_Bites.png" },
  { id: 4, name: "Hummus & Pita", price: 450, image: "/images/hummus_and_pita.png" },
  { id: 5, name: "Garlic Toum Dip", price: 150, image: "/images/Garlic_Toum_Dip.png" },
  { id: 6, name: "Mint Margarita", price: 350, image: "/images/Mint_Margarita.png" },
];

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const popularScrollRef = useRef<HTMLDivElement>(null);
  const { cart, cartTotal, updateQuantity, removeFromCart, user, setOrder, clearCart, addToCart } =
    useAppContext();
  const router = useRouter();

  const tax = cartTotal * TAX_RATE;
  const subtotalWithTax = cartTotal + tax;
  const totalWithDelivery = subtotalWithTax + DELIVERY_FEE;
  // Free delivery when total bill (incl. delivery) reaches Rs. 2000
  const deliveryCharge = totalWithDelivery >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = subtotalWithTax + deliveryCharge;
  const amountToFreeDelivery =
    deliveryCharge > 0 ? Math.max(0, FREE_DELIVERY_THRESHOLD - totalWithDelivery) : 0;

  const popularItems = MENU_ITEMS.filter((item) => !cart.some((c) => c.id === item.id));

  const scrollPopular = (direction: "left" | "right") => {
    popularScrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const confirmOrder = useCallback(() => {
    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

    setOrder({
      id: orderId,
      items: [...cart],
      total: grandTotal,
      status: "Preparing",
      date: new Date().toISOString(),
      estimatedTime: "40 minutes",
    });

    clearCart();

    const formData = new URLSearchParams();
    formData.append("form-name", "new-orders");
    formData.append("orderId", orderId);
    formData.append("customerName", user!.name);
    formData.append("customerPhone", user!.phone);
    formData.append("customerAddress", user!.address);
    formData.append("orderDetails", cart.map((i) => `${i.quantity}x ${i.name}`).join("\n"));
    formData.append("totalBill", grandTotal.toString());

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }).catch(console.error);

    setShowConfirm(false);
    setIsOpen(false);
    router.push("/order-status");
  }, [cart, grandTotal, user, setOrder, clearCart, router]);

  const handleCheckout = () => {
    if (!user) {
      router.push("/signup");
      setIsOpen(false);
      return;
    }
    setCountdown(10);
    setShowConfirm(true);
  };

  useEffect(() => {
    if (!showConfirm) return;
    if (countdown <= 0) {
      confirmOrder();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showConfirm, countdown, confirmOrder]);

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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[60] w-full max-w-md h-dvh flex flex-col bg-[#0a0a0a] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-[#2A2A2A] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header — always top */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] bg-[#111111]">
          <h2 className="text-xl font-bold text-white">Your Cart</h2>
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

        {/* Scrollable body — items, popular, billing (checkout stays below) */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-[#0a0a0a]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 space-y-4 p-8 min-h-[280px]">
              <ShoppingCart className="h-16 w-16 opacity-20" />
              <p className="text-lg font-medium text-white">Your cart is empty</p>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/menu");
                }}
                className="bg-primary text-white hover:bg-primary/90 rounded-full"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <>
              {/* Cart line items */}
              <div className="px-4 pt-4 pb-2 space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-[#141414] rounded-2xl border border-[#2a2a2a]"
                  >
                    {item.image && (
                      <div className="relative h-[72px] w-[72px] rounded-xl overflow-hidden shrink-0 border border-[#333]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-primary transition-colors shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-primary font-bold text-sm mt-1">
                        Rs. {item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors shrink-0"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-sm min-w-[36px] text-center text-white border border-dashed border-gray-500 rounded-lg px-2 py-1 bg-[#0a0a0a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popular Items */}
              {popularItems.length > 0 && (
                <div className="px-4 py-4 border-t border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-base">Popular Items</h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => scrollPopular("left")}
                        className="h-8 w-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-white hover:border-primary/50"
                        aria-label="Scroll popular items left"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollPopular("right")}
                        className="h-8 w-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-white hover:border-primary/50"
                        aria-label="Scroll popular items right"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={popularScrollRef}
                    className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {popularItems.map((item) => (
                      <div
                        key={item.id}
                        className="snap-start shrink-0 w-[140px] bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden"
                      >
                        <div className="relative h-[100px] w-full">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <p className="px-2 pt-2 text-xs font-semibold text-white line-clamp-2 min-h-[2rem]">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              quantity: 1,
                              image: item.image,
                            })
                          }
                          className="m-2 w-[calc(100%-1rem)] rounded-full bg-primary text-white text-xs font-bold py-2 hover:bg-primary/90 transition-colors"
                        >
                          Rs. {item.price.toFixed(2)}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Billing summary */}
              <div className="px-4 pb-4 border-t border-[#2A2A2A] bg-[#111111]">
                {amountToFreeDelivery > 0 ? (
                  <div className="bg-primary/15 text-primary text-sm font-medium px-4 py-2.5 mt-4 rounded-lg border border-primary/40 text-center">
                    Add Rs. {amountToFreeDelivery.toFixed(2)} more to get free delivery.
                  </div>
                ) : (
                  <div className="bg-primary/15 text-primary text-sm font-medium px-4 py-2.5 mt-4 rounded-lg border border-primary/40 text-center">
                    You&apos;ve unlocked free delivery! 🚀
                  </div>
                )}

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>Rs. {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Charges</span>
                    <span>Rs. {deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 pb-2 border-b border-[#2A2A2A]">
                    <span>Tax (16%)</span>
                    <span>Rs. {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white text-lg pt-1">
                    <span>
                      Grand total{" "}
                      <span className="text-xs font-normal text-gray-400">(Incl. Tax)</span>
                    </span>
                    <span>Rs. {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Checkout — always pinned to bottom */}
        {cart.length > 0 && (
          <div className="shrink-0 bg-[#111111] border-t border-[#2A2A2A] p-4">
            <Button
              size="lg"
              className="w-full h-12 text-lg rounded-xl font-bold bg-primary hover:bg-primary/90 text-white"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>

      {/* Confirm Order Popup */}
      {showConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
            onClick={() => setShowConfirm(false)}
          />
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
              <h2 className="text-2xl font-heading font-extrabold text-white mb-8">Confirm Order?</h2>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full h-12 text-lg rounded-xl font-bold bg-primary hover:bg-primary/90 text-white"
                  onClick={confirmOrder}
                >
                  Yeah, looks good
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 text-lg rounded-xl font-bold border-[#2A2A2A] text-white hover:bg-[#1a1a1a]"
                  onClick={() => setShowConfirm(false)}
                >
                  Modify ({countdown})
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
