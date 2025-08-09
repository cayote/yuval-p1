import type { NavigationItem, NavigationMenuItem } from "@/types/navigation";

export type ActiveOptions = {
  exact?: boolean;
};

export function normalizePath(path: string): string {
  if (!path) return "/";
  // Strip hash for path comparison
  const [pathname] = path.split('#');
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
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

  // If both have hashes and hashes match, treat as active
  const currentHash = currentPath.split('#')[1] ?? null;
  const targetHash = href.split('#')[1] ?? null;
  if (currentHash && targetHash && currentHash === targetHash) return true;

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
