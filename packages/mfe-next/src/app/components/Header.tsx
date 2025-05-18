import Image from "next/image";
import Link from "next/link";

export default function Header({ isTransparent }: { isTransparent?: boolean }) {
  return (
    <header className={`w-full text-gray-200 py-4 px-6 fixed top-0 z-50 ${isTransparent ? "bg-transparent" : "bg-[#121212]"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side links */}
        <div className="flex space-x-6" role="navigation" aria-label="left">
          <Link href="/about" className="hover:text-white transition-colors duration-200" aria-label="About">
            About
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors duration-200" aria-label="Projects">
            Projects
          </Link>
          <Link href="/skills" className="hover:text-white transition-colors duration-200" aria-label="Skills">
            Skills
          </Link>
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
              <span className="text-white font-bold">FB</span>
            </div>
          </Link>
        </div>

        {/* Right side links */}
        <div className="flex space-x-6" role="navigation" aria-label="right">
          <Link href="/blog" className="hover:text-white transition-colors duration-200" aria-label="Blog">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-200" aria-label="Contact">
            Contact
          </Link>
          <Link href="/resume" className="hover:text-white transition-colors duration-200" aria-label="Resume">
            Resume
          </Link>
        </div>
      </div>
    </header>
  );
}