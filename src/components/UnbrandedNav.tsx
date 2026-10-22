import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, ArrowLeft, Grid } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function UnbrandedNav() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isCaseStudy = location.pathname.startsWith("/project/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 md:py-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left: Brand / Return trigger */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[var(--bg-card)]/80 hover:bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-primary)] shadow-sm transition-all duration-200"
          >
            {isCaseStudy ? (
              <>
                <ArrowLeft className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-inter text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                  All Cases
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-inter text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                  Selected Works
                </span>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] ml-0.5">
                  [ 07 ]
                </span>
              </>
            )}
          </Link>
        </div>

        {/* Right: Meta & Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-primary)] shadow-sm">
            <span className="font-inter text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] font-medium">
              Confidential Client Archive
            </span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="w-9 h-9 rounded-full bg-[var(--bg-card)]/80 hover:bg-[var(--bg-card)] active:scale-95 backdrop-blur-md border border-[var(--border-primary)] shadow-sm flex items-center justify-center text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
