import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MessageSquare,
} from "lucide-react";

import type { Conversation } from "../../types/chat";

type Props = {
  conversations: Conversation[];
  currentId: string;
  setCurrentId: (id: string) => void;
  newChat: () => void;
};

export default function ConversationSidebar({
  conversations,
  currentId,
  setCurrentId,
  newChat,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) =>
      conversation.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [conversations, search]);

  return (
    <aside className="flex h-full w-80 flex-col border-r border-slate-800 bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <button
          onClick={newChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 font-medium transition hover:bg-cyan-500"
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search conversations..."
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              py-2.5
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              placeholder:text-slate-500
              focus:border-cyan-500
            "
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredConversations.length === 0 ? (
          <div className="mt-10 text-center">
            <MessageSquare
              size={42}
              className="mx-auto text-slate-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              {search
                ? "No conversations found."
                : "No conversations yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map(
              (conversation) => {
                const active =
                  conversation.id === currentId;

                return (
                  <button
                    key={conversation.id}
                    onClick={() =>
                      setCurrentId(
                        conversation.id
                      )
                    }
                    className={`
                      w-full
                      rounded-xl
                      border
                      p-4
                      text-left
                      transition-all
                      ${
                        active
                          ? "border-cyan-500 bg-slate-800 shadow-lg"
                          : "border-transparent hover:border-slate-700 hover:bg-slate-900"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          mt-1 rounded-lg p-2
                          ${
                            active
                              ? "bg-cyan-500 text-white"
                              : "bg-slate-800 text-slate-400"
                          }
                        `}
                      >
                        <MessageSquare
                          size={16}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-white">
                          {conversation.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            conversation.messages
                              .length
                          }{" "}
                          messages
                        </p>
                      </div>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>
    </aside>
  );
}