"use client";

import { useCallback } from 'react';
import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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

      const target = typeof document !== 'undefined' ? document.getElementById(slug) : null;
      if (target) {
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        // Replace the current hash without adding a new history entry
        if (typeof history !== 'undefined') {
          history.replaceState(null, '', `#${slug}`);
        }
      } else {
        // If the target isn't on this page (e.g., from /about-me), navigate to home with the hash
        const destination = href.startsWith('/#') ? href : `/${href}`; // ensures format "/#slug"
        // Use router.push to navigate client-side
        router.push(destination);
      }

      onClick?.(e);
    },
    [href, onClick, router]
  );

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}


