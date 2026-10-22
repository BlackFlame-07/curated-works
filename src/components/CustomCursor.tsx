import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const pill = pillRef.current;
    if (!cursor || !follower || !pill) return;

    let isPill = false;
    let isHoveringInteractive = false;

    // Direct ultra-fast coordinate tracking using gsap.quickTo
    gsap.set([cursor, follower, pill], { xPercent: -50, yPercent: -50 });
    
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3", force3D: true });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3", force3D: true });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.25, ease: "power3", force3D: true });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.25, ease: "power3", force3D: true });
    const xToPill = gsap.quickTo(pill, "x", { duration: 0.06, ease: "power3", force3D: true });
    const yToPill = gsap.quickTo(pill, "y", { duration: 0.06, ease: "power3", force3D: true });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
      xToPill(e.clientX);
      yToPill(e.clientY);

      // Check if mouse is directly over highlighted circle card
      const target = e.target as HTMLElement | null;
      const highlightedEl = target?.closest('[data-is-highlighted="true"]');
      if (highlightedEl && !isPill) {
        setPillMode(true);
      } else if (!highlightedEl && isPill && !target?.closest('[data-sphere-index]')) {
        setPillMode(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const setPillMode = (active: boolean) => {
      if (isPill === active) return;
      isPill = active;

      if (active) {
        // Expand into 'take a look' pill
        gsap.to(pill, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.5)", overwrite: "auto" });
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.15, overwrite: "auto" });
        gsap.to(follower, { scale: 0, opacity: 0, duration: 0.15, overwrite: "auto" });
      } else {
        // Collapse back to standard dot cursor
        gsap.to(pill, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });
        if (isHoveringInteractive) {
          gsap.to(cursor, { scale: 3.5, backgroundColor: "var(--bg-primary)", opacity: 0.5, duration: 0.2, overwrite: "auto" });
          gsap.to(follower, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
        } else {
          gsap.to(cursor, { scale: 1, backgroundColor: "var(--text-primary)", opacity: 1, duration: 0.2, overwrite: "auto" });
          gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.2, overwrite: "auto" });
        }
      }
    };

    // Listen to custom events from HeroProjectsWheel
    const onPillChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      setPillMode(!!customEvent.detail?.active);
    };
    window.addEventListener("cursor-pill-change", onPillChange);

    // Efficient event delegation for normal interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-is-highlighted="true"]')) {
        setPillMode(true);
        return;
      }

      const interactive = target?.closest("a, button, input, textarea, select, .interactive");
      if (interactive) {
        isHoveringInteractive = true;
        if (!isPill) {
          gsap.to(cursor, { scale: 3.5, backgroundColor: "var(--bg-primary)", opacity: 0.5, duration: 0.2, overwrite: "auto" });
          gsap.to(follower, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-is-highlighted="true"]')) {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related?.closest('[data-is-highlighted="true"]')) {
          setPillMode(false);
        }
      }

      const interactive = target?.closest("a, button, input, textarea, select, .interactive");
      if (interactive) {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related?.closest("a, button, input, textarea, select, .interactive")) {
          isHoveringInteractive = false;
          if (!isPill) {
            gsap.to(cursor, { scale: 1, backgroundColor: "var(--text-primary)", opacity: 1, duration: 0.2, overwrite: "auto" });
            gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.2, overwrite: "auto" });
          }
        }
      }
    };

    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("cursor-pill-change", onPillChange);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--text-primary)] pointer-events-none z-[99999] hidden md:block" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--text-primary)] opacity-30 pointer-events-none z-[99998] hidden md:block" 
      />
      <div
        ref={pillRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:flex items-center justify-center px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-2xl select-none scale-0 opacity-0 will-change-transform border border-[var(--border-secondary)]"
        style={{ transform: 'translate(-50%, -50%) scale(0)' }}
      >
        <span className="font-inter text-[11px] font-bold uppercase tracking-widest whitespace-nowrap text-[var(--bg-primary)] drop-shadow-sm">
          take a look
        </span>
      </div>
    </>
  );
}
