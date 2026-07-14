import {
  Settings as SettingsIcon,
  Moon,
  Database,
  Shield,
  Download,
  Trash2,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="h-full overflow-y-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Customize your ResearchGenie experience.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Moon
              className="text-cyan-400"
              size={24}
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
                Dark mode (coming soon)
              </p>
            </div>

            <button
              disabled
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm opacity-60"
            >
              Dark
            </button>
          </div>
        </div>

        {/* AI Configuration */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Database
              className="text-green-400"
              size={24}
            />

            <h2 className="text-xl font-semibold">
              AI Configuration
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-medium">
                Model
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Gemini API (configured)
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-medium">
                Embedding Model
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Gemini Embeddings
              </p>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Shield
              className="text-purple-400"
              size={24}
            />

            <h2 className="text-xl font-semibold">
              Privacy
            </h2>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="font-medium">
              Local Chat History
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Conversations are stored in your browser.
            </p>
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <SettingsIcon
              className="text-orange-400"
              size={24}
            />

            <h2 className="text-xl font-semibold">
              Data Management
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              disabled
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 opacity-60"
            >
              <Download size={18} />
              Export Chats
            </button>

            <button
              disabled
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 opacity-60"
            >
              <Trash2 size={18} />
              Clear All Chats
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            These features will be available in Sprint 13.
          </p>
        </div>
      </div>
    </div>
  );
}