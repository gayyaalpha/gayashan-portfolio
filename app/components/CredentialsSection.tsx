type CredentialLink = {
    label: string;
    href: string;
  };
  
  const links: CredentialLink[] = [
    { label: " 📌 Resume", href: "/assets/Gayashan_Resume.pdf" },
    { label: "🎓 Degree Certificate", href: "/assets/Gayashan_Degree.pdf" },
    { label: "📄 Academic Transcript", href: "/assets/Gayashan_Transcript.pdf" },
  ];
  
  const buttonClass =
    "inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white";
  
  export function CredentialsSection() {
    return (
      <section id="credentials" className="border-t scroll-mt-20 mt-10 border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Credentials</h2>
          </div>
  
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
  