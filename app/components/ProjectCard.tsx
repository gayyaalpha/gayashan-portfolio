export type Project = {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
  };
const tag =
  "rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-50">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className={tag}>
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            className="inline-flex items-center rounded-full border border-sky-500 px-4 py-2 text-sm font-medium text-sky-100 hover:bg-sky-500/10"
          >
            GitHub
          </a>
        ) : null}

        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            className="inline-flex items-center rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
          >
            Demo
          </a>
        ) : (
          <span className="inline-flex items-center rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300">
            Demo (coming soon)
          </span>
        )}
      </div>
    </div>
  )
}