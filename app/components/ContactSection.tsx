"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
        process.env.NEXT_PUBLIC_AZURE_FUNCTION_URL! + "api/contact_submit",
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
      className="scroll-mt-24 border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 text-slate-600">
            If you’d like to discuss opportunities, projects, or collaborations,
            feel free to reach out.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-2xl space-y-6"
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
