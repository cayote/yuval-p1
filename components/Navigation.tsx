"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useScrollSpy from "@/hooks/useScrollSpy";
import { navigationItems } from "@/lib/navigation-data";

export default function Navigation() {
  const activeId = useScrollSpy([
    'projects',
    'the-cooperative',
    'land-of-lords',
    'the-boidem',
    'inside-out',
    'arava-center',
  ]);
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex items-center md:w-full">
      {/* Brand / Title */}
      <Link
        href="/"
        className="text-[13px] font-semibold tracking-[0.18em] uppercase hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2"
      >
        Yuval Cohen Portfolio
      </Link>

      {/* Desktop Menu */}
      <ul role="menubar" className="hidden md:flex items-center gap-8 text-[13px] ml-auto">
        {navigationItems.map((item) => {
          if (item.type === "link") {
            const isInPage = item.href.startsWith('/#') || item.href.startsWith('#');
            return (
              <li role="none" key={item.label}>
                {isInPage ? (
                  <Link
                    role="menuitem"
                    href={item.href}
                    replace
                    aria-current={activeId && item.href.endsWith(`#${activeId}`) ? 'true' : undefined}
                    className={`uppercase tracking-wide hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 ${activeId && item.href.endsWith(`#${activeId}`) ? 'underline underline-offset-4' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    role="menuitem"
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                    className={`uppercase tracking-wide hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 ${pathname.startsWith(item.href) ? 'underline underline-offset-4' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          }

          // Projects dropdown menu
          return (
            <li role="none" key={item.label} className="relative group">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="projects-menu"
                className={`uppercase tracking-wide hover:opacity-80 transition-opacity cursor-default select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 ${activeId ? 'underline underline-offset-4' : ''}`}
              >
                {item.label}
              </button>

              {/* Dropdown panel */}
              <div
                id="projects-menu"
                role="menu"
                aria-label="Projects"
                className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[220px] rounded-md border border-black/10 dark:border-white/15 bg-background shadow-lg ring-1 ring-black/5 dark:ring-white/10 p-2 transition-opacity"
              >
                <ul className="flex flex-col gap-1">
                  {item.items.map((link) => {
                    const isInPage = link.href.startsWith('/#') || link.href.startsWith('#');
                    return (
                      <li role="none" key={link.href}>
                        {isInPage ? (
                          <Link
                            role="menuitem"
                            href={link.href}
                            replace
                            aria-current={activeId && link.href.endsWith(`#${activeId}`) ? 'true' : undefined}
                            className={`block w-full whitespace-nowrap rounded px-3 py-2 text-[13px] tracking-wide hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 ${activeId && link.href.endsWith(`#${activeId}`) ? 'underline' : ''}`}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <Link
                            role="menuitem"
                            href={link.href}
                            className="block w-full whitespace-nowrap rounded px-3 py-2 text-[13px] tracking-wide hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
