import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600">
        <Bot size={20} />
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-5 shadow-lg">
        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-400">
          ResearchGenie is thinking...
        </p>
      </div>
    </div>
  );
}