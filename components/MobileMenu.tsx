"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { navigationItems } from "@/lib/navigation-data";
import type { NavigationItem } from "@/types/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  // Close on Escape
  useEffect(() => {
    setMounted(true);
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  function toggleMenu() {
    setIsOpen((v) => !v);
  }

  function handleItemClick() {
    setIsOpen(false);
  }

  function toggleSubmenu(label: string) {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function renderItem(item: NavigationItem) {
    if (item.type === "link") {
      const className = "block w-full text-left px-4 py-3 text-base tracking-wide hover:bg-black/5 dark:hover:bg-white/10 transition-colors";
      const isInPage = item.href.startsWith('/#') || item.href.startsWith('#');
      return (
        <li key={item.label}>
          {isInPage ? (
            <Link href={item.href} replace className={className} onClick={handleItemClick}>
              {item.label}
            </Link>
          ) : (
            <Link href={item.href} className={className} onClick={handleItemClick}>
              {item.label}
            </Link>
          )}
        </li>
      );
    }

    const isExpanded = !!expandedMenus[item.label];
    const buttonClass = "w-full flex items-center justify-between px-4 py-3 text-base tracking-wide hover:bg-black/5 dark:hover:bg-white/10 transition-colors";
    return (
      <li key={item.label}>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isExpanded}
          aria-controls={`submenu-${item.label}`}
          className={buttonClass}
          onClick={() => toggleSubmenu(item.label)}
        >
          <span>{item.label}</span>
          <span aria-hidden className="ml-3 select-none">{isExpanded ? "−" : "+"}</span>
        </button>
        <ul
          id={`submenu-${item.label}`}
          role="menu"
          className={`${isExpanded ? "max-h-96" : "max-h-0"} overflow-hidden transition-[max-height] duration-300`}
        >
          {item.items.map((link) => {
            const isInPage = link.href.startsWith('/#') || link.href.startsWith('#');
            return (
              <li key={link.href}>
                {isInPage ? (
                  <Link
                    href={link.href}
                    replace
                    className="block w-full pl-8 pr-4 py-3 text-base tracking-wide hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    onClick={handleItemClick}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="block w-full pl-8 pr-4 py-3 text-base tracking-wide hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    onClick={handleItemClick}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        className="relative inline-flex h-10 w-12 items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2"
        onClick={toggleMenu}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="flex flex-col items-center justify-center gap-[6px]">
          <span
            className={`block h-[2px] w-7 bg-neutral-600 transition-transform duration-200 ${
              isOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-7 bg-neutral-600 transition-transform duration-200 ${
              isOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Portalized overlay + panel to ensure outside clicks work across browsers */}
      {mounted &&
        createPortal(
          <>
            {isOpen ? (
              <div
                className="fixed inset-0 z-50 bg-black/0"
                role="presentation"
                onClick={() => setIsOpen(false)}
              />
            ) : null}

            <div
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              className={`${
                isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-4 opacity-0 pointer-events-none"
              } fixed inset-x-0 top-0 z-[60] mt-0 bg-background/95 backdrop-blur-sm border-b border-black/10 transition-all duration-200`}
            >
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
                <ul className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
                  {navigationItems.map((item) => renderItem(item))}
                </ul>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
