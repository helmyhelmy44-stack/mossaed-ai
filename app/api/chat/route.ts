
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "مفتاح الذكاء الاصطناعي غير مُعدّ على الخادم." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "أرسل رسالة أولًا لبدء المحادثة." },
        { status: 400 }
      );
    }

    const contents = messages
      .filter(
        (message) =>
          (message.role === "user" ||
            message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0
      )
      .map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

    if (contents.length === 0) {
      return NextResponse.json(
        { error: "لم يتم العثور على رسالة صالحة." },
        { status: 400 }
      );
    }

    const response = await fetch(
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
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
                text: "أنت مسعد AI، مساعد ذكي يتحدث العربية بوضوح واحترافية. ساعد المستخدم في الكتابة والبرمجة والتعلم والإبداع، وقدّم إجابات مفيدة ومنظمة.",
              },
            ],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data.error?.message);

      return NextResponse.json(
        {
          error:
            "تعذّر الحصول على رد من الذكاء الاصطناعي. تحقّق من إعدادات مفتاح API وحاول مرة أخرى.",
        },
        { status: 502 }
      );
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
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
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الرسالة. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}
