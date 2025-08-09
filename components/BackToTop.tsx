"use client";

import { useEffect, useState } from 'react';
import ScrollLink from './ScrollLink';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={[
        'fixed bottom-5 right-5 z-50 transition-all duration-200',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none',
      ].join(' ')}
    >
      <ScrollLink
        href="/#projects"
        aria-label="Back to top"
        className="rounded-full border border-black/10 bg-background/90 backdrop-blur px-4 py-2 text-[13px] font-medium tracking-wide shadow-sm hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2"
      >
        Back to top
      </ScrollLink>
    </div>
  );
}


