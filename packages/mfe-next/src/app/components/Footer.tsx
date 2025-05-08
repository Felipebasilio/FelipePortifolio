import Link from "next/link";
import { PiLinkedinLogoLight } from "react-icons/pi";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#121212] py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">© 2023 Felipe Basilio. All rights reserved.</p>
        <div className="flex space-x-10">
          <a href="https://github.com/Felipebasilio" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
            <FaGithubSquare />
            <span className="sr-only">GitHub</span>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/felipe-basilio-9a65a6154/" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
            <PiLinkedinLogoLight />
            <span className="sr-only">LinkedIn</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}