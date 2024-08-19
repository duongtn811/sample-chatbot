"use client";

import * as React from "react";
import Textarea from "react-textarea-autosize";
import { Button } from "@/ui/Button";
import { IconArrowElbow } from "@/ui/Icons";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { useRouter } from "next/navigation";
import { ChatContext } from "../Chat/Chat.context";
import { useContext } from "react";

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const router = useRouter();
  const { handleSubmit } = useContext(ChatContext)
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur();
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        handleSubmit(value)
        // Optimistically add user message UI
        // setMessages(currentMessages => [
        //   ...currentMessages,
        //   {
        //     id: nanoid(),
        //     display: <UserMessage>{value}</UserMessage>
        //   }
        // ])

        // Submit and get response message
        // const responseMessage = await submitUserMessage(value)
        // setMessages(currentMessages => [...currentMessages, responseMessage])
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background sm:rounded-md sm:border">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Button type="submit" size="icon" disabled={input === ""}>
            <IconArrowElbow />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
