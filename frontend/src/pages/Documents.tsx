import {
  FileText,
  HardDrive,
  Files,
} from "lucide-react";

export default function Documents() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Documents
        </h1>

        <p className="mt-2 text-slate-400">
          Manage all uploaded PDFs and research
          documents.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20">
            <Files className="text-cyan-400" />
          </div>

          <h2 className="text-lg font-semibold">
            Total Documents
          </h2>

          <p className="mt-2 text-4xl font-bold text-cyan-400">
            --
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
            --
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
            <HardDrive className="text-purple-400" />
          </div>

          <h2 className="text-lg font-semibold">
            Storage Used
          </h2>

          <p className="mt-2 text-4xl font-bold text-purple-400">
            --
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-6 text-xl font-semibold">
          Uploaded Documents
        </h2>

        <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-700">
          <div className="text-center">
            <FileText
              size={56}
              className="mx-auto text-slate-500"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Documents will appear here
            </h3>

            <p className="mt-2 text-slate-400">
              Upload PDFs from the Chat page to
              manage them here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}