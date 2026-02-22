export function Footer() {
    return (
      <footer className="relative overflow-hidden border-t border-amber-200/70 bg-gradient-to-b from-amber-50 via-white to-sky-50">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_top,rgba(56,189,248,0.16),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_bottom_right,rgba(251,191,36,0.16),transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
                Let&apos;s Build
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                Gayashan Dewanarayana
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                AI Engineer focused on computer vision, LLM workflows, and
                production-ready full-stack systems.
              </p>
            </div>

            <div className="flex flex-col gap-6 text-sm text-slate-600 sm:flex-row sm:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Quick Links
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="#projects" className="hover:text-slate-900 transition">
                    Projects
                  </a>
                  <a href="#credentials" className="hover:text-slate-900 transition">
                    Credentials
                  </a>
                  <a href="#contact" className="hover:text-slate-900 transition">
                    Contact
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Connect
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href="mailto:dewanarayana48@gmail.com"
                    className="hover:text-slate-900 transition"
                  >
                    dewanarayana48@gmail.com
                  </a>
                  <a
                    href="https://github.com/gayyaalpha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gayashan-dewanarayana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-amber-200/70 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} Gayashan Dewanarayana. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  
