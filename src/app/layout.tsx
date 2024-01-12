import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Euy Commerce",
  description: "Shop and green the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Navbar />
        <div className=" min-h-screen pb-10 overflow-x-hidden">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
