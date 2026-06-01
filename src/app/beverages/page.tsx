"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { GlassWater } from "lucide-react";

const BEVERAGES = [
    {
        id: 6,
        name: "Mint Margarita",
        price: 350,
        image: "/images/Mint_Margarita.png",
        description:
            "Fresh mint, lemon juice, blended with ice — the perfect cool-down after every spicy bite.",
    },
];

export default function BeveragesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <main className="flex-1 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                            <GlassWater className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-4 tracking-tight">
                            Beverages
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Cool, refreshing, and crafted to complement every
                            bite. Our drinks are made fresh, every single time.
                        </p>
                    </div>

                    {/* Beverages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {BEVERAGES.map((item) => (
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

                    {/* Empty state just in case */}
                    {BEVERAGES.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="text-lg">
                                No beverages available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
