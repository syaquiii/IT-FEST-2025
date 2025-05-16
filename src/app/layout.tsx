import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { changa, neighbor, robotech } from "@/shared/utils/font";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT FEST 2025",
  description: "IT FEST 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${neighbor.variable} ${robotech.variable} ${changa.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
