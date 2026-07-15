import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

import type {
  Conversation,
  Message,
} from "../types/chat";

const STORAGE_KEY =
  "researchgenie-conversations";

const CURRENT_CHAT_KEY =
  "researchgenie-current-chat";

export default function useChatHistory() {
  // ===========================
  // Create Conversation
  // ===========================

  const createConversation =
    (): Conversation => ({
      id:
        typeof crypto !== "undefined" &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : uuid(),

      title: "New Chat",

      createdAt: new Date(),

      updatedAt: new Date(),

      pinned: false,

      messages: [],
    });

  // ===========================
  // Load Conversations
  // ===========================

  const [conversations, setConversations] =
    useState<Conversation[]>(() => {
      try {
        const saved =
          localStorage.getItem(STORAGE_KEY);

        if (!saved)
          return [createConversation()];

        const parsed = JSON.parse(saved);

        if (
          !Array.isArray(parsed) ||
          parsed.length === 0
        ) {
          return [createConversation()];
        }

        return parsed.map(
          (conversation: Conversation) => ({
            ...conversation,

            createdAt: new Date(
              conversation.createdAt
            ),

            updatedAt: new Date(
              conversation.updatedAt ??
                conversation.createdAt
            ),

            pinned:
              conversation.pinned ??
              false,
          })
        );
      } catch {
        return [createConversation()];
      }
    });

  // ===========================
  // Current Conversation ID
  // ===========================

  const [currentId, setCurrentId] =
    useState(() => {
      return (
        localStorage.getItem(
          CURRENT_CHAT_KEY
        ) ?? ""
      );
    });

  // ===========================
  // Ensure Current Chat Exists
  // ===========================

  useEffect(() => {
    if (
      conversations.length > 0 &&
      !conversations.some(
        (conversation) =>
          conversation.id === currentId
      )
    ) {
      setCurrentId(conversations[0].id);
    }
  }, [conversations, currentId]);

  // ===========================
  // Sorted Conversations
  // ===========================

  const sortedConversations =
    useMemo(() => {
      return [...conversations].sort(
        (a, b) => {
          if (a.pinned !== b.pinned) {
            return a.pinned ? -1 : 1;
          }

          return (
            b.updatedAt.getTime() -
            a.updatedAt.getTime()
          );
        }
      );
    }, [conversations]);

  // ===========================
  // Current Conversation
  // ===========================

  const currentConversation =
    sortedConversations.find(
      (conversation) =>
        conversation.id === currentId
    ) ?? sortedConversations[0];

  // ===========================
  // New Chat
  // ===========================

  const newChat = () => {
    const conversation =
      createConversation();

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
    if (
      !window.confirm(
        "Delete this conversation?"
      )
    )
      return;

    setConversations((prev) => {
      const updated = prev.filter(
        (conversation) =>
          conversation.id !==
          conversationId
      );

      if (updated.length === 0) {
        const fresh =
          createConversation();

        setCurrentId(fresh.id);

        return [fresh];
      }

      if (
        conversationId === currentId
      ) {
        setCurrentId(updated[0].id);
      }

      return updated;
    });
  };

  // ===========================
  // Rename
  // ===========================

  const renameConversation = (
    conversationId: string
  ) => {
    const conversation =
      conversations.find(
        (conversation) =>
          conversation.id ===
          conversationId
      );

    if (!conversation) return;

    const title = window.prompt(
      "Rename conversation",
      conversation.title
    );

    if (!title?.trim()) return;

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id ===
        conversationId
          ? {
              ...conversation,

              title:
                title.trim(),

              updatedAt:
                new Date(),
            }
          : conversation
      )
    );
  };

  // ===========================
  // Pin / Unpin
  // ===========================

  const togglePin = (
    conversationId: string
  ) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id ===
        conversationId
          ? {
              ...conversation,

              pinned:
                !conversation.pinned,
            }
          : conversation
      )
    );
  };

  // ===========================
  // Add Message
  // ===========================

  const addMessage = (
    message: Message
  ) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (
          conversation.id !==
          currentId
        ) {
          return conversation;
        }

        let title =
          conversation.title;

        if (
          title === "New Chat" &&
          message.role === "user"
        ) {
          title =
            message.content.slice(
              0,
              35
            ) +
            (message.content.length >
            35
              ? "..."
              : "");
        }

        return {
          ...conversation,

          title,

          updatedAt: new Date(),

          messages: [
            ...conversation.messages,
            message,
          ],
        };
      })
    );
  };

  // ===========================
  // Assistant Streaming
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

  const updateLastAssistantMessage = (
    content: string
  ) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (
          conversation.id !==
          currentId
        ) {
          return conversation;
        }

        const messages = [
          ...conversation.messages,
        ];

        const last =
          messages[
            messages.length - 1
          ];

        if (
          last?.role ===
          "assistant"
        ) {
          messages[
            messages.length - 1
          ] = {
            ...last,

            content,
          };
        }

        return {
          ...conversation,

          updatedAt:
            new Date(),

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
      STORAGE_KEY,
      JSON.stringify(conversations)
    );
  }, [conversations]);

  // ===========================
  // Save Current Chat
  // ===========================

  useEffect(() => {
    localStorage.setItem(
      CURRENT_CHAT_KEY,
      currentId
    );
  }, [currentId]);

  return {
    conversations:
      sortedConversations,

    currentConversation,

    currentId,

    setCurrentId,

    addMessage,

    startAssistantMessage,

    updateLastAssistantMessage,

    newChat,

    deleteConversation,

    renameConversation,

    togglePin,
  };
}