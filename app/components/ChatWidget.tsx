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
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    const newMessages = [...messages, { role: "user", content: userMessage }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        process.env.AZURE_FUNCTION_URL + "/api/chat_trigger",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        }
      );

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
      {/* Floating Trigger */}
      <Button
        size="icon"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 rounded-full shadow-xl bg-sky-500 hover:bg-sky-400"
      >
        {open ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
      </Button>

      {open && (
        <Card className="fixed bottom-20 right-6 w-96 h-[500px] shadow-2xl border bg-background flex flex-col">
          <CardHeader className="border-b font-semibold">
            AI Assistant
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-sky-500 text-white"
                      : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

              {loading && (
                <div className="text-muted-foreground text-sm">
                  Thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </ScrollArea>

            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Ask about my projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}