"use client";

import { FormEvent, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "أهلًا بك في مسعد AI! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "تعذر الحصول على رد. حاول مرة أخرى."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "حدث خطأ في الاتصال. حاول مرة أخرى.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="glass"
      style={{
        borderRadius: 20,
        padding: 16,
        marginBlock: 24,
      }}
    >
      <h2 style={{ fontSize: 22, marginTop: 4 }}>
        تحدث مع مسعد AI
      </h2>

      <div
        aria-live="polite"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingBlock: 16,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              alignSelf:
                message.role === "user" ? "flex-start" : "flex-end",
              maxWidth: "90%",
              padding: 14,
              borderRadius: 16,
              background:
                message.role === "user"
                  ? "rgba(139,124,255,0.2)"
                  : "var(--surface-light)",
              lineHeight: 1.9,
              overflowWrap: "anywhere",
              whiteSpace: "pre-wrap",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "var(--muted)",
                marginBottom: 4,
              }}
            >
              {message.role === "user" ? "أنت" : "مسعد AI"}
            </div>

            {message.content}
          </div>
        ))}

        {loading && (
          <div
            role="status"
            style={{
              alignSelf: "flex-end",
              padding: 12,
              color: "var(--muted)",
            }}
          >
            مسعد AI يكتب الرد...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="اكتب رسالتك هنا..."
          aria-label="رسالتك"
          disabled={loading}
          style={{
            minWidth: 0,
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "var(--background)",
            color: "var(--text)",
          }}
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          style={{
            padding: "12px 18px",
            border: 0,
            borderRadius: 12,
            background: "var(--primary)",
            color: "#fff",
            fontWeight: 700,
            opacity: !input.trim() || loading ? 0.6 : 1,
          }}
        >
          {loading ? "انتظر..." : "إرسال"}
        </button>
      </form>

      <p
        style={{
          color: "var(--muted)",
          fontSize: 12,
          lineHeight: 1.8,
        }}
      >
        مسعد AI — مساعدك الذكي باللغة العربية.
      </p>
    </section>
  );
}
