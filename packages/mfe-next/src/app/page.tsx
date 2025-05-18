import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Felipe Basilio
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-8">
          Software Engineer
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects-showcase"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
          >
            View Projects
          </Link>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-md transition-colors duration-200"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}
