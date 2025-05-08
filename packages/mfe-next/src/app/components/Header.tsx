import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#121212] text-gray-200 py-4 px-6 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side links */}
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-white transition-colors duration-200">
            About
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors duration-200">
            Projects
          </Link>
          <Link href="/skills" className="hover:text-white transition-colors duration-200">
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
        <div className="flex space-x-6">
          <Link href="/blog" className="hover:text-white transition-colors duration-200">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-200">
            Contact
          </Link>
          <Link href="/resume" className="hover:text-white transition-colors duration-200">
            Resume
          </Link>
        </div>
      </div>
    </header>
  );
}