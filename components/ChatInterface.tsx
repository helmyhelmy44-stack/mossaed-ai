
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
        "أهلًا بك في مسعد AI! اكتب سؤالك أو فكرتك، وسنبدأ رحلتك نحو الإنجاز.",
    },
  ]);

  const [input, setInput] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        role: "user",
        content: text,
      },
      {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "وصلت رسالتك بنجاح! هذه نسخة تجريبية من المحادثة. سنربط مسعد AI بنموذج ذكاء اصطناعي حقيقي في الخطوة التالية.",
      },
    ]);

    setInput("");
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
          disabled={!input.trim()}
          style={{
            padding: "12px 18px",
            border: 0,
            borderRadius: 12,
            background: "var(--primary)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          إرسال
        </button>
      </form>

      <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.8 }}>
        النسخة التجريبية: الردود الحالية ليست مولدة بواسطة نموذج ذكاء اصطناعي.
      </p>
    </section>
  );
}
