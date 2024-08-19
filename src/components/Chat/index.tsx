"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/css";
import { Messages } from "@/components/Messages";
import { ChatPanel } from "@/components/ChatPanel";
import { EmptyScreen } from "@/components/EmptyScreen";
import { useScrollAnchor } from "@/hooks/useScrollAnchor";
import { ChatContext } from "./Chat.context";
import { useStreamingMessage } from "@/hooks/useStreamingMessage";
import { v4 } from "uuid";
import { Message } from "@/types/chat";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ className }: ChatProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamingText, setStreamingText] = useState<string>("");
  const { handleStreamMessage } = useStreamingMessage();

  const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  useEffect(() => {
    if (isStreaming) {
      if (messages.find((m) => m.id === "2")) {
        const cloneMessages = [...messages];
        cloneMessages.pop();
        setMessages([...cloneMessages, { id: "2", content: streamingText }]);
      } else {
        const cloneMessages = [...messages];
        setMessages([...cloneMessages, { id: "2", content: streamingText }]);
      }
    }
  }, [isStreaming, streamingText, messages]);

  const onReadStream = (message: Message) => {
    if (message.content) {
      setStreamingText((prev) => prev.concat(message.content));
    }
  };

  const handleSubmit = async (message: string) => {
    const newMessages = [...messages, { id: "1", content: message }];
    setMessages(newMessages);
    setIsStreaming(true);
    await handleStreamMessage("/api/chat", onReadStream, {
      method: "POST",
      body: JSON.stringify({ id: 2, content: message }),
    });
    setIsStreaming(false);
  };

  return (
    <ChatContext.Provider value={{ input, setInput, handleSubmit }}>
      <div
        className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
        ref={scrollRef}
      >
        <div
          className={cn("pb-[200px] pt-4 md:pt-10", className)}
          ref={messagesRef}
        >
          {messages.length ? <Messages messages={messages} /> : <EmptyScreen />}
          <div className="w-full h-px" ref={visibilityRef} />
        </div>
        <ChatPanel input={input} setInput={setInput} />
      </div>
    </ChatContext.Provider>
  );
}
