
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مسعد AI | مساعدك الذكي",
  description:
    "مسعد AI، مساعدك الذكي باللغة العربية للكتابة والبرمجة والإبداع الرقمي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
