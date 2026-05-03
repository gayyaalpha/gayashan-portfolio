"use client";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="flex w-full items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
            GD
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">
              Gayashan Dewanarayana
            </div>
            <div className="text-xs text-slate-400">AI Engineer</div>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-300 sm:gap-6">
          <span className="group relative inline-flex h-8 w-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-40 group-hover:animate-none"
            />
            <button
              data-toggle-chat
              aria-label="Toggle AI assistant"
              title="Ask the ninja"
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-base leading-none shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-slate-700"
            >
              🥷
            </button>
          </span>
          <a href="#projects" className="hover:text-sky-400 transition">Projects</a>
          <a href="#contact" className="hover:text-sky-400 transition">Contact</a>
          <a
            href="/assets/Gayashan_Resume.pdf"
            className="rounded-full bg-sky-500 px-4 py-1.5 text-sm text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-400"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
