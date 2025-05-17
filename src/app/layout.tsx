import type { Metadata } from "next";
import "@/styles/globals.css";
import { changa, neighbor, robotech } from "@/shared/utils/font";

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
        className={` ${neighbor.variable} ${robotech.variable} ${changa.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
