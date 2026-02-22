
import ChatWidget from "./components/ChatWidget";
import { ContactSection } from "./components/ContactSection";
import {CredentialsSection} from "./components/CredentialsSection";
import { Footer } from "./components/footer";
import { Header } from "./components/Header";
import ProjectSection from "./components/ProjectSection";
import { SkillsSection } from "./components/SkillSection";


export default function HomePage() {
  return (
    <>  
    <Header/>
    <ChatWidget/>
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl flex-col items-center justify-center px-4">
            <div className="mx-auto w-full text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
                AI Engineer · Computer Vision · LLM Integration · Full-Stack
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-6xl whitespace-nowrap">
                Gayashan{" "}
                <span className="bg-gradient-to-r from-sky-500 to-amber-500 bg-clip-text text-transparent">
                  Dewanarayana
                </span>
              </h1>

              <p className="mt-5 text-base text-slate-700 sm:text-lg">
                I build intelligent systems powered by Artificial Intelligence from real time computer vision pipelines to 
                LLM-driven workflows. With hands-on experience using OpenAI&apos;s GPT API, MediaPipe, and full-stack frameworks, 
                I develop tools that are not just technically sound, but production-ready and user-focused.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  View Projects ↓
                </a>
                <a
                  href="#chat"
                  data-open-chat
                  className="inline-flex items-center rounded-full border border-amber-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white"
                >
                  Try the AI assistant →
                </a>
                <a
                  href="https://github.com/gayyaalpha"
                  target="_blank"
                  className="inline-flex items-center rounded-full border border-sky-300 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50"
                >
                  View my GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/gayashan-dewanarayana"
                  target="_blank"
                  className="inline-flex items-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-400"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            <div className="mt-10 w-full">
              <CredentialsSection/>
            </div>
          </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <ProjectSection />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <ContactSection/>
        </div>
      </section>

      <Footer/>
    </main>
    </>
  );
}
