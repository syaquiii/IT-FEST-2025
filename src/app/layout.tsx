import type { Metadata } from "next";
import "@/styles/globals.css";
import { changa, neighbor, robotech } from "@/shared/utils/font";

export const metadata: Metadata = {
  title: "IT FEST 2025 | HIMA KBMDSI UB Competition",
  description:
    "IT FEST 2025 is a prestigious competition organized by HIMA KBMDSI UB, featuring two exciting categories: Business Plan and UI/UX Competition. Join us to showcase your talents and compete with the best!",
  keywords:
    "IT fest, KBMDSI UB, business plan competition, UI UX competition, student competition, FILKOM UB",
  openGraph: {
    title: "IT FEST 2025 | HIMA KBMDSI UB Competition",
    description:
      "IT FEST 2025 is a prestigious competition by HIMA KBMDSI UB featuring Business Plan and UI/UX Competition categories.",
    type: "website",
    locale: "en_US",
    siteName: "IT FEST 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT FEST 2025 | HIMA KBMDSI UB Competition",
    description:
      "IT FEST 2025 is a prestigious competition by KBMDSI UB featuring Business Plan and UI/UX Competition categories.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
