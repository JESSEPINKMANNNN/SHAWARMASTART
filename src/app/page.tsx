import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Full-bleed Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/WAQI_BADA_SHAWARMA.png"
              alt="Sultan Shawarma"
              fill
              className="object-cover object-center brightness-[0.6]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
          </div>

          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/20 text-primary-foreground border border-primary/50 text-sm font-semibold mb-8 backdrop-blur-md">
              Now delivering across Lahore 🚀
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white max-w-4xl tracking-tight leading-tight mb-6">
              ShawarmaStart <br className="hidden sm:block" />
              <span className="text-primary italic">where hunger ends.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-medium leading-relaxed">
              Authentic, bold, and unapologetically delicious. Order the best shawarma in town, delivered piping hot to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/menu" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-[0_0_40px_-10px_rgba(192,57,43,0.8)]" })}>
                Order Delivery <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/menu" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto text-lg h-14 rounded-full bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30" })}>
                View Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="relative py-12 bg-background -mt-8 z-30 pointer-events-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 bg-background p-4 rounded-3xl shadow-xl shadow-black/5 border border-border mx-auto max-w-5xl pointer-events-auto">
              {["Signature Wraps", "Sides & Bites", "Refreshing Drinks"].map((cat) => (
                <button key={cat} className="px-5 py-2.5 rounded-full bg-muted text-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95 text-sm md:text-base border border-transparent hover:border-primary/20">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items List */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 tracking-tight">Legendary Bites</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">The undisputed champions of our menu. If you're new here, start with one of these crowd favorites.</p>
              </div>
              <a href="/menu" className={buttonVariants({ variant: "ghost", className: "text-primary font-bold hover:bg-primary/10 -ml-4 md:ml-0 px-4 py-2 cursor-pointer" })}>
                View Full Menu <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Item Card 1 */}
              <div className="group bg-background rounded-3xl overflow-hidden shadow-sm border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="h-64 bg-muted w-full relative overflow-hidden">
                  <Image src="/images/WAQI_BADA_SHAWARMA.png" alt="WAQI BADA SHAWARMA" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Best Seller 👑
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-heading font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">WAQI BADA SHAWARMA</h3>
                    <span className="font-heading font-bold text-primary text-xl whitespace-nowrap">Rs. 850</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">Double spiced chicken, our signature garlic toum, crispy fries inside, wrapped in fresh saj bread, and topped with our secret spicy drizzle.</p>
                  <AddToCartButton item={{ id: 1, name: "WAQI BADA SHAWARMA", price: 850, image: "/images/WAQI_BADA_SHAWARMA.png" }} />
                </div>
              </div>

              {/* Item Card 2 */}
              <div className="group bg-background rounded-3xl overflow-hidden shadow-sm border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="h-64 bg-muted w-full relative overflow-hidden">
                  <Image src="/images/That's_A_Wrap!.png" alt="That's A Wrap!" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-heading font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">That's A Wrap!</h3>
                    <span className="font-heading font-bold text-primary text-xl whitespace-nowrap">Rs. 650</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">The original. Chicken, pickles, garlic sauce, fries, in classic pita.</p>
                  <AddToCartButton item={{ id: 2, name: "That's A Wrap!", price: 650, image: "/images/That's_A_Wrap!.png" }} />
                </div>
              </div>

              {/* Item Card 3 */}
              <div className="group bg-background rounded-3xl overflow-hidden shadow-sm border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="h-64 bg-muted w-full relative overflow-hidden">
                  <Image src="/images/Dynamic_Bites.png" alt="Dynamic Bites" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-heading font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">Dynamic Bites</h3>
                    <span className="font-heading font-bold text-primary text-xl whitespace-nowrap">Rs. 550</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">Crispy chicken bites tossed in our fiery house dynamite sauce.</p>
                  <AddToCartButton item={{ id: 3, name: "Dynamic Bites", price: 550, image: "/images/Dynamic_Bites.png" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
