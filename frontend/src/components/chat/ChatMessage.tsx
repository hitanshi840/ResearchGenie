import {
  Bot,
  User,
  Copy,
  FileText,
  Check,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import CodeBlock from "./CodeBlock";
import MermaidDiagram from "./MermaidDiagram";

type Source = {
  document: string;
  page: number;
  score: number;
};

type Props = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  onRegenerate?: () => void;
};

export default function ChatMessage({
  role,
  content,
  sources = [],
  onRegenerate,
}: Props) {
  const isUser = role === "user";

  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      toast.success("Message copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy message.");
    }
  }

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 shadow-lg">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-4xl rounded-2xl px-6 py-5 shadow-xl transition-all duration-300 ${
          isUser
            ? "bg-cyan-600 text-white"
            : "border border-slate-700 bg-slate-900 hover:border-cyan-500"
        }`}
      >
        <div
          className="
            prose
            prose-invert
            max-w-none

            prose-headings:text-white
            prose-p:text-slate-200
            prose-strong:text-white

            prose-a:text-cyan-400

            prose-li:text-slate-200

            prose-blockquote:border-cyan-500
            prose-blockquote:text-slate-300

            prose-code:text-cyan-300

            prose-pre:bg-slate-950
            prose-pre:border
            prose-pre:border-slate-700
            prose-pre:rounded-xl
            prose-pre:p-4

            prose-table:border
            prose-table:border-slate-700

            prose-th:border
            prose-th:border-slate-700

            prose-td:border
            prose-td:border-slate-700
          "
        >
          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
              remarkMath,
            ]}
            rehypePlugins={[
              rehypeHighlight,
              rehypeKatex,
            ]}
            components={{
              code({
                children,
                className,
              }) {
                const value = String(
                  children
                ).replace(/\n$/, "");

                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                const language =
                  match?.[1];

                if (
                  language === "mermaid"
                ) {
                  return (
                    <MermaidDiagram
                      chart={value}
                    />
                  );
                }

                if (language) {
                  return (
                    <CodeBlock
                      language={language}
                      value={value}
                    />
                  );
                }

                return (
                  <code className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Sources */}

        {!isUser &&
          sources.length > 0 && (
            <div className="mt-6 border-t border-slate-700 pt-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                <FileText size={16} />
                Sources
              </h3>

              <div className="space-y-3">
                {sources.map(
                  (source, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-700 bg-slate-800 p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-850"
                    >
                      <p className="font-semibold text-white">
                        {source.document}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                        <span>
                          📄 Page {source.page}
                        </span>

                        <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-cyan-300">
                          {(source.score * 100).toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* Action Buttons */}

        {!isUser && (
          <div className="mt-6 flex items-center justify-end gap-3">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm transition-all duration-200 hover:border-cyan-500 hover:bg-slate-800"
              >
                <RotateCcw size={16} />
                Regenerate
              </button>
            )}

            <button
              onClick={copyMessage}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm transition-all duration-200 hover:border-cyan-500 hover:bg-slate-800"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700 shadow-lg">
          <User size={20} />
        </div>
      )}
    </div>
  );
}