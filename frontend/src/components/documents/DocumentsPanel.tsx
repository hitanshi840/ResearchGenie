import { useEffect, useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getDocuments,
  deleteDocument,
} from "../../api/documents";

import type { Document } from "../../api/documents";

import DocumentCard from "./DocumentCard";

type Props = {
  refreshKey: number;
};

export default function DocumentsPanel({
  refreshKey,
}: Props) {
  const [documents, setDocuments] =
    useState<Document[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadDocuments() {
    try {
      setLoading(true);

      const data = await getDocuments();

      setDocuments(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this document?"
    );

    if (!confirmed) return;

    const loadingToast = toast.loading(
      "Deleting document..."
    );

    try {
      await deleteDocument(id);

      setDocuments((prev) =>
        prev.filter(
          (document) =>
            document.document_id !== id
        )
      );

      toast.dismiss(loadingToast);

      toast.success(
        "Document deleted successfully."
      );
    } catch (error) {
      console.error(error);

      toast.dismiss(loadingToast);

      toast.error(
        "Failed to delete document."
      );
    }
  }

  useEffect(() => {
    loadDocuments();
  }, [refreshKey]);

  return (
    <section className="flex h-[230px] flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      {/* Header */}

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="text-cyan-400" />

          <h2 className="text-lg font-bold">
            Uploaded Documents
          </h2>
        </div>

        <span className="rounded-full bg-cyan-600/20 px-3 py-1 text-sm font-semibold text-cyan-300">
          {documents.length}
        </span>
      </div>

      {/* Content */}

      <div className="flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-950">
            <Loader2
              className="animate-spin text-cyan-400"
              size={28}
            />

            <p className="text-slate-400">
              Loading documents...
            </p>
          </div>
        ) : documents.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700">
            <FileText
              size={42}
              className="text-slate-500"
            />

            <h3 className="mt-4 font-semibold">
              No PDFs Uploaded
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Upload your first research paper.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((document) => (
              <DocumentCard
                key={document.document_id}
                document={document}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}