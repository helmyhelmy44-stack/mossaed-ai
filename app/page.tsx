import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";

const features = [
  {
    icon: "✍️",
    title: "الكتابة الذكية",
    description: "أنشئ النصوص والمقالات وطوّر أفكارك.",
  },
  {
    icon: "💻",
    title: "مساعد البرمجة",
    description: "تعلّم البرمجة واكتب الأكواد وطوّر مشاريعك.",
  },
  {
    icon: "🎨",
    title: "الإبداع الرقمي",
    description: "حوّل أفكارك إلى محتوى إبداعي.",
  },
];

export default function HomePage() {
  return (
    <main className="container" style={{ paddingBlock: 24 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          paddingBlock: 12,
        }}
      >
        <Link href="/" className="gradient-text">
          <strong style={{ fontSize: 25 }}>مسعد AI</strong>
        </Link>

        <span style={{ color: "var(--muted)", fontSize: 14 }}>
          مساعدك الذكي باللغة العربية
        </span>
      </header>

      <section
        className="glass"
        style={{
          borderRadius: 26,
          padding: "clamp(24px, 6vw, 56px) 20px",
          textAlign: "center",
          marginTop: 24,
        }}
      >
        <p style={{ color: "#c4baff" }}>
          الإبداع يبدأ بفكرة
        </p>

        <h1
          style={{
            fontSize: "clamp(32px, 7vw, 54px)",
            lineHeight: 1.5,
            margin: "12px auto",
          }}
        >
          حوّل أفكارك إلى{" "}
          <span className="gradient-text">إنجازات</span>
        </h1>

        <p
          style={{
            color: "var(--muted)",
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 2,
          }}
        >
          مساحتك العربية للكتابة والبرمجة والإبداع،
          مع مساعد ذكي يساعدك على تحويل أفكارك إلى إنجازات.
        </p>
      </section>

      <ChatInterface />

      <section style={{ paddingBlock: 24 }}>
        <h2 style={{ fontSize: 25 }}>
          اكتشف إمكانيات مسعد AI
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass"
              style={{ padding: 22, borderRadius: 18 }}
            >
              <div style={{ fontSize: 30 }}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.9,
                }}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          paddingBlock: 24,
          textAlign: "center",
          color: "var(--muted)",
          lineHeight: 2,
        }}
      >
        مسعد AI © {new Date().getFullYear()}
        <br />
        ذكاء يساعدك على الإبداع والإنجاز.
      </footer>
    </main>
  );
}