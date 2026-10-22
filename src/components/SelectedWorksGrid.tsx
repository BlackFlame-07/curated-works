import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Layers, Cpu, Smartphone, BarChart3 } from "lucide-react";
import { projectsData, Project } from "../data/projects";

export function SelectedWorksGrid() {
  const scrollToTop = () => {
    if (window.globalLenis) {
      window.globalLenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-36 pb-20 md:pb-36 max-w-[1400px] mx-auto font-inter">
        
        {/* Hero Section */}
        <section className="pb-10 sm:pb-12 md:pb-16 border-b border-[var(--border-primary)]">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)]" />
              <span className="text-[11px] sm:text-xs md:text-sm font-inter uppercase tracking-widest text-[var(--text-tertiary)] font-semibold">
                Case Study Archive
              </span>
            </div>

            <h1 className="font-inter font-medium tracking-tight text-3xl sm:text-5xl md:text-7xl lg:text-[88px] uppercase text-[var(--text-primary)] leading-[0.96]">
              Selected Works
            </h1>

            <p className="font-inter text-xs sm:text-base md:text-xl text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed mt-1 sm:mt-2">
              A curated collection of digital product case studies, clinical software architecture, and high-conversion web systems.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-8 sm:py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-14">
            {projectsData.map((project: Project, index: number) => {
              const primaryMetric = project.keyMetrics?.[0];

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
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

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none">
                        <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-inter text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">
                          {project.category.split("&")[0].trim()}
                        </span>
                      </div>

                      {/* Bottom Pill: Key Metric */}
                      {primaryMetric && (
                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-xs font-inter font-medium shadow-md">
                            <span className="font-semibold text-emerald-400 font-mono">{primaryMetric.value}</span>
                            <span className="text-white/80">{primaryMetric.label}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content - Mobile Ergonomics & Tight Typography */}
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between flex-1 gap-3.5 sm:gap-6">
                      <div className="flex flex-col gap-1.5 sm:gap-2">
                        <div className="flex items-center justify-between gap-4">
                          <h2 className="font-inter font-semibold tracking-tight text-lg sm:text-2xl md:text-3xl leading-snug sm:leading-tight text-[var(--text-primary)] group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                            {project.title}
                          </h2>
                        </div>

                        <p className="font-inter text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-normal sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Tags and Action Link */}
                      <div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-[var(--border-primary)]">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          {project.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] sm:text-[11px] uppercase tracking-wider font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[var(--bg-muted)] text-[var(--text-secondary)] border border-[var(--border-primary)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-[11px] sm:text-xs font-inter font-semibold uppercase tracking-wider text-[var(--text-primary)] group-hover:translate-x-1 transition-transform pt-0.5">
                          <span>Read Full Case Study</span>
                          <span className="text-[var(--text-tertiary)]">→</span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Studio Capabilities Overview */}
        <section className="pt-12 sm:pt-16 pb-14 sm:pb-20 border-t border-[var(--border-primary)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-2 sm:gap-3">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-sm sm:text-base text-[var(--text-primary)]">
                Mobile &amp; Web UX
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-normal sm:leading-relaxed">
                Conversion-focused digital product design with tactile micro-interactions and zero-slop component trees.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-2 sm:gap-3">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-sm sm:text-base text-[var(--text-primary)]">
                Complex Dashboards
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-normal sm:leading-relaxed">
                Streamlined clinical, enterprise, and analytics cockpits that compress heavy data workflows into clean UI.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-2 sm:gap-3">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-sm sm:text-base text-[var(--text-primary)]">
                Modern Tech Stack
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-normal sm:leading-relaxed">
                Engineered with React, TypeScript, Next.js / Vite, Tailwind CSS, and GSAP physics.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-2 sm:gap-3">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-tertiary)]" />
              <h3 className="font-inter font-semibold text-sm sm:text-base text-[var(--text-primary)]">
                Production Deliverables
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-normal sm:leading-relaxed">
                Every project includes design token systems, high-fidelity prototypes, and production frontend code.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Minimal Studio Footer */}
      <footer className="w-full border-t border-[var(--border-primary)] bg-[var(--bg-card)] py-8 sm:py-10 px-4 sm:px-6 md:px-10 lg:px-16 font-inter">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
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
              Confidential Archive · All Rights Reserved
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
