import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import api from "../../api/api";
import UploadButton from "./UploadButton";
import UploadDropzone from "./UploadDropzone";
import UploadStatus from "./UploadStatus";

type Props = {
  onUploadSuccess?: () => void;
};

export default function UploadSection({
  onUploadSuccess,
}: Props) {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    if (uploading) return;

    setUploading(true);

    const loadingToast = toast.loading(
      "Uploading PDF..."
    );

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      toast.dismiss(loadingToast);

      toast.success(
        "PDF uploaded successfully!"
      );

      onUploadSuccess?.();
    } catch (error) {
      console.error(error);

      let errorMessage =
        "❌ Upload failed.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.detail ??
          "❌ Upload failed.";
      }

      setMessage(errorMessage);

      toast.dismiss(loadingToast);

      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold">
        Upload PDF
      </h2>

      <UploadButton
        onFileSelect={upload}
        loading={uploading}
      />

      <div className="mt-4">
        <UploadDropzone
          onFileSelect={upload}
          loading={uploading}
        />
      </div>

      {message && (
        <div className="mt-4">
          <UploadStatus
            message={message}
          />
        </div>
      )}
    </section>
  );
}