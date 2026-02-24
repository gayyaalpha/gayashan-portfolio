type CredentialLink = {
    label: string;
    href: string;
  };
  
  const links: CredentialLink[] = [
    { label: "Resume", href: "/assets/Gayashan_Resume.pdf" },
    { label: "Degree Certificate", href: "/assets/Gayashan_Degree.pdf" },
    { label: "Academic Transcript", href: "/assets/Gayashan_Transcript.pdf" },
  ];
  
  const buttonClass =
    "group relative inline-flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white/80 px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white";
  
export function CredentialsSection() {
  return (
    <div id="credentials" className="scroll-mt-20">
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
          Verified Documents
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
          Download official documents for quick reference.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            <span>{item.label}</span>
            <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-600 transition group-hover:bg-sky-500/15">
              PDF
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
  
