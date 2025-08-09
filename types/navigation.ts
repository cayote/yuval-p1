export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationMenuItem = {
  type: "menu";
  label: string;
  items: NavigationLink[];
};

export type NavigationSimpleLink = {
  type: "link";
  label: string;
  href: string;
};

export type NavigationItem = NavigationMenuItem | NavigationSimpleLink;

export type NavigationItems = NavigationItem[];
