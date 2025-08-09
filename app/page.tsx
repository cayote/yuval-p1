import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectSection from "@/components/ProjectSection";
import projects from "@/lib/projects-data";

export default function Home() {
  return (
    <main>
      <div id="projects" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <ProjectsGrid projects={projects} />
      </div>
      {projects.map((project) => (
        <ProjectSection key={project.slug} project={project} />
      ))}
    </main>
  );
}
