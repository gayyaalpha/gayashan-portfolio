export function Header() {
    return (
      <header className="sticky top-0 z-50 bg-Black/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Name */}
            <a href="#" className="font-bold text-slate-90">
              Gayashan
            </a>
  
            {/* Navigation */}
            <nav className="flex gap-6 text-sm font-medium text-slate-70">
              <a
                href="#projects"
                className="hover:text-sky-500 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="hover:text-sky-500 transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="hover:text-sky-500 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  