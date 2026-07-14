import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/95 px-8 backdrop-blur">
      <div>
        <h1 className="text-xl font-bold">ResearchGenie</h1>

        <p className="text-sm text-slate-400">
          Chat with your research documents
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Search
          size={20}
          className="cursor-pointer text-slate-400 transition hover:text-white"
        />

        <Bell
          size={20}
          className="cursor-pointer text-slate-400 transition hover:text-white"
        />

        <UserCircle2
          size={34}
          className="text-cyan-400"
        />
      </div>
    </header>
  );
}