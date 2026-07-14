import { useState } from "react";
import {
  Loader2,
  UploadCloud,
} from "lucide-react";

type Props = {
  onFileSelect: (file: File) => void;
  loading?: boolean;
};

export default function UploadDropzone({
  onFileSelect,
  loading = false,
}: Props) {
  const [dragging, setDragging] =
    useState(false);

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setDragging(false);

    const file =
      e.dataTransfer.files[0];

    if (!file) return;

    if (
      file.type !==
      "application/pdf"
    ) {
      alert(
        "Please upload a PDF file."
      );
      return;
    }

    onFileSelect(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();

        if (!loading)
          setDragging(true);
      }}
      onDragLeave={() =>
        setDragging(false)
      }
      onDrop={handleDrop}
      className={`flex h-36 flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
        dragging
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-slate-700 hover:border-cyan-500"
      } ${
        loading
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer"
      }`}
    >
      {loading ? (
        <>
          <Loader2
            size={34}
            className="mb-3 animate-spin text-cyan-400"
          />

          <h3 className="font-semibold">
            Uploading...
          </h3>
        </>
      ) : (
        <>
          <UploadCloud
            size={34}
            className="mb-3 text-cyan-400"
          />

          <h3 className="font-semibold">
            {dragging
              ? "Release to Upload"
              : "Drag & Drop PDF Here"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            or click the Upload button above
          </p>
        </>
      )}
    </div>
  );
}