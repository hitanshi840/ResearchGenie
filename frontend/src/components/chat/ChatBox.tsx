import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import WelcomeScreen from "./WelcomeScreen";
import ChatActions from "./ChatActions";

type Source = {
  document: string;
  page: number;
  score: number;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
  onRegenerate?: () => void;
}

export default function ChatBox({
  messages,
  loading,
  onRegenerate,
}: ChatBoxProps) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  // ==========================================
  // Auto Scroll
  // ==========================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  // ==========================================
  // Welcome Screen
  // ==========================================

  if (
    messages.length === 0 &&
    !loading
  ) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="mx-auto flex h-full w-full max-w-6xl items-start justify-center px-10 pb-8 pt-10">
          <WelcomeScreen />
        </div>
      </div>
    );
  }

  // ==========================================
  // Chat
  // ==========================================

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-10 pb-8 pt-8">
        {/* Export */}

        {messages.length > 0 && (
          <div className="sticky top-0 z-10 flex justify-end bg-slate-950/90 py-2 backdrop-blur">
            <ChatActions
              messages={messages}
            />
          </div>
        )}

        {/* Messages */}

        {messages.map(
          (message, index) => {
            const isLastAssistant =
              message.role ===
                "assistant" &&
              index ===
                messages.length - 1;

            return (
              <ChatMessage
                key={`${message.role}-${index}`}
                role={message.role}
                content={
                  message.content
                }
                sources={
                  message.sources
                }
                onRegenerate={
                  isLastAssistant
                    ? onRegenerate
                    : undefined
                }
              />
            );
          }
        )}

        {/* Typing */}

        {loading && (
          <TypingIndicator />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}