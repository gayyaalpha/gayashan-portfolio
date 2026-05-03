"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, MessageSquarePlus } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for open event from Header button or data-open-chat links
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("chat:open", handleOpen);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-toggle-chat]")) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (target?.closest?.("[data-open-chat]")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("chat:open", handleOpen);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const main = asideRef.current?.closest("main");
    if (!main) return;
    main.classList.toggle("chat-open", open);
    return () => main.classList.remove("chat-open");
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
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
    <aside
      ref={asideRef}
      style={{
        top: "var(--header-h)",
        height: "calc(100dvh - var(--header-h))",
      }}
      className={`fixed right-0 z-40 flex w-full flex-col border-l-2 border-slate-900 bg-white shadow-[-12px_0_32px_-16px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-in-out sm:w-[420px] ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => {
            setMessages([]);
            setInput("");
          }}
          aria-label="New conversation"
          title="New conversation"
          className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New
        </button>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <ScrollArea className="flex-1 overflow-y-auto px-5 py-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-4xl">
              🥷
            </span>
            <p className="text-base font-semibold text-slate-800">
              How can I help?
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {[
                "What's your best project?",
                "What technologies do you use?",
                "Tell me about your experience",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-full border border-sky-200 bg-white px-3 py-1.5 text-xs font-medium text-sky-700 transition hover:bg-sky-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <span className="mr-2 mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm">
                  🥷
                </span>
              )}
              <div
                className={`max-w-[78%] break-words rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-gradient-to-br from-sky-500 to-sky-400 text-white"
                    : "rounded-tl-sm border border-slate-200/70 bg-white text-slate-700"
                }`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="m-0 [&+p]:mt-2">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-slate-900">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => <em className="italic">{children}</em>,
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-1 list-disc space-y-1 pl-5">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="my-1 list-decimal space-y-1 pl-5">
                          {children}
                        </ol>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-slate-100 px-1 py-0.5 text-[0.8rem] text-slate-800">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm">
                🥷
              </span>
              <span className="flex gap-1 rounded-2xl rounded-tl-sm border border-slate-200/70 bg-white px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
              </span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <footer className="bg-white px-5 py-4">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            placeholder="Ask me anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm transition hover:bg-sky-400 disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </footer>
    </aside>
  );
}
