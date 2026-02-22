export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-amber-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
              GD
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-900">
                Gayashan Dewanarayana
              </div>
              <div className="text-xs text-slate-500">AI Engineer</div>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700 sm:gap-6">
            <a href="#projects" className="hover:text-sky-600 transition">Projects</a>
            <a href="#credentials" className="hover:text-sky-600 transition">Credentials</a>
            <a href="#contact" className="hover:text-sky-600 transition">Contact</a>
            <a
              href="/assets/Gayashan_Resume.pdf"
              className="rounded-full bg-sky-500 px-4 py-1.5 text-sm text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              Resume
            </a>
          </nav>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-sky-400 via-amber-300 to-sky-400 opacity-70" />
      </header>
      
    );
  }
  
