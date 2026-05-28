import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface NavbarProps {
    showCart?: boolean;
}

export function Navbar({ showCart = true }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6">
                    {/* Mobile Menu */}
                    <button className="lg:hidden text-foreground">
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

                    <Button className="hidden sm:inline-flex p-0">
                        <Link href="/menu" className="w-full h-full flex items-center justify-center px-4">
                            Order Now
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
