
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="container"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        paddingBlock: 32,
      }}
    >
      <section className="glass" style={{ padding: 32, borderRadius: 24 }}>
        <div
          className="gradient-text"
          style={{ fontSize: 72, fontWeight: 800 }}
        >
          404
        </div>

        <h1 style={{ fontSize: 28 }}>الصفحة غير موجودة</h1>

        <p style={{ color: "var(--muted)", lineHeight: 2 }}>
          يبدو أن الرابط الذي تبحث عنه غير متاح.
          يمكنك العودة إلى الصفحة الرئيسية لمسعد AI.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 16,
            padding: "13px 24px",
            borderRadius: 12,
            background: "var(--primary)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          العودة للرئيسية
        </Link>
      </section>
    </main>
  );
}
