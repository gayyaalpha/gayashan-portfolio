import {  ProjectCard, type Project } from "./ProjectCard";

const projects: Project[] = [
    {
      title: "GPT Workout Planner (Serverless)",
      description:
        "Serverless backend that generates personalised workout plans using OpenAI and validates outputs against Firestore exercise metadata to reduce hallucinations.",
      tech: ["Python", "Firebase Functions", "Firestore", "OpenAI API"],
      github: "https://github.com/gayyaalpha",
    },
    {
      title: "Swimming Pose Analysis + GPT Feedback",
      description:
        "Computer vision pipeline using MediaPipe pose landmarks to compute swim technique metrics, then generates tailored feedback using a custom GPT prompt pipeline.",
      tech: ["Python", "OpenCV", "MediaPipe", "NumPy", "OpenAI API"],
      github: "https://github.com/gayyaalpha",
    },
    {
      title: "Mask R-CNN Object Tracking (IoU)",
      description:
        "Tracked multiple COCO objects across frames using IoU-based association and per-class confidence thresholds for improved stability.",
      tech: ["Python", "OpenCV", "Mask R-CNN"],
      github: "https://github.com/gayyaalpha",
    },
    {
      title: "Real Tuk Racing (50k+ downloads)",
      description:
        "Cross-platform mobile racing game based on Sri Lankan tuk-tuks, with missions, vehicle upgrades, and an in-game points economy.",
      tech: ["Unity", "C#", "Blender"],
      demo: "https://play.google.com/store/search?q=real+tuk+racing&c=apps&hl=en",
    },
  ];

export default function ProjectSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <h2 className="text-2xl font-bold">Projects</h2>
      <p className="mt-2 text-slate-30 max-w-3xl">
        A selection of projects that highlight my work across LLM systems,
        computer vision, and full-stack engineering.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}