"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Clock, MapPin, Package } from "lucide-react";
import Link from "next/link";

export default function OrderStatusPage() {
  const { currentOrder, user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentOrder && !user) {
      router.push("/");
    }
  }, [currentOrder, user, router]);

  if (!currentOrder) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar showCart={false} />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Active Order Found</h1>
          <p className="text-muted-foreground mb-6">You don't have any orders placed yet.</p>
          <Link href="/menu" className="text-primary font-bold hover:underline">
            Browse our Menu
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const steps = [
    { label: "Order Placed", active: true },
    { label: "Preparing", active: currentOrder.status === "Preparing" || currentOrder.status === "Out for Delivery" || currentOrder.status === "Delivered" },
    { label: "Out for Delivery", active: currentOrder.status === "Out for Delivery" || currentOrder.status === "Delivered" },
    { label: "Delivered", active: currentOrder.status === "Delivered" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar showCart={false} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-2">Order Status</h1>
            <p className="text-muted-foreground text-lg">Thank you for ordering, {user?.name.split(" ")[0]}!</p>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Order Number</p>
                <p className="text-2xl font-bold font-heading text-foreground">{currentOrder.id}</p>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold">
                <Clock className="h-5 w-5" />
                Est. Delivery: {currentOrder.estimatedTime}
              </div>
            </div>

            {/* Stepper */}
            <div className="relative mb-12 mt-8">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0"></div>
              <div className="relative z-10 flex justify-between">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-4 border-card transition-colors ${step.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {step.active ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                    </div>
                    <span className={`text-xs md:text-sm font-medium ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Details */}
              <div>
                <h3 className="font-heading font-bold text-lg mb-4 border-b border-border pb-2">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-medium">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-border text-primary">
                  <span>Total Paid</span>
                  <span>Rs. {currentOrder.total}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-4 pt-3 border-t border-border/50 text-muted-foreground">
                  <span>Payment Method</span>
                  <span className="font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-lg border border-border/50">
                    Cash on Delivery
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div>
                <h3 className="font-heading font-bold text-lg mb-4 border-b border-border pb-2">Delivery Details</h3>
                <div className="flex items-start gap-3 mb-4 text-sm text-foreground">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-muted-foreground">{user?.phone}</p>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <p className="text-muted-foreground mt-1">{user?.address}</p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-xl mt-6">
                  <p className="text-sm text-muted-foreground mb-1">Need help with your order?</p>
                  <p className="font-bold">Call Support: <a href="tel:03143181361" className="text-primary">0314-3181361</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
