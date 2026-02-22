"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_AZURE_FUNCTION_URL! + "/api/contact_submit",
        // "http://localhost:7071" + "/api/contact_submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
            Let&apos;s Talk
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Contact
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            If you’d like to discuss opportunities, projects, or collaborations,
            feel free to reach out.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
            Typical response time: within 24–48 hours.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/gayyaalpha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gayashan-dewanarayana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:dewanarayana48@gmail.com"
              aria-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              <Mail className="h-5 w-5" />
            </a>
            <span className="text-sm text-slate-500">
              Prefer email? I usually reply within 24–48 hours.
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-2xl space-y-6 rounded-3xl border border-amber-200/70 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell me a bit about what you’d like to discuss..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="rounded-full"
          >
            {loading ? "Sending..." : "Send message"}
          </Button>

          {status === "success" && (
            <p className="text-green-600 text-sm">
              Message sent successfully!
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
