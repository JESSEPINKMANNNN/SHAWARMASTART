"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

const MENU_CATEGORIES = ["All", "Signature Wraps", "Sides & Bites", "Refreshing Drinks"];

const MENU_ITEMS = [
    { id: 1, name: "WAQI BADA SHAWARMA", category: "Signature Wraps", price: 850, image: "/images/WAQI_BADA_SHAWARMA.png", description: "Double spiced chicken, our signature garlic toum, crispy fries inside, wrapped in fresh saj bread, and topped with our secret spicy drizzle." },
    { id: 2, name: "That's A Wrap!", category: "Signature Wraps", price: 650, image: "/images/That's_A_Wrap!.png", description: "The original. Chicken, pickles, garlic sauce, fries, in classic pita." },
    { id: 3, name: "Dynamic Bites", category: "Sides & Bites", price: 550, image: "/images/Dynamic_Bites.png", description: "Crispy chicken bites tossed in our fiery house dynamite sauce." },
    { id: 4, name: "Hummus & Pita", category: "Sides & Bites", price: 450, image: "/images/hummus_and_pita.png", description: "Creamy house-made hummus drizzled with olive oil, served with 2 warm pitas." },
    { id: 5, name: "Garlic Toum Dip", category: "Sides & Bites", price: 150, image: "/images/Garlic_Toum_Dip.png", description: "Extra side of our famous fluffy garlic sauce." },
    { id: 6, name: "Mint Margarita", category: "Refreshing Drinks", price: 350, image: "/images/Mint_Margarita.png", description: "Fresh mint, lemon juice, blended with ice." },
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredItems = MENU_ITEMS.filter(item =>
        activeCategory === "All" ? true : item.category === activeCategory
    );

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <main className="flex-1 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-4 tracking-tight">Our Menu</h1>
                        <p className="text-muted-foreground text-lg">Every wrap, platter, and bite is crafted with authentic spices and fresh daily ingredients.</p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {MENU_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 active:scale-95 text-sm md:text-base border ${activeCategory === cat ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-muted text-foreground border-border hover:border-primary/30 hover:bg-muted/80'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="group flex flex-col bg-background rounded-3xl overflow-hidden shadow-sm border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                                <div className="h-48 bg-muted w-full relative overflow-hidden">
                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-3 gap-2">
                                        <h3 className="font-heading font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                        <span className="font-heading font-extrabold text-primary text-lg whitespace-nowrap pt-0.5">Rs. {item.price}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">{item.description}</p>
                                    <AddToCartButton item={item} />
                                </div>
                            </div>
                        ))}

                        {filteredItems.length === 0 && (
                            <div className="col-span-full text-center py-20 text-muted-foreground">
                                <p className="text-lg">No items found for this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
