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
  return (
    <div className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-950">
      <div className="p-4">
        <button
          onClick={newChat}
          className="w-full rounded-xl bg-cyan-600 px-4 py-3 font-medium transition hover:bg-cyan-500"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setCurrentId(conversation.id)}
              className={`w-full rounded-lg px-4 py-3 text-left transition ${
                currentId === conversation.id
                  ? "bg-slate-800"
                  : "hover:bg-slate-900"
              }`}
            >
              <p className="truncate text-sm font-medium">
                {conversation.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}