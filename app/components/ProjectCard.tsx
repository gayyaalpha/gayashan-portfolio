import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full rounded-2xl border border-amber-200/80 bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-900">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-3">
        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700"
            >
              {item}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            GitHub
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-400 transition"
          >
            Live Demo
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
