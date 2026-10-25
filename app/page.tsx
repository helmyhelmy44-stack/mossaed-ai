
import Link from "next/link";

const features = [
  {
    icon: "✍️",
    title: "كتابة ذكية",
    description: "أنشئ النصوص والمقالات والأفكار بسهولة.",
  },
  {
    icon: "💻",
    title: "مساعد البرمجة",
    description: "اكتب الأكواد وافهم الأخطاء وطوّر مشاريعك.",
  },
  {
    icon: "🎨",
    title: "الإبداع الرقمي",
    description: "جهّز أفكارًا إبداعية لمشروعاتك وتصميماتك.",
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
          <strong style={{ fontSize: 24 }}>مسعد AI</strong>
        </Link>

        <span style={{ color: "var(--muted)", fontSize: 14 }}>
          مساعدك الذكي
        </span>
      </header>

      <section
        className="glass"
        style={{
          borderRadius: 28,
          padding: "clamp(24px, 6vw, 64px) 20px",
          textAlign: "center",
          marginTop: 28,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#c4baff",
            marginBottom: 18,
          }}
        >
          ✦ عالم جديد من الإمكانيات
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 7vw, 58px)",
            lineHeight: 1.4,
            margin: "0 auto 16px",
            maxWidth: 760,
          }}
        >
          أفكارك تستحق أن تصبح{" "}
          <span className="gradient-text">واقعًا</span>
        </h1>

        <p
          style={{
            color: "var(--muted)",
            lineHeight: 2,
            maxWidth: 600,
            margin: "0 auto 28px",
          }}
        >
          اكتشف تجربة عربية للإبداع والكتابة والبرمجة،
          واجعل مسعد AI رفيقك في رحلة الإنجاز والتعلّم.
        </p>

        <a
          href="#features"
          style={{
            display: "inline-block",
            background: "var(--primary)",
            color: "#fff",
            padding: "14px 26px",
            borderRadius: 14,
            fontWeight: 700,
          }}
        >
          اكتشف المميزات
        </a>
      </section>

      <section id="features" style={{ paddingBlock: 48 }}>
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>
          ماذا يمكنك أن تفعل؟
        </h2>

        <p style={{ color: "var(--muted)", lineHeight: 1.9 }}>
          أدوات تساعدك على تحويل أفكارك إلى خطوات عملية.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass"
              style={{
                padding: 24,
                borderRadius: 20,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>
                {feature.icon}
              </div>

              <h3 style={{ fontSize: 20, marginBottom: 10 }}>
                {feature.title}
              </h3>

              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.9,
                  margin: 0,
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
          fontSize: 13,
          lineHeight: 2,
        }}
      >
        مسعد AI © {new Date().getFullYear()}
        <br />
        ذكاء يساعدك على الإنجاز والإبداع.
      </footer>
    </main>
  );
}
