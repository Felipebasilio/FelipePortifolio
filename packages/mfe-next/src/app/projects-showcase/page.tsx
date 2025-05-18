import { ProjectsContainer } from "../components";

export default function ProjectsShowcase() {
  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto">
      <section className="py-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          My Projects
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          Explore a selection of my latest work across various technologies and
          frameworks
        </p>
      </section>

      <ProjectsContainer />
    </main>
  );
}
