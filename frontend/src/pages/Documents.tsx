import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  HardDrive,
  Files,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../api/api";

type DocumentInfo = {
  document_id: string;
  document_name: string;
  pages: number;
  chunks: number;
};

export default function Documents() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/documents/");

      setDocuments(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const deleteDocument = async (id: string) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await api.delete(`/documents/${id}`);

      toast.success("Document deleted.");

      fetchDocuments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete document.");
    }
  };

  const totalPages = useMemo(() => {
    return documents.reduce(
      (sum, doc) => sum + doc.pages,
      0
    );
  }, [documents]);

  const totalChunks = useMemo(() => {
    return documents.reduce(
      (sum, doc) => sum + doc.chunks,
      0
    );
  }, [documents]);

  return (
    <div className="h-full overflow-y-auto p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Documents
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all uploaded PDFs.
          </p>
        </div>

        <button
          onClick={fetchDocuments}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 transition hover:border-cyan-500 hover:bg-slate-800"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20">
            <Files className="text-cyan-400" />
          </div>

          <h2 className="text-lg font-semibold">
            Total Documents
          </h2>

          <p className="mt-2 text-4xl font-bold text-cyan-400">
            {documents.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
            <FileText className="text-green-400" />
          </div>

          <h2 className="text-lg font-semibold">
            Indexed Pages
          </h2>

          <p className="mt-2 text-4xl font-bold text-green-400">
            {totalPages}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
            <HardDrive className="text-purple-400" />
          </div>

          <h2 className="text-lg font-semibold">
            Total Chunks
          </h2>

          <p className="mt-2 text-4xl font-bold text-purple-400">
            {totalChunks}
          </p>
        </div>
      </div>

      {/* Documents */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-6 text-xl font-semibold">
          Uploaded Documents
        </h2>

        {loading ? (
          <div className="py-16 text-center text-slate-400">
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-700">
            <div className="text-center">
              <FileText
                size={56}
                className="mx-auto text-slate-500"
              />

              <h3 className="mt-4 text-lg font-semibold">
                No Documents Uploaded
              </h3>

              <p className="mt-2 text-slate-400">
                Upload PDFs from the Chat page.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.document_id}
                className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-cyan-500"
              >
                <div>
                  <h3 className="font-semibold text-white">
                    {doc.document_name}
                  </h3>

                  <div className="mt-2 flex gap-6 text-sm text-slate-400">
                    <span>
                      📄 {doc.pages} Pages
                    </span>

                    <span>
                      🧩 {doc.chunks} Chunks
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    deleteDocument(
                      doc.document_id
                    )
                  }
                  className="rounded-lg p-3 transition hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}