import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import type {
  Conversation,
  Message,
} from "../types/chat";

export default function useChatHistory() {
  const createConversation = (): Conversation => ({
    id: uuid(),
    title: "New Chat",
    createdAt: new Date(),
    messages: [],
  });

  // ===========================
  // Load Conversations
  // ===========================
  const [conversations, setConversations] =
    useState<Conversation[]>(() => {
      const saved = localStorage.getItem(
        "researchgenie-conversations"
      );

      if (!saved) {
        return [createConversation()];
      }

      try {
        const parsed = JSON.parse(saved);

        return parsed.map(
          (conversation: Conversation) => ({
            ...conversation,
            createdAt: new Date(
              conversation.createdAt
            ),
          })
        );
      } catch {
        return [createConversation()];
      }
    });

  // ===========================
  // Load Current Chat
  // ===========================
  const [currentId, setCurrentId] =
    useState(() => {
      return (
        localStorage.getItem(
          "researchgenie-current-chat"
        ) ?? conversations[0].id
      );
    });

  // ===========================
  // Current Conversation
  // ===========================
  const currentConversation =
    conversations.find(
      (conversation) =>
        conversation.id === currentId
    ) ||
    conversations[0] ||
    createConversation();

  // ===========================
  // Create New Chat
  // ===========================
  const newChat = () => {
    const conversation = createConversation();

    setConversations((prev) => [
      conversation,
      ...prev,
    ]);

    setCurrentId(conversation.id);
  };

  // ===========================
  // Delete Conversation
  // ===========================
  const deleteConversation = (
    conversationId: string
  ) => {
    const confirmed = window.confirm(
      "Delete this conversation?"
    );

    if (!confirmed) return;

    setConversations((prev) => {
      const updated = prev.filter(
        (conversation) =>
          conversation.id !== conversationId
      );

      if (updated.length === 0) {
        const fresh = createConversation();

        setCurrentId(fresh.id);

        return [fresh];
      }

      if (conversationId === currentId) {
        setCurrentId(updated[0].id);
      }

      return updated;
    });
  };

  // ===========================
  // Rename Conversation
  // ===========================
  const renameConversation = (
    conversationId: string
  ) => {
    const conversation =
      conversations.find(
        (c) => c.id === conversationId
      );

    if (!conversation) return;

    const title = window.prompt(
      "Rename conversation",
      conversation.title
    );

    if (!title?.trim()) return;

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              title: title.trim(),
            }
          : conversation
      )
    );
  };

  // ===========================
  // Add Message
  // ===========================
  const addMessage = (message: Message) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (
          conversation.id !== currentId
        ) {
          return conversation;
        }

        let title = conversation.title;

        if (
          title === "New Chat" &&
          message.role === "user"
        ) {
          title =
            message.content.slice(0, 35) +
            (message.content.length > 35
              ? "..."
              : "");
        }

        return {
          ...conversation,
          title,
          messages: [
            ...conversation.messages,
            message,
          ],
        };
      })
    );
  };

  // ===========================
  // Start Streaming Message
  // ===========================
  const startAssistantMessage = (
    sources: Message["sources"] = []
  ) => {
    addMessage({
      role: "assistant",
      content: "",
      sources,
    });
  };

  // ===========================
  // Update Streaming Message
  // ===========================
  const updateLastAssistantMessage = (
    content: string
  ) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (
          conversation.id !== currentId
        ) {
          return conversation;
        }

        const messages = [
          ...conversation.messages,
        ];

        const last =
          messages[messages.length - 1];

        if (last?.role === "assistant") {
          messages[messages.length - 1] = {
            ...last,
            content,
          };
        }

        return {
          ...conversation,
          messages,
        };
      })
    );
  };

  // ===========================
  // Save Conversations
  // ===========================
  useEffect(() => {
    localStorage.setItem(
      "researchgenie-conversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  // ===========================
  // Save Current Chat
  // ===========================
  useEffect(() => {
    localStorage.setItem(
      "researchgenie-current-chat",
      currentId
    );
  }, [currentId]);

  return {
    conversations,
    currentConversation,

    currentId,
    setCurrentId,

    addMessage,

    startAssistantMessage,
    updateLastAssistantMessage,

    newChat,
    deleteConversation,
    renameConversation,
  };
}