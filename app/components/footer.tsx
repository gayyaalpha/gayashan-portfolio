export function Footer() {
    return (
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Identity */}
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} Gayashan Dewanarayana
            </p>
  
            {/* Links */}
            <div className="flex gap-6 text-sm">
              <a
                href="https://github.com/gayyaalpha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                GitHub
              </a>
  
              <a
                href="https://www.linkedin.com/in/gayashan-dewanarayana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                LinkedIn
              </a>
  
              <a
                href="#contact"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  