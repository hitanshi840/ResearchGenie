import {
  Bot,
  Plus,
  FileText,
  BarChart3,
  MessageSquare,
  Pencil,
  Trash2,
  Search,
  Settings,
} from "lucide-react";

import { useMemo, useState } from "react";

import type { Conversation } from "../../types/chat";
import type { Page } from "../../App";

type Props = {
  conversations: Conversation[];
  currentId: string;
  setCurrentId: (id: string) => void;

  newChat: () => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string) => void;

  page: Page;
  setPage: React.Dispatch<
    React.SetStateAction<Page>
  >;
};

export default function Sidebar({
  conversations,
  currentId,
  setCurrentId,
  newChat,
  deleteConversation,
  renameConversation,
  page,
  setPage,
}: Props) {
  const [search, setSearch] = useState("");

  const today = new Date();

  const isToday = (date: Date) =>
    date.toDateString() === today.toDateString();

  const isYesterday = (date: Date) => {
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    return (
      date.toDateString() ===
      yesterday.toDateString()
    );
  };

  const filteredConversations =
    useMemo(() => {
      const query = search.toLowerCase();

      return conversations.filter(
        (conversation) =>
          conversation.title
            .toLowerCase()
            .includes(query) ||
          conversation.messages.some((m) =>
            m.content
              .toLowerCase()
              .includes(query)
          )
      );
    }, [conversations, search]);

  const todayChats =
    filteredConversations.filter((c) =>
      isToday(c.createdAt)
    );

  const yesterdayChats =
    filteredConversations.filter((c) =>
      isYesterday(c.createdAt)
    );

  const olderChats =
    filteredConversations.filter(
      (c) =>
        !isToday(c.createdAt) &&
        !isYesterday(c.createdAt)
    );

  const renderGroup = (
    title: string,
    chats: Conversation[]
  ) => {
    if (!chats.length) return null;

    return (
      <>
        <h2 className="mb-3 mt-5 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </h2>

        <div className="space-y-2">
          {chats.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center rounded-xl transition ${
                currentId === conversation.id
                  ? "bg-cyan-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <button
                onClick={() => {
                  setCurrentId(
                    conversation.id
                  );
                  setPage("chat");
                }}
                className="flex-1 px-3 py-3 text-left"
              >
                <p className="truncate text-sm font-medium">
                  {conversation.title}
                </p>

                <p className="mt-1 text-xs text-slate-300">
                  {
                    conversation.messages
                      .length
                  }{" "}
                  messages
                </p>
              </button>

              <div className="mr-2 flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    renameConversation(
                      conversation.id
                    );
                  }}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-600 hover:text-cyan-400"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteConversation(
                      conversation.id
                    );
                  }}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-600 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const navItem = (
    label: string,
    icon: React.ReactNode,
    value: Page
  ) => (
    <button
      onClick={() => setPage(value)}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
        page === value
          ? "bg-cyan-600"
          : "hover:bg-slate-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-900">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-cyan-400" />

          <div>
            <h1 className="text-xl font-bold">
              ResearchGenie
            </h1>

            <p className="text-xs text-slate-400">
              AI Research Assistant
            </p>
          </div>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={() => {
            newChat();
            setPage("chat");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-medium transition hover:bg-cyan-600"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-3">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search chats..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4">
        {filteredConversations.length ===
          0 && (
          <div className="py-8 text-center text-sm text-slate-500">
            No conversations found.
          </div>
        )}

        {renderGroup("Today", todayChats)}
        {renderGroup(
          "Yesterday",
          yesterdayChats
        )}
        {renderGroup("Older", olderChats)}

        <div className="my-6 border-t border-slate-800" />

        {/* Navigation */}
        <nav className="space-y-2">
          {navItem(
            "Chat",
            <MessageSquare size={18} />,
            "chat"
          )}

          {navItem(
            "Documents",
            <FileText size={18} />,
            "documents"
          )}

          {navItem(
            "Statistics",
            <BarChart3 size={18} />,
            "statistics"
          )}

          {navItem(
            "Settings",
            <Settings size={18} />,
            "settings"
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <p className="text-sm text-slate-400">
          ResearchGenie v1.0
        </p>
      </div>
    </aside>
  );
}