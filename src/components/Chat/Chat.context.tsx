"use client"

import { Message } from "@/types/chat";
import { Dispatch, SetStateAction, createContext } from "react";

type ChatContextType = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  handleSubmit: (message: string) => void;
};

const defaultValue = {
  input: "",
  setInput: () => {},
  handleSubmit: (message: string) => {},
  setMessages: () => {}
};

export const ChatContext = createContext<ChatContextType>(defaultValue);
