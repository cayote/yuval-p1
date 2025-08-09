import Image from 'next/image';
import type { PropsWithChildren } from 'react';
import type { Project } from '../types/project';

export interface ProjectSectionProps {
  project: Project;
  className?: string;
}

export default function ProjectSection({ project, className, children }: PropsWithChildren<ProjectSectionProps>) {
  const headingId = `${project.slug}-title`;
  return (
    <section
      id={project.slug}
      aria-labelledby={headingId}
      className={[
        'scroll-mt-[var(--header-offset)]',
        className || '',
      ].join(' ')}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <header className="mb-6">
          <h2 id={headingId} className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            {project.title}
          </h2>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <p className="text-base sm:text-[17px] leading-7 opacity-80">{project.description}</p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery?.map((media) => (
                <figure key={media.src} className="overflow-hidden rounded-md">
                  {media.type === 'image' ? (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={media.width ?? 1600}
                      height={media.height ?? 1200}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  {media.caption ? (
                    <figcaption className="mt-2 text-xs opacity-70">{media.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


