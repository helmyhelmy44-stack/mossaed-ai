
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "إعداد مفتاح الذكاء الاصطناعي غير مكتمل." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "أرسل رسالة صحيحة أولًا." },
        { status: 400 }
      );
    }

    const recentMessages = messages.slice(-20);

    const contents = recentMessages.map((message) => {
      if (
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string"
      ) {
        throw new Error("INVALID_MESSAGES");
      }

      return {
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content.slice(0, 5000) }],
      };
    });

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text:
                  "أنت مسعد AI، مساعد ذكي ودود ومحترف. " +
                  "أجب باللغة العربية الواضحة، وافهم اللهجة المصرية. " +
                  "قدّم إجابات مفيدة ومنظمة، ولا تدّعِ تنفيذ أعمال لم تنفذها.",
              },
            ],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            response.status === 429
              ? "وصلنا إلى حد الاستخدام مؤقتًا. حاول لاحقًا."
              : "تعذر الاتصال بخدمة الذكاء الاصطناعي. راجع إعدادات المفتاح.",
        },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      return NextResponse.json(
        { error: "لم يصل رد نصي من النموذج. حاول مرة أخرى." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_MESSAGES") {
      return NextResponse.json(
        { error: "صيغة الرسائل غير صحيحة." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "حدث خطأ داخلي. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}
