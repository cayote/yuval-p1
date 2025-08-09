import { Project } from '../types/project';

export const projects: Project[] = [
  {
    slug: 'the-cooperative',
    title: 'The Cooperative',
    cover: '/projects/the-cooperative/cover.jpg',
    description: 'Re-use of the Shaan Harod Cooperative complex with a new modular typology derived from the original structure to create flexible, adaptable spaces for the organization and community.',
    subtitle: 'Re-use of the Shaan Harod Cooperative complex',
    location: 'Ein Harod, Israel',
    type: 'Adaptive re-use',
    studio: 'Studio 6, 3rd year, 2nd semester',
    collaborators: ['Omri Nadav'],
    lecturer: 'Arch. Gil Even‑Tzur; Arch. Tomer Deren Peretz',
    gallery: [
      { type: 'image', src: '/projects/the-cooperative/img-01.jpg', alt: 'The Cooperative image 1' },
      { type: 'image', src: '/projects/the-cooperative/img-02.jpg', alt: 'The Cooperative image 2' },
      { type: 'image', src: '/projects/the-cooperative/img-03.jpg', alt: 'The Cooperative image 3' },
    ],
  },
  {
    slug: 'land-of-lords',
    title: 'Land of Lords',
    cover: '/projects/land-of-lords/cover.jpg',
    description: 'Spatial research along the Jesus Trail near the Sea of Galilee, proposing five new stations to stitch fragmented ownerships and narratives into a unified landscape.',
    location: 'Sea of Galilee, Israel',
    studio: 'Studio 5, 3rd year, 1st semester',
    collaborators: ['Amir Gershoni'],
    lecturer: 'Arch. Ifat Finkelman; Arch. Roi Dwek',
    gallery: [
      { type: 'image', src: '/projects/land-of-lords/img-01.jpg', alt: 'Land of Lords image 1' },
      { type: 'image', src: '/projects/land-of-lords/img-02.jpg', alt: 'Land of Lords image 2' },
      { type: 'image', src: '/projects/land-of-lords/img-03.jpg', alt: 'Land of Lords image 3' },
    ],
  },
  {
    slug: 'the-boidem',
    title: 'The Boidem',
    cover: '/projects/the-boidem/cover.jpg',
    description: 'Adaptive living system supported by lofts (Boidems) that free the main space from fixed furniture and clutter, forming a flexible and dynamic home.',
    location: 'Kiryat Menahem, Jerusalem, Israel',
    studio: 'Studio 3, 2nd year, 1st semester',
    lecturer: 'Arch. Alon Sarig; Arch. Georgia Hablutzel',
    gallery: [
      { type: 'image', src: '/projects/the-boidem/img-01.jpg', alt: 'The Boidem image 1' },
      { type: 'image', src: '/projects/the-boidem/img-02.jpg', alt: 'The Boidem image 2' },
      { type: 'image', src: '/projects/the-boidem/img-03.jpg', alt: 'The Boidem image 3' },
    ],
  },
  {
    slug: 'inside-out',
    title: 'Inside Out',
    cover: '/projects/inside-out/cover.jpg',
    description: 'Studio exploration examining the relationship between program, site, and landscape through a series of analytical and design interventions.',
    location: 'Arava, Israel',
    studio: 'Studio 8, 4th year, 2nd semester',
    collaborators: ['Alon Atar'],
    lecturer: 'Arch. Matan Sapir; Arch. Lihi Yalin',
    gallery: [
      { type: 'image', src: '/projects/inside-out/img-01.jpg', alt: 'Inside Out image 1' },
      { type: 'image', src: '/projects/inside-out/img-02.jpg', alt: 'Inside Out image 2' },
      { type: 'image', src: '/projects/inside-out/img-03.jpg', alt: 'Inside Out image 3' },
    ],
  },
  {
    slug: 'arava-center',
    title: 'Arava Center',
    cover: '/projects/arava-center/cover.jpg',
    description: 'Visitors center designed with rammed earth precast elements, planned for climatic constraints and construction detailing.',
    studio: 'Building Technology course, 2nd year, 2nd semester',
    collaborators: ['Or Zeevi', 'Snir Zerem', 'Yonatan Harel'],
    lecturer: 'Arch. Eyal Ivry; Arch. Saar Gharan Levi',
    gallery: [
      { type: 'image', src: '/projects/arava-center/img-01.jpg', alt: 'Arava Center image 1' },
      { type: 'image', src: '/projects/arava-center/img-02.jpg', alt: 'Arava Center image 2' },
      { type: 'image', src: '/projects/arava-center/img-03.jpg', alt: 'Arava Center image 3' },
    ],
  },
];

export default projects;


