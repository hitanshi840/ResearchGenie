import {
  BarChart3,
  FileText,
  MessageSquare,
  Clock,
  TrendingUp,
  Brain,
  Sparkles,
  Activity,
} from "lucide-react";

import type { Conversation } from "../types/chat";

type Props = {
  conversations: Conversation[];
};

export default function Statistics({
  conversations,
}: Props) {
  const totalChats = conversations.length;

  const totalMessages = conversations.reduce(
    (total, conversation) =>
      total + conversation.messages.length,
    0
  );

  const totalQuestions = conversations.reduce(
    (total, conversation) =>
      total +
      conversation.messages.filter(
        (message) => message.role === "user"
      ).length,
    0
  );

  const totalAIResponses = conversations.reduce(
    (total, conversation) =>
      total +
      conversation.messages.filter(
        (message) => message.role === "assistant"
      ).length,
    0
  );

  const averageMessages =
    totalChats > 0
      ? (totalMessages / totalChats).toFixed(1)
      : "0";

  const completionRate =
    totalQuestions > 0
      ? Math.round(
          (totalAIResponses / totalQuestions) * 100
        )
      : 0;

  return (
    <div className="h-full overflow-y-auto p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Statistics
          </h1>

          <p className="mt-2 text-slate-400">
            Insights about your ResearchGenie usage.
          </p>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            AI Analytics
          </div>
        </div>
      </div>

      {/* Top Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
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

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-green-500">
          <FileText
            className="mb-4 text-green-400"
            size={34}
          />

          <p className="text-sm text-slate-400">
            Documents Uploaded
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-purple-500">
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

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-orange-500">
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
        {/* Activity */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="mb-5 flex items-center gap-3">
            <TrendingUp
              className="text-cyan-400"
              size={24}
            />

            <h2 className="text-xl font-semibold">
              Weekly Activity
            </h2>
          </div>

          <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700">
            <Activity
              size={60}
              className="text-cyan-500"
            />

            <p className="mt-5 text-lg font-semibold">
              Analytics Dashboard
            </p>

            <p className="mt-2 text-center text-slate-400">
              Charts and activity trends will appear
              here once enough conversations have
              been collected.
            </p>
          </div>
        </div>

        {/* Summary */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="mb-5 flex items-center gap-3">
            <Brain
              className="text-purple-400"
              size={24}
            />

            <h2 className="text-xl font-semibold">
              AI Usage Summary
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <span className="text-slate-400">
                Questions Asked
              </span>

              <span className="font-semibold">
                {totalQuestions}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <span className="text-slate-400">
                Average Messages / Chat
              </span>

              <span className="font-semibold">
                {averageMessages}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <span className="text-slate-400">
                AI Completion Rate
              </span>

              <span className="font-semibold text-green-400">
                {completionRate}%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <span className="text-slate-400">
                Average Response Time
              </span>

              <span className="font-semibold">
                ~1 sec
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <span className="text-slate-400">
                Documents Queried
              </span>

              <span className="font-semibold">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}