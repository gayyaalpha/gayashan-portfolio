export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Hero Section */}
        <section>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
            AI Engineer · Computer Vision · LLM Systems
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            Hi, I&apos;m <span className="text-sky-400">Gayashan Dewanarayana</span>.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            I build intelligent systems that combine{" "}
            <span className="font-semibold">AI, computer vision, and solid software engineering</span>.
            From GPT-powered workout planners to swimming pose analysis engines, I enjoy turning
            complex ideas into production-ready tools.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/gayyaalpha"
              target="_blank"
              className="inline-flex items-center rounded-full border border-sky-500 px-4 py-2 text-sm font-medium text-sky-100 hover:bg-sky-500/10"
            >
              View my GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/gayashan-dewanarayana"
              target="_blank"
              className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
            >
              Connect on LinkedIn
            </a>
          </div>
        </section>

        {/* Placeholder for upcoming sections */}
        <section className="border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-400">
            Coming next: projects, skills, and contact section. We&apos;ll build these step by step.
          </p>
        </section>

      </div>
    </main>
  );
}
