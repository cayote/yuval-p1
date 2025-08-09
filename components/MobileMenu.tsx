"use client";

import Link from "next/link";
import { navigationItems } from "@/lib/navigation-data";

export default function MobileMenu() {
  return (
    <div className="md:hidden py-2">
      <ul className="flex flex-col gap-3 text-sm">
        {navigationItems.map((item) => {
          if (item.type === "link") {
            return (
              <li key={item.label}>
                <Link href={item.href} className="block py-1">
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.label}>
              <span className="block py-1">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
