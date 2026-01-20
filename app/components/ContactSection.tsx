import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Heading */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 text-slate-600">
            If you’d like to discuss opportunities, projects, or collaborations,
            feel free to reach out.
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 max-w-2xl space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell me a bit about what you’d like to discuss..."
              rows={5}
            />
          </div>

          <Button type="submit" className="rounded-full">
            Send message
          </Button>
        </form>
      </div>
    </section>
  );
}
