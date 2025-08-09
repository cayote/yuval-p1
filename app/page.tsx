import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectSection from "@/components/ProjectSection";
import ImageCarousel from "@/components/ImageCarousel";
import projects from "@/lib/projects-data";

export default function Home() {
  return (
    <main>
      <div id="projects" className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Projects
          </h2>
        </header>
        <ImageCarousel gallery={[
          { type: 'image', src: '/projects/the-cooperative/img-01.jpg', alt: 'The Cooperative image 1' },
          { type: 'image', src: '/projects/the-cooperative/img-02.jpg', alt: 'The Cooperative image 2' },
          { type: 'image', src: '/projects/the-cooperative/img-03.jpg', alt: 'The Cooperative image 3' },
        ]} autoPlay infinite pauseOnHover imageSizes="300" />
        <ProjectsGrid projects={projects} />
      </div>
      {projects.map((project) => (
        <ProjectSection key={project.slug} project={project} />
      ))}
    </main>
  );
}
