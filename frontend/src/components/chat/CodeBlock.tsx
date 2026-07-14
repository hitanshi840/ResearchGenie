import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = {
  language?: string;
  value: string;
};

export default function CodeBlock({
  language,
  value,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(
      value
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          {language || "code"}
        </span>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-slate-300 transition hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto bg-slate-950 p-4">
        <code className={`language-${language}`}>
          {value}
        </code>
      </pre>
    </div>
  );
}