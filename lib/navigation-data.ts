import type { NavigationItem } from "@/types/navigation";

export const navigationItems: NavigationItem[] = [
  {
    type: "menu",
    label: "Projects",
    items: [
      { label: "All Projects", href: "/projects" },
      { label: "The Cooperative", href: "/projects/the-cooperative" },
      { label: "Land of Lords", href: "/projects/land-of-lords" },
      { label: "The Boidem", href: "/projects/the-boidem" },
      { label: "Inside Out", href: "/projects/inside-out" },
      { label: "Arava Center", href: "/projects/arava-center" },
    ],
  },
  {
    type: "link",
    label: "About Me",
    href: "/about-me",
  },
];
