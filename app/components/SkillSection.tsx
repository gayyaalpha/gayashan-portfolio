const chip =
  "rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-700";

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/70 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className={chip}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section className="text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
        Tech Stack
      </div>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
        Tools and technologies I work with across AI engineering, computer vision,
        and full-stack development.
      </p>

      <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
        <SkillGroup
          title="AI & Machine Learning"
          items={[
            "LLMs",
            "RAG",
            "NLP",
            "Deep Learning",
            "PyTorch",
            "TensorFlow",
            "Scikit-learn",
            "HuggingFace",
            "OpenCV",
            "MediaPipe",
          ]}
        />
        <SkillGroup
          title="Agentic & RAG Systems"
          items={[
            "LangGraph",
            "LangChain",
            "Multi-Agent Orchestration",
            "Pinecone",
            "Semantic Search",
            "Structured Outputs",
            "RAGAS",
            "DeepEval",
            "Langfuse",
            "n8n",
          ]}
        />
        <SkillGroup
          title="Cloud & Backend"
          items={[
            "Azure Functions",
            "Document Intelligence",
            "Firebase",
            "FastAPI",
            "Pydantic v2",
            "PostgreSQL",
            "MS SQL",
          ]}
        />
        <SkillGroup
          title="Full-Stack & Tools"
          items={[
            "Python",
            "TypeScript",
            "JavaScript",
            "Next.js",
            "React",
            "Node.js",
            ".NET",
            "Laravel",
            "Git",
            "Postman",
            "GitHub Actions",
          ]}
        />
      </div>
    </section>
  );
}
