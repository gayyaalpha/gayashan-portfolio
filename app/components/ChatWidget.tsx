"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest?.("[data-open-chat]");
      if (trigger) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0 && input.trim() === "") {
      setInput("What is your best project?");
    }
  }, [open, messages.length, input]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    
    const newMessages: Message[] = [
        ...messages,
        { role: "user", content: userMessage }
      ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_AZURE_FUNCTION_URL;
      if (!apiBase) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              "The chat service is not configured yet. Please set NEXT_PUBLIC_AZURE_FUNCTION_URL.",
          },
        ]);
        setLoading(false);
        return;
      }

      const res = await fetch(apiBase + "/api/chat_trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.answer },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }

    setLoading(false);
  }
  return (
    <>
      {/* Floating Trigger Button */}
      {!open && (
        <div className="fixed bottom-8 right-24 z-50 hidden items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 shadow-sm backdrop-blur sm:flex">
          Ask the AI
        </div>
      )}
      <Button
        size="icon"
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-sky-500 via-sky-400 to-amber-400 text-white shadow-xl ring-4 ring-sky-200/60 transition hover:-translate-y-0.5 hover:shadow-2xl animate-[bounce_2.2s_ease-in-out_infinite] isolate before:content-[''] before:absolute before:inset-[-6px] before:-z-10 before:rounded-full before:bg-sky-400/50 before:blur-2xl"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </Button>
  
      {open && (
        <Card className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[400px] flex-col overflow-hidden rounded-3xl border border-amber-200/70 bg-white/90 shadow-2xl backdrop-blur">
          
          <CardHeader className="border-b border-amber-200/70 bg-gradient-to-r from-sky-50 via-white to-amber-50 font-semibold text-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  AI
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    AI Assistant
                  </div>
                  <div className="text-xs text-slate-500">
                    Ask about my projects and experience
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
  
          <CardContent className="flex-1 p-0 flex flex-col min-h-0">
            
            {/* Scrollable Message Area */}
            <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
              <div className="space-y-4 p-4">
                
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[78%] break-words rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "ml-auto bg-gradient-to-br from-sky-500 to-sky-400 text-white"
                        : "bg-white text-slate-700 border border-slate-200/70"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
  
                {loading && (
                  <div className="text-xs text-slate-500">
                    Thinking...
                  </div>
                )}
  
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
  
            {/* Input Area */}
            <div className="flex gap-2 border-t border-amber-200/70 bg-white/80 p-4">
              <Input
                placeholder="Ask about my projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                className="rounded-full bg-sky-500 px-5 text-white shadow-sm hover:bg-sky-400"
              >
                Send
              </Button>
            </div>
  
          </CardContent>
        </Card>
      )}
    </>
  );
  
}
