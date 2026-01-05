const tag =
  "rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200";
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
        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            A selection of projects showcasing my work across AI, computer vision,
            and full-stack software engineering.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Project 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold">
                GPT Workout Planner (Serverless)
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Serverless backend that generates personalised workout plans using
                OpenAI, with strict Firestore-based validation to prevent hallucinations.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="{tag}">Python</span>
                <span className="{tag}">Firebase</span>
                <span className="{tag}">OpenAI API</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold">
                Swimming Pose Analysis + GPT Feedback
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                MediaPipe-based pose tracking system that extracts swimming technique
                metrics and generates personalised coaching feedback using GPT.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="{tag}">MediaPipe</span>
                <span className="{tag}">OpenCV</span>
                <span className="{tag}">Python</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold">
                Mask R-CNN Object Tracking
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Implemented IoU-based object tracking with per-class confidence
                thresholds for stable multi-object detection across video frames.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="{tag}">Mask R-CNN</span>
                <span className="{tag}">OpenCV</span>
                <span className="{tag}">Python</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold">
                Real Tuk Racing (50k+ downloads)
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Cross-platform mobile racing game built with Unity featuring missions,
                vehicle upgrades, and an in-game economy.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="{tag}">Unity</span>
                <span className="{tag}">C#</span>
                <span className="{tag}">Blender</span>
              </div>
            </div>
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
