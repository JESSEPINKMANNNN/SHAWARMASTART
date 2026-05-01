import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
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
                    <Button variant="ghost" size="icon" className="relative group hover:bg-muted/50" aria-label="Cart">
                        <ShoppingBag className="h-5 w-5 transition-transform group-active:scale-95" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                            0
                        </span>
                    </Button>

                    <Button className="hidden sm:inline-flex">
                        Order Now
                    </Button>
                </div>
            </div>
        </header>
    );
}
