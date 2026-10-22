import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle2, Layers, Cpu, Smartphone, BarChart3, Globe } from "lucide-react";
import { projectsData, Project } from "../data/projects";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "Mobile App & Product Design", label: "Mobile Apps" },
  { id: "Practice Management & Clinic Operations Dashboard", label: "Dashboards" },
  { id: "Personal Brand & Web Architecture", label: "Identity & Web" },
  { id: "Enterprise Web Architecture & Technical SEO", label: "Enterprise" },
];

export function SelectedWorksGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory || p.services.some(s => s.toLowerCase().includes(activeCategory.toLowerCase())));

  const scrollToTop = () => {
    if (window.globalLenis) {
      window.globalLenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-24 md:pb-36 max-w-[1400px] mx-auto font-inter">
        
        {/* Hero Section */}
        <section className="pb-12 md:pb-16 border-b border-[var(--border-primary)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)]" />
              <span className="text-xs sm:text-sm font-inter uppercase tracking-widest text-[var(--text-tertiary)] font-semibold">
                Case Study Archive · 2024–2026
              </span>
            </div>

            <h1 className="font-inter font-medium tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[88px] uppercase text-[var(--text-primary)] leading-[0.94]">
              Selected Works
            </h1>

            <p className="font-inter text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed mt-2">
              An unbranded collection of digital product case studies, clinical software architecture, and high-conversion web systems.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === "all" 
                ? projectsData.length 
                : projectsData.filter(p => p.category === cat.id || p.services.some(s => s.toLowerCase().includes(cat.id.toLowerCase()))).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-inter uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-sm"
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-primary)] hover:border-[var(--border-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[var(--bg-primary)]/20 text-[var(--bg-primary)]" : "bg-[var(--border-primary)] text-[var(--text-tertiary)]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-14">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: Project, index: number) => {
                const primaryMetric = project.keyMetrics?.[0];
                const displayIndex = (index + 1).toString().padStart(2, "0");

                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group flex flex-col"
                  >
                    <Link
                      to={`/project/${project.slug}`}
                      className="flex flex-col h-full rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden shadow-diffused hover:border-[var(--border-secondary)] transition-all duration-300"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
                        <img
                          src={project.coverImage || project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          loading={index < 4 ? "eager" : "lazy"}
                          decoding="async"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-medium uppercase tracking-wider">
                            {displayIndex} / {project.category.split("&")[0].trim()}
                          </span>

                          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-sm">
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>

                        {/* Bottom Pill: Key Metric */}
                        {primaryMetric && (
                          <div className="absolute bottom-4 left-4 pointer-events-none">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-inter font-medium shadow-md">
                              <span className="font-semibold text-emerald-400 font-mono">{primaryMetric.value}</span>
                              <span className="text-white/80">{primaryMetric.label}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-4">
                            <h2 className="font-inter font-semibold tracking-tight text-2xl sm:text-3xl text-[var(--text-primary)] group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                              {project.title}
                            </h2>
                            <span className="font-mono text-xs text-[var(--text-tertiary)] uppercase shrink-0">
                              {project.year}
                            </span>
                          </div>

                          <p className="font-inter text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Tags and Deliverables */}
                        <div className="flex flex-col gap-4 pt-4 border-t border-[var(--border-primary)]">
                          <div className="flex flex-wrap items-center gap-2">
                            {project.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-[var(--bg-muted)] text-[var(--text-secondary)] border border-[var(--border-primary)]"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-[10px] font-mono text-[var(--text-tertiary)] px-1">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs font-inter font-semibold uppercase tracking-wider text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                            <span>Read Full Case Study</span>
                            <span className="text-[var(--text-tertiary)]">→</span>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Studio Capabilities Overview */}
        <section className="pt-16 pb-20 border-t border-[var(--border-primary)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-3">
              <Smartphone className="w-5 h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-base text-[var(--text-primary)]">
                Mobile &amp; Web UX
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Conversion-focused digital product design with tactile micro-interactions and zero-slop component trees.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-3">
              <BarChart3 className="w-5 h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-base text-[var(--text-primary)]">
                Complex Dashboards
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Streamlined clinical, enterprise, and analytics cockpits that compress heavy data workflows into clean UI.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-3">
              <Cpu className="w-5 h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-base text-[var(--text-primary)]">
                Modern Tech Stack
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Engineered with React 19, TypeScript, Next.js / Vite, Tailwind CSS v4, and 60fps GSAP physics.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-3">
              <Layers className="w-5 h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-base text-[var(--text-primary)]">
                Production Deliverables
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Every project includes Figma token systems, high-fidelity prototypes, and production frontend code.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Unbranded Minimal Studio Footer */}
      <footer className="w-full border-t border-[var(--border-primary)] bg-[var(--bg-card)] py-10 px-4 sm:px-6 md:px-10 lg:px-16 font-inter">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="font-inter text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)]">
              Selected Works
            </span>
            <span className="text-[var(--border-secondary)]">/</span>
            <span className="text-xs text-[var(--text-tertiary)]">
              Case Studies &amp; Product Architecture Archive
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer font-medium"
            >
              Back to top ↑
            </button>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              © {new Date().getFullYear()} Confidential Archive
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
