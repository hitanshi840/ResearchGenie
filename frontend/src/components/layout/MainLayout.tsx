import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import type useChatHistory from "../../hooks/useChatHistory";
import type { Page } from "../../App";

type Props = {
  children: React.ReactNode;
  chat: ReturnType<typeof useChatHistory>;
  page: Page;
  setPage: React.Dispatch<
    React.SetStateAction<Page>
  >;
};

export default function MainLayout({
  children,
  chat,
  page,
  setPage,
}: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar
        conversations={chat.conversations}
        currentId={chat.currentId}
        setCurrentId={chat.setCurrentId}
        newChat={chat.newChat}
        deleteConversation={
          chat.deleteConversation
        }
        renameConversation={
          chat.renameConversation
        }
        page={page}
        setPage={setPage}
      />

      {/* Right Side */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}