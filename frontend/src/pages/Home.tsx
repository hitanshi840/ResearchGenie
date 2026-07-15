import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import ChatBox from "../components/chat/ChatBox";
import ChatInput from "../components/chat/ChatInput";
import DashboardTop from "../components/dashboard/DashboardTop";

import api from "../api/api";

import type useChatHistory from "../hooks/useChatHistory";

type Props = {
  chat: ReturnType<typeof useChatHistory>;
};

type Source = {
  document: string;
  page: number;
  score: number;
};

export default function Home({ chat }: Props) {
  const [loading, setLoading] = useState(false);

  const [uploadCollapsed, setUploadCollapsed] =
    useState(false);

  const stopGeneration = useRef(false);

  const inputRef =
    useRef<HTMLTextAreaElement>(null);

  const {
    currentConversation,
    addMessage,
    startAssistantMessage,
    updateLastAssistantMessage,
  } = chat;

  // ==========================================
  // Streaming Effect
  // ==========================================

  const streamAssistantMessage = async (
    answer: string,
    sources: Source[]
  ) => {
    stopGeneration.current = false;

    startAssistantMessage(sources);

    let current = "";

    for (const character of answer) {
      if (stopGeneration.current) break;

      current += character;

      updateLastAssistantMessage(current);

      await new Promise((resolve) =>
        setTimeout(resolve, 8)
      );
    }
  };

  // ==========================================
  // Ask Backend
  // ==========================================

  const askBackend = async (
    question: string
  ) => {
    setLoading(true);

    try {
      const { data } = await api.post(
        "/chat/",
        {
          question,
        }
      );

      console.log(
        "Backend Response:",
        data
      );

      await streamAssistantMessage(
        data.answer,
        data.sources ?? []
      );
    } catch (error) {
      console.error(error);

      let message =
        "Failed to contact the server.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          message =
            error.response.data?.detail ??
            "Server Error";
        } else if (error.request) {
          message =
            "Backend is not responding.";
        } else {
          message = error.message;
        }
      }

      toast.error(message);

      addMessage({
        role: "assistant",
        content: `❌ ${message}`,
      });
    } finally {
      setLoading(false);

      inputRef.current?.focus();
    }
  };

  // ==========================================
  // Send Message
  // ==========================================

  const handleSend = async (
    text: string
  ) => {
    if (loading) return;

    if (!text.trim()) return;

    addMessage({
      role: "user",
      content: text.trim(),
    });

    await askBackend(text.trim());
  };

  // ==========================================
  // Stop Generation
  // ==========================================

  const handleStop = () => {
    stopGeneration.current = true;

    setLoading(false);

    toast("Generation stopped.");
  };

  // ==========================================
  // Upload Success
  // ==========================================

  const handleUploadSuccess = () => {
    toast.success(
      "Document ready for questions!"
    );

    setUploadCollapsed(true);

    inputRef.current?.focus();
  };

  // ==========================================
  // Regenerate
  // ==========================================

  const handleRegenerate = async () => {
    if (loading) return;

    const lastUser = [
      ...currentConversation.messages,
    ]
      .reverse()
      .find(
        (message) =>
          message.role === "user"
      );

    if (!lastUser) return;

    await askBackend(lastUser.content);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-800 bg-slate-950 px-4 py-3">
        <DashboardTop
          onUploadSuccess={
            handleUploadSuccess
          }
          collapsed={uploadCollapsed}
          setCollapsed={setUploadCollapsed}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ChatBox
          messages={
            currentConversation.messages
          }
          loading={loading}
          onRegenerate={
            handleRegenerate
          }
        />
      </div>

      <div className="border-t border-slate-800 bg-slate-950">
        <ChatInput
          ref={inputRef}
          onSend={handleSend}
          onStop={handleStop}
          loading={loading}
        />
      </div>
    </div>
  );
}