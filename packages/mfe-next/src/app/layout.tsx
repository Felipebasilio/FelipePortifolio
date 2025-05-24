import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import { Header } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felipe Basilio",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <div className="min-h-screen bg-[#1a1a1a] text-gray-200 font-[family-name:var(--font-geist-sans)] flex flex-col relative">
            <main className="flex-grow flex flex-col justify-center items-center relative z-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
