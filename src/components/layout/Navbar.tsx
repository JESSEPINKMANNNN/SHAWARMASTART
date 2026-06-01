"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface NavbarProps {
    showCart?: boolean;
}

export function Navbar({ showCart = true }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6">
                    {/* Mobile Menu */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden text-foreground hover:text-primary transition-colors p-1"
                        aria-label="Toggle Menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-heading text-xl font-bold text-primary tracking-tight">
                            ShawarmaStart
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        <Link href="/menu" className="transition-colors hover:text-primary">
                            Menu
                        </Link>
                        <Link href="/locations" className="transition-colors hover:text-primary">
                            Locations
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-primary">
                            Our Story
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {showCart && <CartDrawer />}

                    <Link href="/menu" className={buttonVariants({ className: "hidden sm:inline-flex px-4" })}>
                        Order Now
                    </Link>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    {/* Drawer content */}
                    <div 
                        className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs flex flex-col border-r border-[#1a1a1a] p-6 shadow-2xl transition-transform duration-300 ease-in-out transform translate-x-0 z-50"
                        style={{ backgroundColor: "#0a0a0a" }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-heading text-xl font-bold text-primary tracking-tight">
                                ShawarmaStart
                            </span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-foreground hover:text-primary p-1 transition-colors"
                                aria-label="Close Menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <nav className="flex flex-col gap-6 text-lg font-medium">
                            <Link 
                                href="/menu" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="transition-colors hover:text-primary border-b border-[#1a1a1a] pb-2 text-gray-300"
                            >
                                Menu
                            </Link>
                            <Link 
                                href="/locations" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="transition-colors hover:text-primary border-b border-[#1a1a1a] pb-2 text-gray-300"
                            >
                                Locations
                            </Link>
                            <Link 
                                href="/about" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="transition-colors hover:text-primary border-b border-[#1a1a1a] pb-2 text-gray-300"
                            >
                                Our Story
                            </Link>
                        </nav>
                        
                        <div className="mt-auto">
                            <Link href="/menu" className={buttonVariants({ className: "w-full py-2 font-bold" })} onClick={() => setIsMobileMenuOpen(false)}>
                                Order Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
