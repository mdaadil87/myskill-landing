
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hi! 👋 Welcome to MySkill. I'm your AI assistant. Ask me anything about our services, pricing, or projects. How can I help you today?"
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text }
    ];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        { role: "model", content: data.reply }
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Connection issue. Please try again.";

      setMessages((current) => [
        ...current,
        {
          role: "model",
          content: `Sorry, ${message} You can also contact us through the contact form below.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {isOpen && (
        <section className="flex h-[min(640px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101714] shadow-2xl shadow-black/50">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#17221c] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-[#101714]">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-white">MySkill AI</h2>
                <p className="text-xs text-lime-400">Online · AI Customer Care</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <div className="text-center text-xs text-zinc-500">
              Welcome to MySkill · Ask us anything
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-lime-400 text-[#101714]"
                      : "rounded-bl-sm border border-white/10 bg-[#1c2922] text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Bot size={16} className="text-lime-400" />
                MySkill AI is typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-white/10 bg-[#17221c] p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              maxLength={1200}
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-[#101714] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-lime-400/60 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-[#101714] transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close customer care chat" : "Open customer care chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-[#101714] shadow-lg shadow-lime-400/20 transition hover:scale-105 hover:bg-lime-300"
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
