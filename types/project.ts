export type ProjectMediaType = 'image' | 'video';

export interface ProjectMedia {
  id?: string;
  type: ProjectMediaType;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  // For videos
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface ProjectSectionContent {
  heading?: string;
  body?: string;
  media?: ProjectMedia[];
}

export interface ProjectMeta {
  year?: number | string;
  location?: string;
  role?: string;
  collaborators?: string[];
  tags?: string[];
}

export interface Project {
  slug: string;
  title: string;
  cover: string; // path relative to public, e.g., "/projects/the-cooperative/cover.jpg"
  description: string;
  gallery?: ProjectMedia[];
  sections?: ProjectSectionContent[];
  meta?: ProjectMeta;
}


