import {
  Settings as SettingsIcon,
  Moon,
  Database,
  Shield,
  Download,
  Trash2,
  CheckCircle2,
} from "lucide-react";

export default function Settings() {
  const exportChats = () => {
    const data = localStorage.getItem(
      "researchgenie-conversations"
    );

    if (!data) {
      alert("No conversations to export.");
      return;
    }

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "researchgenie-chat-history.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const clearChats = () => {
    const confirmed = window.confirm(
      "Delete ALL conversations? This action cannot be undone."
    );

    if (!confirmed) return;

    localStorage.removeItem(
      "researchgenie-conversations"
    );

    localStorage.removeItem(
      "researchgenie-current-chat"
    );

    window.location.reload();
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Customize your ResearchGenie
          experience.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Moon
              size={24}
              className="text-cyan-400"
            />

            <h2 className="text-xl font-semibold">
              Appearance
            </h2>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
            <div>
              <p className="font-medium">
                Theme
              </p>

              <p className="text-sm text-slate-400">
                Dark Mode
              </p>
            </div>

            <span className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium">
              ✓ Default
            </span>
          </div>
        </div>

        {/* AI */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Database
              size={24}
              className="text-green-400"
            />

            <h2 className="text-xl font-semibold">
              AI Configuration
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    LLM
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Gemini 2.5 Flash
                  </p>
                </div>

                <CheckCircle2 className="text-green-400" />
              </div>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Embeddings
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Gemini Embedding Model
                  </p>
                </div>

                <CheckCircle2 className="text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Shield
              size={24}
              className="text-purple-400"
            />

            <h2 className="text-xl font-semibold">
              Privacy
            </h2>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="font-medium">
              Local Storage
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your conversations stay inside
              your browser. No chat history is
              stored on external servers.
            </p>
          </div>
        </div>

        {/* Data */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <SettingsIcon
              size={24}
              className="text-orange-400"
            />

            <h2 className="text-xl font-semibold">
              Data Management
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={exportChats}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-medium transition hover:bg-cyan-500"
            >
              <Download size={18} />
              Export Chats
            </button>

            <button
              onClick={clearChats}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium transition hover:bg-red-500"
            >
              <Trash2 size={18} />
              Clear All Chats
            </button>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Export your conversation history
            as JSON or permanently remove all
            locally stored chats.
          </p>
        </div>
      </div>
    </div>
  );
}