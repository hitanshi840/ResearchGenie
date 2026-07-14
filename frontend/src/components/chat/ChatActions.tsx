import {
  Download,
  FileText,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  exportChatAsPDF,
  exportChatAsTXT,
} from "../../utils/exportChat";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
};

export default function ChatActions({
  messages,
}: Props) {
  const handleTXTExport = () => {
    if (messages.length === 0) {
      toast.error("No chat available to export.");
      return;
    }

    const loadingToast = toast.loading(
      "Exporting TXT..."
    );

    try {
      exportChatAsTXT(messages);

      toast.dismiss(loadingToast);

      toast.success(
        "TXT exported successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.dismiss(loadingToast);

      toast.error(
        "Failed to export TXT."
      );
    }
  };

  const handlePDFExport = () => {
    if (messages.length === 0) {
      toast.error("No chat available to export.");
      return;
    }

    const loadingToast = toast.loading(
      "Preparing PDF..."
    );

    try {
      exportChatAsPDF(messages);

      toast.dismiss(loadingToast);

      toast.success(
        "PDF export started."
      );
    } catch (error) {
      console.error(error);

      toast.dismiss(loadingToast);

      toast.error(
        "Failed to export PDF."
      );
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleTXTExport}
        className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 transition hover:border-cyan-500 hover:bg-slate-800"
      >
        <FileText size={18} />
        Export TXT
      </button>

      <button
        onClick={handlePDFExport}
        className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 transition hover:border-cyan-500 hover:bg-slate-800"
      >
        <Download size={18} />
        Export PDF
      </button>
    </div>
  );
}