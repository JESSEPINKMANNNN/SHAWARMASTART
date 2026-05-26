import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted text-foreground">
            <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <span className="font-heading text-3xl font-bold text-primary">
                            ShawarmaStart
                        </span>
                        <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
                            Authentic, crave-worthy shawarma delivered straight to your door. Where hunger ends.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
                        <Link href="/menu" className="hover:text-primary transition-colors">Menu</Link>
                        <Link href="/order-status" className="hover:text-primary transition-colors">Track Order</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} ShawarmaStart. All rights reserved. Designed to Wow.
                </div>
            </div>
        </footer>
    );
}
