import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 font-[family-name:var(--font-geist-sans)]">
      <Header />
      
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="py-16 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Felipe Basilio</h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-8">Frontend Developer & UI/UX Enthusiast</p>
          <div className="flex gap-4">
            <a 
              href="#projects" 
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-md transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card 1 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:translate-y-[-5px] transition-transform duration-200">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project One</h3>
                <p className="text-gray-400 mb-4">A brief description of the project and technologies used.</p>
                <a href="#" className="text-blue-400 hover:underline">View Details →</a>
              </div>
            </div>
            
            {/* Project Card 2 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:translate-y-[-5px] transition-transform duration-200">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-4xl">💻</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project Two</h3>
                <p className="text-gray-400 mb-4">A brief description of the project and technologies used.</p>
                <a href="#" className="text-blue-400 hover:underline">View Details →</a>
              </div>
            </div>
            
            {/* Project Card 3 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:translate-y-[-5px] transition-transform duration-200">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project Three</h3>
                <p className="text-gray-400 mb-4">A brief description of the project and technologies used.</p>
                <a href="#" className="text-blue-400 hover:underline">View Details →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#121212] py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2023 Felipe Basilio. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              <span>GitHub</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">LinkedIn</span>
              <span>LinkedIn</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
