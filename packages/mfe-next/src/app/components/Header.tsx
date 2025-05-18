"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header({ isTransparent }: { isTransparent?: boolean }) {
  // Function to handle CV download
  const handleCVDownload = () => {
    // The CV file will be in the public assets folder
    window.open("/assets/cv.pdf", "_blank");
  };

  return (
    <header
      className={`w-full text-gray-200 py-4 px-6 fixed top-0 z-50 ${
        isTransparent ? "bg-transparent" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side links */}
        <div className="flex space-x-6" role="navigation" aria-label="left">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            href="/projects-showcase"
            className="hover:text-white transition-colors duration-200"
            aria-label="Projects"
          >
            Projects
          </Link>
          <Link
            href="/#skills"
            className="hover:text-white transition-colors duration-200"
            aria-label="Skills"
          >
            Skills
          </Link>
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 overflow-hidden">
              <Image
                src="/assets/app-icon.png"
                alt="Felipe Basilio"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Right side links */}
        <div className="flex space-x-6" role="navigation" aria-label="right">
          <button
            onClick={handleCVDownload}
            className="hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0 text-gray-200 font-inherit"
            aria-label="Résumé"
          >
            Résumé
          </button>
        </div>
      </div>
    </header>
  );
}
