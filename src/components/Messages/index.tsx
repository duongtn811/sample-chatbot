import { Message } from "@/types/chat";
import Answer from "./Answer";
import Question from "./Question"

export interface ChatList {
  messages: Message[];
}

export function Messages({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="flex flex-col relative mx-auto max-w-4xl px-4 gap-3">
      {messages.map((message: Message, index: number) => (
        <div key={message.id}>
          {message.isAIMessage ? (
            <Answer content={message.content} />
          ) : (
            <Question content={message.content} />
          )}
        </div>
      ))}
    </div>
  );
}
