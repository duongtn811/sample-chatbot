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
  const [streamingNode, setStreamingNode] = useState<Message | null>(null);
  const { handleStreamMessage } = useStreamingMessage();

  const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  useEffect(() => {
    if (isStreaming && streamingNode) {
      if (messages.find((m) => m.id === streamingNode.id)) {
        const cloneMessages = [...messages];
        cloneMessages.pop();
        setMessages([
          ...cloneMessages,
          { ...streamingNode, content: streamingNode.content },
        ]);
      } else {
        const cloneMessages = [...messages];
        setMessages([...cloneMessages, streamingNode]);
      }
    }
  }, [isStreaming, streamingNode, messages.length]);

  const onReadStream = (message: Message) => {
    if (message.content) {
      setStreamingNode((prev) => ({
        ...prev!,
        content: prev!.content.concat(message.content),
      }));
    }
  };

  const handleSubmit = async (message: string) => {
    const newMessages = [
      ...messages,
      { id: v4(), content: message, isAIMessage: false },
    ];
    setMessages(newMessages);
    setIsStreaming(true);
    const streamingNode = { id: v4(), content: "", isAIMessage: true }
    setStreamingNode(streamingNode);
    await handleStreamMessage("/api/chat", onReadStream, {
      method: "POST",
      body: JSON.stringify({ id: streamingNode.id, content: message }),
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
