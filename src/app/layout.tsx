import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ShawarmaStart | Premium Ordering",
  description: "Modern online ordering and food delivery platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="font-sans min-h-full flex flex-col overflow-x-hidden">
        <AppProvider>
          {children}
          
          {/* Hidden form for Netlify to parse and handle automated order notifications */}
          <form name="new-orders" data-netlify="true" hidden>
            <input type="text" name="orderId" />
            <input type="text" name="customerName" />
            <input type="text" name="customerPhone" />
            <input type="email" name="customerEmail" />
            <input type="text" name="customerAddress" />
            <textarea name="orderDetails"></textarea>
            <input type="text" name="totalBill" />
          </form>
        </AppProvider>
      </body>
    </html>
  );
}
