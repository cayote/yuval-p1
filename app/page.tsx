import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectSection from "@/components/ProjectSection";
import projects from "@/lib/projects-data";

export default function Home() {
  return (
    <main>
      <div id="projects" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Projects
          </h2>
        </header>
        <ProjectsGrid projects={projects} />
      </div>
      {projects.map((project) => (
        <ProjectSection key={project.slug} project={project} />
      ))}
    </main>
  );
}
