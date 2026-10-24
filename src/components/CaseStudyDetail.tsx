import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X
} from "lucide-react";
import { motion } from "motion/react";
import { getProjectBySlug, getAdjacentProjects, getNextTwoProjects, projectsData, Project, BentoItem } from "../data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CarouselImageCardProps {
  item: BentoItem;
  index: number;
  onClick: () => void;
}

function CarouselImageCard({ item, index, onClick }: CarouselImageCardProps) {
  // Initialize with explicit aspectRatio from project data if provided, or default fallback
  const [aspectRatio, setAspectRatio] = useState<string>(() => item.aspectRatio || "16 / 10");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (item.aspectRatio) {
      setAspectRatio(item.aspectRatio);
    } else if (imgRef.current?.complete && imgRef.current.naturalWidth && imgRef.current.naturalHeight) {
      setAspectRatio(`${imgRef.current.naturalWidth} / ${imgRef.current.naturalHeight}`);
    }
  }, [item.aspectRatio, item.image]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight && !item.aspectRatio) {
      setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        aspectRatio: aspectRatio,
      }}
      className="h-[280px] sm:h-[380px] md:h-[540px] lg:h-[600px] w-auto shrink-0 rounded-xl md:rounded-2xl overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-card)] relative cursor-pointer select-none group shadow-sm transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center"
    >
      <img
        ref={imgRef}
        src={item.image}
        alt={item.title}
        onLoad={handleImageLoad}
        className="w-full h-full object-contain select-none pointer-events-none"
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Robust slug extraction: handles route param or pathname
  const pathSlug = slug || (typeof window !== "undefined" ? window.location.pathname.split("/").filter(Boolean).pop() : "") || "";
  const project: Project = getProjectBySlug(pathSlug) || projectsData[0];
  const [nextFirst, nextSecond] = getNextTwoProjects(project.slug);
  
  const container = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  const handleKeyDown = (e: KeyboardEvent) => {
    if (activeLightboxIndex === null || !project?.bentoGallery) return;
    if (e.key === "Escape") {
      setActiveLightboxIndex(null);
    } else if (e.key === "ArrowRight") {
      setActiveLightboxIndex((prev) => (prev !== null && prev < project.bentoGallery.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowLeft") {
      setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : project.bentoGallery.length - 1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, project]);

  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      if (window.globalLenis) window.globalLenis.stop();
    } else {
      document.body.style.overflow = "unset";
      if (window.globalLenis) window.globalLenis.start();
    }
    return () => { 
      document.body.style.overflow = "unset"; 
      if (window.globalLenis) window.globalLenis.start();
    };
  }, [activeLightboxIndex]);

  // Reset carousel scroll position and lightbox state whenever the project changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
    setActiveLightboxIndex(null);
  }, [project.slug]);

  // Carousel manual navigation
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.7;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // GSAP scroll animations
  useGSAP(
    () => {
      // Force scroll to top before building animations
      if (window.globalLenis) {
        window.globalLenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);

      // Hero elements fade up
      gsap.from(".hero-anim", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      // Scroll reveals
      const reveals = gsap.utils.toArray<HTMLElement>(".reveal-section");
      reveals.forEach((sec) => {
        gsap.fromTo(
          sec,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timeout);
    },
    { scope: container, dependencies: [project.slug] }
  );

  // Guarantee project pages load and show the top of the page first (pre-paint)
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
  }, [project.slug]);

  useEffect(() => {
    // Post-paint sync to ensure Lenis and ScrollTrigger lock to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.globalLenis) {
      window.globalLenis.scrollTo(0, { immediate: true, force: true });
    }
    const timer = setTimeout(() => {
      if (window.globalLenis) {
        window.globalLenis.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    }, 50);
    return () => clearTimeout(timer);
  }, [project.slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col items-center justify-center p-6 text-center font-inter">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight mb-4">Project Not Found</h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md text-sm md:text-base font-normal">
          The project you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="border border-[var(--border-secondary)] px-8 py-3 rounded-full uppercase tracking-wider text-xs hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors font-normal"
        >
          Return to Overview
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className="font-inter antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300"
    >
      <main className="w-full">
        
        {/* Top Back Navigation Bar */}
        <section className="pt-24 md:pt-32 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between py-4 gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs uppercase tracking-widest font-medium shrink-0"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to cases</span>
            </Link>

            <div className="hidden md:flex items-center justify-end text-right shrink min-w-0">
              <span className="text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-medium truncate text-right">
                {project.category} · {project.year}
              </span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="px-4 md:px-8 lg:px-16 pt-12 md:pt-16 pb-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-3">
            <h1 className="hero-anim font-inter font-semibold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-[var(--text-primary)]">
              {project.title}
            </h1>
            <p className="hero-anim font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] max-w-3xl leading-relaxed font-normal mt-1">
              {project.subtitle}
            </p>
          </div>
        </section>

        {/* Hero Visual Display */}
        <section className="px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto pb-16 md:pb-24">
          <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl md:rounded-2xl shadow-diffused">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </section>

        {/* Project Metadata Ribbon */}
        <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-12 border-t border-[var(--border-primary)] max-w-[1400px] mx-auto font-inter">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                Client
              </span>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium">
                {project.client}
              </p>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                Role
              </span>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium">
                {project.role}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                Timeline
              </span>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium">
                {project.timeline}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                Disciplines
              </span>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium">
                {project.services.join(", ")}
              </p>
            </div>
          </div>
        </section>

        {/* 1. THE CHALLENGE */}
        <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-[var(--border-primary)] max-w-[1400px] mx-auto font-inter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                The Challenge
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div 
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.65] font-normal text-[var(--text-secondary)] [&>p]:mb-5 [&>p:first-child]:text-[var(--text-primary)] [&>p:first-child]:font-medium [&>p:last-child]:mb-0" 
                dangerouslySetInnerHTML={{ __html: project.challenge }} 
              />
            </div>
          </div>
        </section>

        {/* 2. THE SOLUTION */}
        <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-[var(--border-primary)] max-w-[1400px] mx-auto font-inter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                The Solution
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div 
                className="text-base sm:text-lg md:text-xl leading-[1.65] text-[var(--text-secondary)] [&>p]:mb-5 [&>p]:text-base sm:[&>p]:text-xl md:[&>p]:text-2xl [&>p]:font-medium [&>p]:text-[var(--text-primary)] [&>ul]:space-y-3.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:text-sm sm:[&>ul>li]:text-base md:[&>ul>li]:text-lg [&>ul>li]:leading-relaxed [&>ul>li]:text-[var(--text-secondary)] [&>ul>li::marker]:text-[var(--text-tertiary)] [&>ul>li>strong]:font-semibold [&>ul>li>strong]:text-[var(--text-primary)]" 
                dangerouslySetInnerHTML={{ __html: project.solution }} 
              />
            </div>
          </div>
        </section>

        {/* 3. THE RESULT */}
        <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-[var(--border-primary)] max-w-[1400px] mx-auto font-inter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                The Result
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div 
                className="text-base sm:text-lg md:text-xl leading-[1.65] text-[var(--text-secondary)] [&>p]:mb-5 [&>p]:text-base sm:[&>p]:text-xl md:[&>p]:text-2xl [&>p]:font-medium [&>p]:text-[var(--text-primary)] [&>ul]:space-y-3.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:text-sm sm:[&>ul>li]:text-base md:[&>ul>li]:text-lg [&>ul>li]:leading-relaxed [&>ul>li]:text-[var(--text-secondary)] [&>ul>li::marker]:text-[var(--text-tertiary)] [&>ul>li>strong]:font-semibold [&>ul>li>strong]:text-[var(--text-primary)]" 
                dangerouslySetInnerHTML={{ __html: project.result || "" }} 
              />

              {/* Grounded Key Metrics Stat Cards */}
              {project.keyMetrics && project.keyMetrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[var(--border-primary)]">
                  {project.keyMetrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 sm:p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex flex-col gap-1.5 transition-colors hover:border-[var(--border-secondary)]"
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-syne">
                        {metric.value}
                      </span>
                      <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-snug">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. SHOWCASE SECTION: HORIZONTAL CAROUSEL OF IMAGES */}
        {project.bentoGallery && project.bentoGallery.length > 0 && (
          <section className="reveal-section py-16 md:py-24 border-t border-[var(--border-primary)] w-full overflow-hidden font-inter">
            {/* Carousel Header: Title, Swipe to Explore below Visuals, and Navigation Controls */}
            <div className="px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto w-full mb-6 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
                <h2 className="text-base sm:text-lg font-medium tracking-tight text-[var(--text-secondary)]">
                  Visuals
                </h2>

                {/* Micro-Copy & Horizontal Animated Line below Visuals */}
                <div className="flex items-center gap-2.5 sm:gap-3 select-none">
                  <span className="text-[10px] sm:text-xs font-inter uppercase tracking-widest text-[var(--text-tertiary)] select-none whitespace-nowrap">
                    Swipe to explore
                  </span>
                  <div className="w-8 sm:w-12 md:w-14 h-[1px] bg-[var(--border-secondary)] relative overflow-hidden shrink-0">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full bg-[var(--text-primary)] origin-left"
                      animate={{ x: ["-100%", "0%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: [0.77, 0, 0.175, 1], times: [0, 0.5, 1] }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Scroll left"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Scroll right"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrolling Track */}
            <div
              ref={carouselRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-6 md:px-10 lg:px-16 pb-4 pt-2 cursor-grab active:cursor-grabbing will-change-scroll items-center"
            >
              {project.bentoGallery.map((item, bIdx) => (
                <CarouselImageCard
                  key={`${project.slug}-${bIdx}-${item.title}`}
                  item={item}
                  index={bIdx}
                  onClick={() => {
                    if (!hasMovedRef.current) {
                      setActiveLightboxIndex(bIdx);
                    }
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* 4. DELIVERABLES SECTION: 3-COLUMN ESSENTIALS GRID (CENTER-ALIGNED) */}
        {project.scopeItems && project.scopeItems.length > 0 && (
          <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-[var(--border-primary)] w-full max-w-[1400px] mx-auto font-inter">
            <div className="flex flex-col gap-10 w-full">
              
              {/* Header */}
              <div>
                <h2 className="text-base sm:text-lg font-medium tracking-tight text-[var(--text-secondary)]">
                  Deliverables
                </h2>
              </div>

              {/* 3-Column Clean Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 xl:gap-20 w-full">
                {project.scopeItems.slice(0, 3).map((scope, idx) => (
                  <div key={idx} className="flex flex-col gap-5 md:gap-6">
                    <div className="pb-1 md:pb-2 flex flex-col gap-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        {scope.title}
                      </h3>
                      {scope.description && (
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                          {scope.description}
                        </p>
                      )}
                    </div>

                    <ul className="flex flex-col gap-3">
                      {scope.deliverables.map((item, dIdx) => (
                        <li 
                          key={dIdx} 
                          className="flex items-center gap-3 text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* 5. "WANT TO SEE MORE?" ELASTIC FLEX HOVER SECTION */}
        <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-[var(--border-primary)] max-w-[1400px] mx-auto font-inter">
          <div className="mb-8 md:mb-12">
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-[var(--text-secondary)]">
              Want to see more?
            </h2>
          </div>
          
          <div className="py-4 md:py-6">
            <div className="group/row flex flex-col md:flex-row md:h-[68vh] gap-4 md:gap-6">
              
              {/* Left Elastic Panel (Next Project 1) */}
              {nextFirst && (
                <div className="peer/left aspect-[4/3] md:aspect-auto md:h-full flex-1 md:hover:flex-[2] md:peer-hover/right:flex-1 transition-[flex] duration-700 ease-[cubic-bezier(0.85,0.09,0.15,0.91)]">
                  <Link to={`/project/${nextFirst.slug}`} className="flex flex-col h-full opacity-100 block group">
                    <div className="relative cursor-pointer flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-diffused">
                      <img 
                        src={nextFirst.coverImage || nextFirst.heroImage} 
                        alt={nextFirst.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                      />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-3 transition-colors tracking-wide font-inter">
                      {nextFirst.title} <span className="text-[var(--text-tertiary)] font-normal ml-2">/ {nextFirst.category}</span>
                    </p>
                  </Link>
                </div>
              )}

              {/* Right Elastic Panel (Next Project 2) */}
              {nextSecond && (
                <div className="peer/right aspect-[4/3] md:aspect-auto md:h-full flex-1 md:hover:flex-[2] md:peer-hover/left:flex-1 transition-[flex] duration-700 ease-[cubic-bezier(0.85,0.09,0.15,0.91)]">
                  <Link to={`/project/${nextSecond.slug}`} className="flex flex-col h-full opacity-100 block group">
                    <div className="relative cursor-pointer flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-diffused">
                      <img 
                        src={nextSecond.coverImage || nextSecond.heroImage} 
                        alt={nextSecond.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                      />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-3 transition-colors tracking-wide font-inter text-left md:text-right">
                      {nextSecond.title} <span className="text-[var(--text-tertiary)] font-normal ml-2">/ {nextSecond.category}</span>
                    </p>
                  </Link>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA / HANDOFF */}
        <section className="reveal-section px-4 sm:px-6 md:px-10 lg:px-16 pb-24 md:pb-32 pt-8 max-w-[1400px] mx-auto font-inter">
          <div className="flex flex-col items-center justify-center gap-6 py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-2xl shadow-diffused text-center">
            <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--text-primary)]">
              Let's build something.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed font-medium">
              Strategy-led branding and design-driven websites for teams that want to be taken seriously.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href="https://saif-khan-portfolio-nine.vercel.app/#contact"
                className="px-8 py-4 text-xs font-inter uppercase tracking-widest font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full hover:opacity-85 transition-opacity cursor-pointer shadow-lg"
              >
                Inquire now
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox Overlay */}
      {activeLightboxIndex !== null && project.bentoGallery && (
        <div className="fixed inset-0 z-[9990] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 font-inter">
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setActiveLightboxIndex(null)} />
          
          {/* Main Visual Display Column */}
          <div className="relative z-10 flex-1 flex flex-col h-full min-h-0 w-full overflow-hidden">
            {/* Top Bar: Spaced below nav bar pill on mobile (pt-20), inline on desktop */}
            <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 pt-20 md:pt-6 pb-2 shrink-0 pointer-events-auto">
              <button 
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Go back"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-inter font-medium uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/10"
              >
                <ArrowLeft size={14} />
                <span>Go back</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-white/50 text-xs font-mono">
                  {(activeLightboxIndex + 1).toString().padStart(2, '0')} / {project.bentoGallery.length.toString().padStart(2, '0')}
                </span>
                <button 
                  onClick={() => setActiveLightboxIndex(null)}
                  aria-label="Close Lightbox"
                  className="p-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white transition-all cursor-pointer hidden md:flex items-center justify-center border border-white/10"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Highlighted Image Viewport: Pure visual focus with zero text clutter */}
            <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 md:p-10 min-h-0 pointer-events-none">
              <img 
                key={`${project.slug}-${activeLightboxIndex}`}
                src={project.bentoGallery[activeLightboxIndex].image} 
                alt={project.bentoGallery[activeLightboxIndex].title}
                className="max-w-full max-h-[66vh] sm:max-h-[74vh] md:max-h-[82vh] w-auto h-auto object-contain rounded-xl shadow-2xl pointer-events-auto"
              />
            </div>
          </div>

          {/* Thumbnails: Bottom Horizontal Strip on Mobile (< 768px), Right Sidebar on Desktop (>= 768px) */}
          <div 
            data-lenis-prevent="true" 
            className="relative z-10 w-full md:w-48 bg-black/60 md:bg-black/50 border-t md:border-t-0 md:border-l border-white/10 flex flex-row md:flex-col gap-3 md:gap-4 p-3 md:p-4 overflow-x-auto md:overflow-y-auto hide-scrollbar overscroll-contain shrink-0 pointer-events-auto"
          >
            {project.bentoGallery.map((item, idx) => (
              <button
                key={`${project.slug}-thumb-${idx}`}
                onClick={() => setActiveLightboxIndex(idx)}
                className={`relative w-20 md:w-full aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer shrink-0 ${
                  activeLightboxIndex === idx 
                    ? 'ring-2 ring-[var(--text-primary)] scale-100 opacity-100' 
                    : 'opacity-40 hover:opacity-100 scale-95'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}