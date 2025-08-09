import { Project } from '../types/project';

export const projects: Project[] = [
  {
    slug: 'the-cooperative',
    title: 'The Cooperative',
    cover: '/projects/the-cooperative/cover.jpg',
    description: 'Overview and selected works from The Cooperative project.',
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
    description: 'Concepts and visuals for Land of Lords.',
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
    description: 'Narrative and imagery for The Boidem.',
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
    description: 'Inside Out exploration and gallery.',
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
    description: 'Arava Center materials and presentation.',
    gallery: [
      { type: 'image', src: '/projects/arava-center/img-01.jpg', alt: 'Arava Center image 1' },
      { type: 'image', src: '/projects/arava-center/img-02.jpg', alt: 'Arava Center image 2' },
      { type: 'image', src: '/projects/arava-center/img-03.jpg', alt: 'Arava Center image 3' },
    ],
  },
];

export default projects;


