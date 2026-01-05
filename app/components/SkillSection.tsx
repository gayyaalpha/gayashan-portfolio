const chip =
  "rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs text-slate-200";

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
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
    <section>
      <h2 className="text-2xl font-bold">Skills</h2>
      <p className="mt-2 text-slate-300 max-w-3xl">
        Tools and technologies I’ve used across AI engineering, computer vision,
        and full-stack development.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SkillGroup
          title="AI / Data"
          items={["Python", "PyTorch", "TensorFlow", "NumPy", "Pandas", "Matplotlib"]}
        />
        <SkillGroup
          title="Computer Vision"
          items={["OpenCV", "MediaPipe", "Mask R-CNN", "Object Tracking (IoU)"]}
        />
        <SkillGroup
          title="Cloud / Backend"
          items={["Firebase", "Cloud Functions", "Firestore", "REST APIs", "Postman"]}
        />
        <SkillGroup
          title="Full-Stack"
          items={["React", "TypeScript", ".NET", "SQL", "Laravel"]}
        />
      </div>
    </section>
  );
}
