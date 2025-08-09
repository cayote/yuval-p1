import type { NavigationItem } from "@/types/navigation";

export const navigationItems: NavigationItem[] = [
  {
    type: "menu",
    label: "Projects",
    items: [
      { label: "All Projects", href: "/#projects" },
      { label: "The Cooperative", href: "/#the-cooperative" },
      { label: "Land of Lords", href: "/#land-of-lords" },
      { label: "The Boidem", href: "/#the-boidem" },
      { label: "Inside Out", href: "/#inside-out" },
      { label: "Arava Center", href: "/#arava-center" },
    ],
  },
  {
    type: "link",
    label: "About Me",
    href: "/about-me",
  },
];
