"use client";

import { useEffect, useMemo, useState } from 'react';

export interface UseScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export default function useScrollSpy(sectionIds: string[], options: UseScrollSpyOptions = {}) {
  const { rootMargin = '0px 0px -60% 0px', threshold = [0, 0.25, 0.5, 0.75, 1] } = options;
  const [activeId, setActiveId] = useState<string | null>(null);

  const ids = useMemo(() => Array.from(new Set(sectionIds)).filter(Boolean), [sectionIds]);

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { root: null, rootMargin, threshold }
    );

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    targets.forEach((el) => observer.observe(el));
    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [ids, rootMargin, threshold]);

  return activeId;
}


