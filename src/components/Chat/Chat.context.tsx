import { Dispatch, SetStateAction, createContext } from "react";

type ChatContextType = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (message: string) => void;
};

const defaultValue = {
  input: "",
  setInput: () => {},
  handleSubmit: (message: string) => {},
};

export const ChatContext = createContext<ChatContextType>(defaultValue);
