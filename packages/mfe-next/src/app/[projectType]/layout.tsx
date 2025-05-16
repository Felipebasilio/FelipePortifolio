import React from "react";
import { Header, Footer } from "../components";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 font-[family-name:var(--font-geist-sans)]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
