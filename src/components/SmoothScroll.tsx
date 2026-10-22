import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    globalLenis: Lenis;
  }
}

export function SmoothScroll() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    window.globalLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number, deltaTime: number, frame: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // CRITICAL: Lenis requires raw un-smoothed timestamps to calculate physics correctly.
    // If GSAP smooths the time, Lenis miscalculates delta and causes extreme lag on tab return.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Ensure every page/project load immediately resets to the top before browser paint
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.globalLenis) {
      window.globalLenis.scrollTo(0, { immediate: true, force: true });
    }
    requestAnimationFrame(() => {
      if (window.globalLenis) {
        window.globalLenis.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    });
  }, [location.pathname]);

  return null;
}
