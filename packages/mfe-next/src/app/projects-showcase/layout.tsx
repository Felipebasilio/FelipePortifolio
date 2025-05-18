import { Footer } from "app/components";
import { Header } from "app/components";
import React from "react";

export default function ProjectsShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
