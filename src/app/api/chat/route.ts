import { iterableToIterator, iteratorToStream } from "@/utils/stream";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: NextRequest) {
  const abortController = new AbortController();

  try {
    const body = await request.json();
    const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: body.content }],
        stream: true,
        max_tokens: 1024
    });

    const stream = iteratorToStream(
      iterableToIterator(chatResponse, item => {
        const content = item?.choices?.[0]?.delta?.content
        return JSON.stringify({
            content: content,
            id: body.id
        }) + "\n"
      })
    );

    request.signal.onabort = () => {
      abortController.abort();
    };

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain"
      },
      status: 200
    });
  } catch (error) {
    console.error("ERROR: CREATING/STREAMING MESSAGES", error);
    return new Response("Error creating message", {
      status: 400
    });
  }
}
