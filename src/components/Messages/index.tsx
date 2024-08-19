import { Separator } from "@/ui/Separator";

export interface ChatList {
  messages: any;
}

export function Messages({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message: any, index: number) => (
        <div key={message}>
          {message}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
