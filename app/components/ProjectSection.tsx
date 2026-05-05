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
      title: "Method8 AI Analytics Assistant",
      description:
        "Two-agent orchestration system in n8n with an Orchestrator and SQL Agent enabling natural-language interaction with a PostgreSQL database. Engineered schema-aware SQL generation and used Anthropic's API to transform queried data into structured Excel reports and PowerPoint presentations.",
      tech: ["n8n", "PostgreSQL", "SQL", "Anthropic API (Claude)", "JavaScript"],
    },
    {
      title: "AI Portfolio Assistant — Production RAG System",
      description:
        "Multi-node LangGraph agent on Azure Functions routing user intent across specialised CV retrieval and market comparison agents. Semantic retrieval pipeline using OpenAI embeddings and Pinecone, with constrained prompting to enforce deterministic first-person responses. Deployed on Azure with Next.js frontend and GitHub Actions CI/CD.",
      tech: ["Python", "Node.js", "React (Next.js)", "LangGraph", "Pinecone", "Azure Functions"],
    },
    {
      title: "Real Tuk Racing (100k+ downloads)",
      description:
        "Cross-platform mobile racing game based on Sri Lankan tuk-tuks, with missions, vehicle upgrades, and an in-game points economy.",
      tech: ["Unity", "C#", "Blender"],
      demo: "https://games.needlesack.com/game-loader?gameName=wheelgame&orientation=landscape",
    },
    {
      title: "Document Intelligence API — Multi-Backend Extraction Service",
      description:
        "Document extraction service using Azure Document Intelligence SDK, exposing a REST API via FastAPI that returns structured JSON with field names, confidence scores, and bounding box coordinates. Designed a pluggable BaseExtractor abstraction (Strategy pattern) enabling multiple backends to be swapped without modifying the pipeline.",
      tech: ["Python", "FastAPI", "Azure Document Intelligence", "Pydantic v2", "Azure App Service", "GitHub Actions"],
    },
  ];

export default function ProjectSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
          Selected Work
        </div>
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
