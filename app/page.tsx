
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
    <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4 space-y-14">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center text-center">

          <h1 className="mt-4 text-4xl sm:text-6xl font-bold leading-tight">
            <span className="text-sky-400">Gayashan Dewanarayana</span>
          </h1>
          <p className="text-base uppercase tracking-[0.25em] text-sky-400 font-bold">
            AI Engineer · Computer Vision · LLM Integration · Full-Stack Development 
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-900">
            I build intelligent systems powered by Artificial Intelligence from real time computer vision pipelines to 
            LLM-driven workflows. With hands-on experience using OpenAI's GPT API, MediaPipe, and full-stack frameworks, 
            I develop tools that are not just technically sound, but production-ready and user-focused.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
               href="#projects"
               className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                View Projects ↓
            </a>
            <a
              href="https://github.com/gayyaalpha"
              target="_blank"
              className="inline-flex items-center rounded-full border border-sky-500 px-4 py-2 text-sm font-medium text-slate-950 text-sky-100 hover:bg-sky-500/10"
            >
              View my GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/gayashan-dewanarayana"
              target="_blank"
              className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
            >
              Connect on LinkedIn
            </a>
          </div>
          <CredentialsSection/>
        </section>
        <ProjectSection />
        <ContactSection/>
        <Footer/>
      </div>
    </main>
    </>
  );
}
