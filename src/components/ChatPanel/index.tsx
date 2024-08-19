import * as React from "react";
import { useContext } from "react";
import { PromptForm } from "@/components/PromptForm";
import { ChatContext } from "../Chat/Chat.context";

export interface ChatPanelProps {}

export function ChatPanel({}: ChatPanelProps) {
  const { setMessages } = useContext(ChatContext);

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 w-full from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm />
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center gap-2 fixed bottom-5 right-5 hidden lg:block"
        onClick={clearMessages}
      >
        <div className="h-4"> Clear Chat</div>
      </div>
    </div>
  );
}
