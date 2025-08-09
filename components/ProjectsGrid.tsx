import Image from 'next/image';
import type { Project } from '../types/project';

export interface ProjectsGridProps {
  projects: Project[];
  className?: string;
}

export default function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  return (
    <div
      className={[
        'columns-1 sm:columns-2 lg:columns-3 gap-4',
        className || '',
      ].join(' ')}
      data-testid="projects-grid"
    >
      {projects.map((project) => (
        <article
          key={project.slug}
          className="break-inside-avoid mb-4"
          aria-labelledby={`${project.slug}-title`}
        >
          <a
            href={`#${project.slug}`}
            aria-label={`Jump to ${project.title} section`}
            className="block group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
          >
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              width={1600}
              height={1200}
              className="w-full h-auto rounded-md transition-transform duration-200 group-hover:scale-[1.02]"
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <h3 id={`${project.slug}-title`} className="mt-2 text-base font-medium">
              {project.title}
            </h3>
          </a>
        </article>
      ))}
    </div>
  );
}


