"use client";

import { useCallback } from 'react';
import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';

export interface ScrollLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // expects formats like "#slug" or "/#slug"
}

function isInPageHash(href: string): boolean {
  return href.startsWith('#') || href.startsWith('/#');
}

function extractHash(href: string): string | null {
  if (!isInPageHash(href)) return null;
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;
  return href.slice(hashIndex + 1);
}

export default function ScrollLink({ href, onClick, children, ...rest }: PropsWithChildren<ScrollLinkProps>) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!isInPageHash(href)) {
        onClick?.(e);
        return;
      }

      e.preventDefault();
      const slug = extractHash(href);
      if (!slug) {
        onClick?.(e);
        return;
      }

      const target = document.getElementById(slug);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Replace the current hash without adding a new history entry
        history.replaceState(null, '', `#${slug}`);
      }

      onClick?.(e);
    },
    [href, onClick]
  );

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}


