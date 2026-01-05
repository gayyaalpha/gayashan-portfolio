export function ContactSection() {
    return (
      <section>
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">
          Want to collaborate or discuss opportunities? Reach out anytime.
        </p>
  
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:dewanarayana48@gmail.com"
            className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
          >
            Email me
          </a>
  
          <a
            href="https://www.linkedin.com/in/gayashan-dewanarayana"
            target="_blank"
            className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900/40"
          >
            LinkedIn
          </a>
  
          <a
            href="https://github.com/gayyaalpha"
            target="_blank"
            className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900/40"
          >
            GitHub
          </a>
        </div>
  
        <p className="mt-4 text-sm text-slate-400">
          Based in Australia · Open to AI Engineer / Software Engineer roles
        </p>
      </section>
    );
  }
  