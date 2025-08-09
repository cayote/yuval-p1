import Link from "next/link";
import { navigationItems } from "@/lib/navigation-data";

export default function Navigation() {
  return (
    <nav className="w-full flex items-center justify-between py-4">
      <Link href="/" className="text-sm font-semibold tracking-wide uppercase">
        Yuval Cohen Portfolio
      </Link>
      <ul className="hidden md:flex items-center gap-6 text-sm">
        {navigationItems.map((item) => {
          if (item.type === "link") {
            return (
              <li key={item.label}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.label} className="relative">
              <span className="cursor-default">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
