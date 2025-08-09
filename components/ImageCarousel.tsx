'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Next.js (Client) Tailwind Carousel — TypeScript
 * Features: autoplay, hover pause, arrows, dots, multi-visible, swipe, infinite loop,
 * Next <Image> with responsive sizes, and SSR-safe lazy-loading via IntersectionObserver.
 */

export type GalleryItem = { type: 'image'; src: string; alt?: string };

export interface CarouselProps {
  gallery: GalleryItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number; // ms
  animationDuration?: number; // ms
  visibleCount?: number;
  width?: string; // container width (e.g., '100%', '900px')
  height?: string; // viewport height (e.g., '400px')
  imageObjectFit?: React.CSSProperties['objectFit'];
  imageSizes?: string; // e.g., "(max-width: 768px) 100vw, 50vw"
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  gap?: string | number; // use px for precise layout calc
  className?: string;
  infinite?: boolean;
  enableSwipe?: boolean;
  swipeThreshold?: number; // px
  enableLazy?: boolean; // IntersectionObserver-based mounting
  lazyRootMargin?: string; // e.g., '200px'
}

export default function Carousel({
  gallery = [],
  autoPlay = true,
  autoPlayInterval = 3000,
  animationDuration = 600,
  visibleCount = 1,
  width = '100%',
  height = '400px',
  imageObjectFit = 'cover',
  imageSizes = '(max-width: 768px) 100vw, 50vw',
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  gap = '0px',
  className = '',
  infinite = true,
  enableSwipe = true,
  swipeThreshold = 50,
  enableLazy = true,
  lazyRootMargin = '200px',
}: CarouselProps) {
  const baseSlides = useMemo<GalleryItem[]>(
    () => (gallery || []).filter((s) => s && s.type === 'image' && s.src),
    [gallery]
  );

  const itemCount = baseSlides.length;
  const safeVisible = Math.max(1, Math.min(visibleCount, Math.max(1, itemCount)));
  const pages = Math.max(1, itemCount - safeVisible + 1); // how many starting positions
  const slideBasis = `calc(100% / ${safeVisible})`;

  // Clone count equals visible window to ensure smooth wrap for multi-visible layouts
  const cloneCount = infinite ? Math.min(safeVisible, itemCount) : 0;

  // Build cloned array: [tail clones] + base + [head clones]
  const slides = useMemo<GalleryItem[]>(() => {
    if (!itemCount || !infinite) return baseSlides;
    const head = baseSlides.slice(0, cloneCount);
    const tail = baseSlides.slice(-cloneCount);
    return [...tail, ...baseSlides, ...head];
  }, [baseSlides, infinite, cloneCount, itemCount]);

  // Track index inside the extended array. Start at offset (cloneCount)
  const [index, setIndex] = useState<number>(cloneCount);
  const [transitionOn, setTransitionOn] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Swipe state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const deltaXRef = useRef<number>(0);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Lazy-load: track which slide indices are mounted
  const [mounted, setMounted] = useState<Set<number>>(() => {
    const s = new Set<number>();
    // Pre-mount initial window and neighbors for a smooth start
    for (let i = Math.max(0, index - 1); i < Math.min(slides.length, index + safeVisible + 1); i++) s.add(i);
    return s;
  });
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!enableLazy) return;
    if (!viewportRef.current) return;
    const root = viewportRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        let changed = false;
        const next = new Set(mounted);
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting && !next.has(i)) {
            next.add(i);
            changed = true;
          }
        }
        if (changed) setMounted(next);
      },
      { root, rootMargin: lazyRootMargin, threshold: 0.01 }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableLazy, slides.length, lazyRootMargin, viewportRef.current]);

  // Move helpers
  const gotoIndex = (i: number, useTransition = true) => {
    setTransitionOn(useTransition);
    setIndex(i);
  };

  const next = () => {
    if (!slides.length) return;
    gotoIndex(index + 1, true);
  };

  const prev = () => {
    if (!slides.length) return;
    gotoIndex(index - 1, true);
  };

  // Snap after transition (for clones)
  const handleTransitionEnd = () => {
    if (!infinite || !itemCount) return;
    if (index >= itemCount + cloneCount) {
      const snapTo = index - itemCount; // move from head-clones to head real
      setTransitionOn(false);
      setIndex(snapTo);
    } else if (index < cloneCount) {
      const snapTo = index + itemCount; // move from tail-clones to tail real
      setTransitionOn(false);
      setIndex(snapTo);
    }
  };

  // Re-enable transition after a snap frame
  useEffect(() => {
    if (!transitionOn) {
      const id = window.setTimeout(() => setTransitionOn(true), 0);
      return () => window.clearTimeout(id);
    }
    return;
  }, [transitionOn]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || itemCount <= safeVisible) return;
    if (pauseOnHover && isHovering) return;
    if (isDragging) return;

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      next();
    }, Math.max(800, autoPlayInterval));

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovering, isDragging, itemCount, safeVisible, index]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    setIsHovering(true);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;
    setIsHovering(false);
  };

  // Swipe/drag handlers
  const onPointerDown = (clientX: number) => {
    if (!enableSwipe) return;
    setIsDragging(true);
    startXRef.current = clientX;
    deltaXRef.current = 0;
    setTransitionOn(false); // follow finger
  };

  const onPointerMove = (clientX: number) => {
    if (!enableSwipe || !isDragging) return;
    deltaXRef.current = clientX - startXRef.current;
  };

  const onPointerUp = () => {
    if (!enableSwipe || !isDragging) return;
    const dx = deltaXRef.current;
    setIsDragging(false);
    setTransitionOn(true);

    if (Math.abs(dx) > swipeThreshold) {
      if (dx < 0) next();
      else prev();
    } else {
      // snap back
      gotoIndex(index, true);
    }
  };

  // Derived transforms
  const gapPx = parseGap(gap);
  const slidePercent = 100 / safeVisible; // translate percent per step (ignoring gap)
  const baseTranslate = -index * slidePercent;
  const dragPx = isDragging ? deltaXRef.current : 0;

  if (!itemCount) {
    return (
      <div className={`relative ${className}`} style={{ width }}>
        <div
          className="w-full grid place-items-center overflow-hidden rounded-2xl text-neutral-500"
          style={{ height }}
        >
          No images to display
        </div>
      </div>
    );
  }

  // Dots reflect *pages* of the real list, not clones
  const currentPage = (() => {
    if (!infinite) return Math.min(index, pages - 1);
    const realStartIndex = (index - cloneCount + itemCount) % itemCount;
    return Math.min(realStartIndex, pages - 1);
  })();

  const goToPage = (p: number) => {
    if (!infinite) {
      setIndex(Math.min(Math.max(0, p), pages - 1));
      return;
    }
    const target = p + cloneCount; // shift into extended range
    gotoIndex(target, true);
  };

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
    >
      {/* Viewport */}
      <div
        ref={viewportRef}
        className="w-full overflow-hidden rounded-2xl touch-pan-y"
        style={{ height }}
        onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
        onTouchEnd={onPointerUp}
        onMouseDown={(e) => onPointerDown(e.clientX)}
        onMouseMove={(e) => onPointerMove(e.clientX)}
        onMouseUp={onPointerUp}
        onMouseLeave={() => isDragging && onPointerUp()}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-stretch select-none"
          style={{
            gap,
            transform: `translateX(calc(${baseTranslate}% - ${index * gapPx}px + ${dragPx}px))`,
            transition: transitionOn ? `transform ${animationDuration}ms ease-in-out` : 'none',
            height: '100%',
            cursor: enableSwipe ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              ref={(el) => {slideRefs.current[i] = el;}}
              data-index={i}
              className="relative overflow-hidden rounded-xl bg-neutral-100"
              style={{ flex: `0 0 ${slideBasis}`, height: '100%' }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {enableLazy && !mounted.has(i) ? (
                <div className="absolute inset-0 animate-pulse bg-neutral-200" />
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt || `Slide ${i + 1}`}
                  fill
                  sizes={imageSizes}
                  className="object-cover"
                  style={{ objectFit: imageObjectFit }}
                  priority={i < cloneCount + safeVisible} // prioritize initial window
                />
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {showArrows && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-black/45 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-black/45 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, d) => (
              <button
                key={d}
                type="button"
                aria-label={`Go to slide ${d + 1}`}
                onClick={() => goToPage(d)}
                className={`h-2 rounded-full border border-black/20 bg-white/60 hover:bg-white ${
                  d === currentPage ? 'w-5' : 'w-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* A11y live region */}
      <div className="sr-only" aria-live="polite">
        Slide {currentPage + 1} of {pages}
      </div>
    </div>
  );
}

function parseGap(gap: string | number): number {
  if (typeof gap === 'number') return gap;
  if (!gap) return 0;
  if (gap.toString().endsWith('px')) return parseFloat(String(gap));
  return 0;
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/**
 * Example usage (Next.js page or component):
 *
 * const gallery: GalleryItem[] = [
 *   { type: 'image', src: '/projects/the-cooperative/img-01.jpg', alt: 'The Cooperative image 1' },
 *   { type: 'image', src: '/projects/the-cooperative/img-02.jpg', alt: 'The Cooperative image 2' },
 *   { type: 'image', src: '/projects/the-cooperative/img-03.jpg', alt: 'The Cooperative image 3' },
 * ];
 *
 * <Carousel
 *   gallery={gallery}
 *   autoPlay
 *   autoPlayInterval={3500}
 *   animationDuration={500}
 *   visibleCount={2}
 *   width="900px"
 *   height="520px"
 *   imageObjectFit="cover"
 *   imageSizes="(max-width: 768px) 100vw, 600px"
 *   showArrows
 *   showDots
 *   pauseOnHover
 *   gap="12px"
 *   className="mx-auto"
 *   infinite
 *   enableSwipe
 *   enableLazy
 *   lazyRootMargin="200px"
 * />
 */

