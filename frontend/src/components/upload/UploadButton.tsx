import {
  Loader2,
  Upload,
} from "lucide-react";

type Props = {
  onFileSelect: (file: File) => void;
  loading?: boolean;
};

export default function UploadButton({
  onFileSelect,
  loading = false,
}: Props) {
  return (
    <label className="block cursor-pointer">
      <input
        type="file"
        accept=".pdf"
        disabled={loading}
        className="hidden"
        onChange={(e) => {
          if (
            e.target.files &&
            e.target.files.length > 0
          ) {
            onFileSelect(
              e.target.files[0]
            );
          }
        }}
      />

      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-cyan-600
          px-5
          py-3
          font-medium
          text-white
          transition
          hover:bg-cyan-700
        "
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />
            Upload PDF
          </>
        )}
      </div>
    </label>
  );
}