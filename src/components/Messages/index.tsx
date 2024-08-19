import { Message } from "@/types/chat";
import { Separator } from "@/ui/Separator";
import Answer from "./Answer";

export interface ChatList {
  messages: Message[];
}

export function Messages({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message: Message, index: number) => (
        <div key={message.id}>
          <Answer content={message.content} />
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
