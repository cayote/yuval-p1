import type { NavigationItem, NavigationMenuItem } from "@/types/navigation";

export type ActiveOptions = {
  exact?: boolean;
};

export function normalizePath(path: string): string {
  if (!path) return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash === "/") return "/";
  return withSlash.replace(/\/+$/, "");
}

export function isLinkActive(
  currentPath: string,
  href: string,
  options: ActiveOptions = {}
): boolean {
  const { exact = false } = options;
  const current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (exact) return current === target;
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function isMenuActive(
  currentPath: string,
  menu: NavigationMenuItem
): boolean {
  return menu.items.some((link) => isLinkActive(currentPath, link.href));
}

export function deriveActiveMap(
  currentPath: string,
  items: NavigationItem[]
): Record<string, boolean> {
  return items.reduce<Record<string, boolean>>((acc, item) => {
    if (item.type === "link") {
      acc[item.label] = isLinkActive(currentPath, item.href);
    } else if (item.type === "menu") {
      acc[item.label] = isMenuActive(currentPath, item);
    }
    return acc;
  }, {});
}

export function getTopLevelActiveLabel(
  currentPath: string,
  items: NavigationItem[]
): string | null {
  for (const item of items) {
    if (item.type === "link") {
      if (isLinkActive(currentPath, item.href)) return item.label;
    } else if (item.type === "menu") {
      if (isMenuActive(currentPath, item)) return item.label;
    }
  }
  return null;
}
