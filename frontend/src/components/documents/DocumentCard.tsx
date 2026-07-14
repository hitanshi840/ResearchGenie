import {
  FileText,
  Layers,
  Trash2,
} from "lucide-react";

import type { Document } from "../../api/documents";

type Props = {
  document: Document;
  onDelete: (id: string) => void;
};

export default function DocumentCard({
  document,
  onDelete,
}: Props) {
  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-800
        bg-slate-950
        p-4
        transition-all
        duration-300
        hover:border-cyan-500
        hover:shadow-lg
        hover:shadow-cyan-500/10
      "
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-cyan-600 p-3">
          <FileText size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {document.document_name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              📄 {document.pages} Pages
            </span>

            <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              <Layers size={13} />
              {document.chunks} Chunks
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(document.document_id)}
        className="
          rounded-xl
          p-3
          text-red-400
          transition
          hover:bg-red-500/20
          hover:text-red-300
        "
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}