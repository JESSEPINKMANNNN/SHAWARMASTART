"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { UtensilsCrossed } from "lucide-react";

const SIDES = [
    {
        id: 5,
        name: "Garlic Toum Dip",
        price: 150,
        image: "/images/Garlic_Toum_Dip.png",
        description:
            "Extra side of our famous fluffy garlic sauce. Creamy, punchy, and absolutely addictive.",
    },
    {
        id: 4,
        name: "Hummus & Pita",
        price: 450,
        image: "/images/hummus_and_pita.png",
        description:
            "Creamy house-made hummus drizzled with olive oil, served with 2 warm pitas. A perfect starter.",
    },
    {
        id: 3,
        name: "Dynamic Bites",
        price: 550,
        image: "/images/Dynamic_Bites.png",
        description:
            "Crispy chicken bites tossed in our fiery house dynamite sauce. Bold, crunchy, and unforgettable.",
    },
];

export default function SidesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <main className="flex-1 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                            <UtensilsCrossed className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-4 tracking-tight">
                            Sides
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Every great shawarma deserves a great sidekick.
                            Dips, bites, and extras to round out your order.
                        </p>
                    </div>

                    {/* Sides Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {SIDES.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col bg-background rounded-3xl overflow-hidden shadow-sm border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full"
                            >
                                <div className="h-56 bg-muted w-full relative overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-3 gap-2">
                                        <h3 className="font-heading font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="font-heading font-extrabold text-primary text-lg whitespace-nowrap pt-0.5">
                                            Rs. {item.price}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                                        {item.description}
                                    </p>
                                    <AddToCartButton item={item} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {SIDES.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="text-lg">
                                No sides available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
