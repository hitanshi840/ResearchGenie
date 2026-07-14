import { useState } from "react";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

import useChatHistory from "./hooks/useChatHistory";

export type Page =
  | "chat"
  | "documents"
  | "statistics"
  | "settings";

function App() {
  const chat = useChatHistory();

  const [page, setPage] =
    useState<Page>("chat");

  return (
    <MainLayout
      chat={chat}
      page={page}
      setPage={setPage}
    >
      {page === "chat" && (
        <Home chat={chat} />
      )}

      {page === "documents" && (
        <Documents />
      )}

      {page === "statistics" && (
        <Statistics
          conversations={chat.conversations}
        />
      )}

      {page === "settings" && (
        <Settings />
      )}
    </MainLayout>
  );
}

export default App;