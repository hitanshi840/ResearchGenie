import { ChevronDown, ChevronUp } from "lucide-react";

import UploadSection from "../upload/UploadSection";

type Props = {
  onUploadSuccess: () => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function DashboardTop({
  onUploadSuccess,
  collapsed,
  setCollapsed,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}

      <button
        onClick={() =>
          setCollapsed((prev) => !prev)
        }
        className="flex w-full items-center justify-between rounded-xl px-6 py-4 text-left transition hover:bg-slate-800"
      >
        <div>
          <h2 className="text-base font-semibold text-white">
            Upload PDF
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Upload research papers and chat with them instantly.
          </p>
        </div>

        {collapsed ? (
          <ChevronDown
            size={20}
            className="text-cyan-400"
          />
        ) : (
          <ChevronUp
            size={20}
            className="text-cyan-400"
          />
        )}
      </button>

      {/* Animated Content */}

      <div
        className={`overflow-hidden transition-all duration-500 ${
          collapsed
            ? "max-h-0 opacity-0"
            : "max-h-[700px] opacity-100"
        }`}
      >
        <div className="border-t border-slate-800 p-5">
          <UploadSection
            onUploadSuccess={
              onUploadSuccess
            }
          />
        </div>
      </div>
    </div>
  );
}