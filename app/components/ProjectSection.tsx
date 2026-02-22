import {  ProjectCard, type Project } from "./ProjectCard";

const projects: Project[] = [
    {
      title: "GPT Workout Planner (Serverless)",
      description:
        "Serverless backend that generates personalised workout plans using OpenAI and validates outputs against Firestore exercise metadata to reduce hallucinations.",
      tech: ["Python", "Firebase Functions", "Firestore", "OpenAI API"],
    },
    {
      title: "Swimming Pose Analysis + GPT Feedback",
      description:
        "Computer vision pipeline using MediaPipe pose landmarks to compute swim technique metrics, then generates tailored feedback using a custom GPT prompt pipeline.",
      tech: ["Python", "OpenCV", "MediaPipe", "NumPy", "OpenAI API"],
    },
    {
      title: "Mask R-CNN Object Tracking (IoU)",
      description:
        "Tracked multiple COCO objects across frames using IoU-based association and per-class confidence thresholds for improved stability.",
      tech: ["Python", "OpenCV", "Mask R-CNN"],
    },
    {
      title: "Real Tuk Racing (100k+ downloads)",
      description:
        "Cross-platform mobile racing game based on Sri Lankan tuk-tuks, with missions, vehicle upgrades, and an in-game points economy.",
      tech: ["Unity", "C#", "Blender"],
      demo: "https://games.needlesack.com/game-loader?gameName=wheelgame&orientation=landscape",
    },
  ];

export default function ProjectSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
          Selected Work
        </div>
        <h2 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
          Projects
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
          A selection of projects that highlight my work across LLM systems,
          computer vision, and full-stack engineering.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
