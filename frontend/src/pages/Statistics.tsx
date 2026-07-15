import {
  FileText,
  MessageSquare,
  Clock,
  TrendingUp,
  Brain,
  Sparkles,
  Activity,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import api from "../api/api";
import type { Conversation } from "../types/chat";

type Props = {
  conversations: Conversation[];
};

type DocumentInfo = {
  document_id: string;
  document_name: string;
  pages: number;
  chunks: number;
};

export default function Statistics({
  conversations,
}: Props) {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const res = await api.get("/documents");
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // ==========================
  // Conversation Stats
  // ==========================

  const totalChats = conversations.length;

  const totalMessages = conversations.reduce(
    (sum, c) => sum + c.messages.length,
    0
  );

  const totalQuestions = conversations.reduce(
    (sum, c) =>
      sum +
      c.messages.filter(
        (m) => m.role === "user"
      ).length,
    0
  );

  const totalAIResponses = conversations.reduce(
    (sum, c) =>
      sum +
      c.messages.filter(
        (m) => m.role === "assistant"
      ).length,
    0
  );

  const averageMessages =
    totalChats === 0
      ? "0"
      : (
          totalMessages / totalChats
        ).toFixed(1);

  const completionRate =
    totalQuestions === 0
      ? 0
      : Math.round(
          (totalAIResponses /
            totalQuestions) *
            100
        );

  // ==========================
  // Document Stats
  // ==========================

  const totalDocuments =
    documents.length;

  const totalPages = documents.reduce(
    (sum, doc) => sum + doc.pages,
    0
  );

  const totalChunks = documents.reduce(
    (sum, doc) => sum + doc.chunks,
    0
  );

  const averageChunks =
    totalDocuments === 0
      ? 0
      : (
          totalChunks /
          totalDocuments
        ).toFixed(1);

  // ==========================
  // Weekly Activity
  // ==========================

  const weeklyActivity = useMemo(() => {
    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const values = new Array(7).fill(0);

    conversations.forEach((chat) => {
      const day = new Date(
        chat.createdAt
      ).getDay();

      values[day]++;
    });

    const max = Math.max(...values, 1);

    return days.map((day, i) => ({
      day,
      value: values[i],
      height:
        values[i] === 0
          ? 12
          : (values[i] / max) * 160,
    }));
  }, [conversations]);

  return (
    <div className="h-full overflow-y-auto p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Statistics
          </h1>

          <p className="mt-2 text-slate-400">
            Insights about your
            ResearchGenie usage.
          </p>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            AI Analytics
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <MessageSquare
            className="mb-4 text-cyan-400"
            size={34}
          />

          <p className="text-sm text-slate-400">
            Total Chats
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalChats}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <FileText
            className="mb-4 text-green-400"
            size={34}
          />

          <p className="text-sm text-slate-400">
            Documents Uploaded
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalDocuments}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <Brain
            className="mb-4 text-purple-400"
            size={34}
          />

          <p className="text-sm text-slate-400">
            AI Responses
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalAIResponses}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <Clock
            className="mb-4 text-orange-400"
            size={34}
          />

          <p className="text-sm text-slate-400">
            Total Messages
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalMessages}
          </h2>
        </div>
      </div>

      {/* Bottom */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp
              size={24}
              className="text-cyan-400"
            />

            <h2 className="text-xl font-semibold">
              Weekly Activity
            </h2>
          </div>

          <div className="flex h-64 items-end justify-between gap-3">
            {weeklyActivity.map((day) => (
              <div
                key={day.day}
                className="flex flex-1 flex-col items-center"
              >
                <div
                  className="w-full rounded-t-lg bg-cyan-500 transition-all"
                  style={{
                    height: `${day.height}px`,
                  }}
                />

                <p className="mt-3 text-sm text-slate-400">
                  {day.day}
                </p>

                <p className="text-xs text-slate-500">
                  {day.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="mb-6 flex items-center gap-3">
            <Activity
              size={24}
              className="text-green-400"
            />

            <h2 className="text-xl font-semibold">
              AI Usage Summary
            </h2>
          </div>

          <div className="space-y-4">
            <SummaryRow
              label="Questions Asked"
              value={totalQuestions}
            />

            <SummaryRow
              label="Average Messages / Chat"
              value={averageMessages}
            />

            <SummaryRow
              label="AI Completion Rate"
              value={`${completionRate}%`}
              color="text-green-400"
            />

            <SummaryRow
              label="Indexed Pages"
              value={totalPages}
            />

            <SummaryRow
              label="Total Chunks"
              value={totalChunks}
            />

            <SummaryRow
              label="Average Chunks / Document"
              value={averageChunks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type RowProps = {
  label: string;
  value: string | number;
  color?: string;
};

function SummaryRow({
  label,
  value,
  color,
}: RowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
      <span className="text-slate-400">
        {label}
      </span>

      <span
        className={`font-semibold ${
          color ?? ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}