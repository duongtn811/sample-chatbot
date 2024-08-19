import { readMessageFromStreamData } from "@/utils/stream";
import { useCallback, useRef } from "react";

const handleErrorWithAbort = (error: unknown) => {
  if ((error as Error).name === "AbortError") {
    return;
  }
  console.error("ERROR: CREATING/STREAMING MESSAGES", error);
  throw error;
};

type Message<T> = T;

export const useStreamingMessage = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleStreamMessage = useCallback(
    async <T>(
      url: string,
      onReadStream: (message: Message<T>) => void,
      options: RequestInit
    ) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      options.signal = abortControllerRef.current.signal;

      try {
        const response = await fetch(url, options);
        if (response) {
          await readMessageFromStreamData(response, onReadStream);
        }
      } catch (error) {
        handleErrorWithAbort(error);
      }
    },
    []
  );

  const clearAbortController = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return { handleStreamMessage, clearAbortController, abortControllerRef };
};
