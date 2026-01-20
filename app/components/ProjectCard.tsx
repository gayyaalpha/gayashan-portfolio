export type Project = {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
  };
  const tag = "rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700";


export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-500 transition">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
            className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            GitHub
          </a>
        ) : null}

        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
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