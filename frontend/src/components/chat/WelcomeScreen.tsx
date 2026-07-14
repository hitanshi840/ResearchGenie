import {
  Brain,
  FileText,
  Sparkles,
  Upload,
  Lightbulb,
  BookOpen,
  Search,
  GraduationCap,
} from "lucide-react";

type Props = {
  onSuggestionClick?: (
    suggestion: string
  ) => void;
};

export default function WelcomeScreen({
  onSuggestionClick,
}: Props) {
  const suggestions = [
    {
      icon: <FileText size={18} />,
      text: "Summarize this PDF",
    },
    {
      icon: <Brain size={18} />,
      text: "Explain chapter 4",
    },
    {
      icon: <GraduationCap size={18} />,
      text: "Create interview questions",
    },
    {
      icon: <BookOpen size={18} />,
      text: "Generate flashcards",
    },
    {
      icon: <Search size={18} />,
      text: "List key findings",
    },
    {
      icon: <Lightbulb size={18} />,
      text: "Explain difficult concepts",
    },
  ];

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto px-8 py-12">
      <div className="w-full max-w-6xl">
        {/* Hero */}
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-cyan-500/10 p-8 ring-1 ring-cyan-500/30">
              <Brain
                size={72}
                className="text-cyan-400"
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white">
            Welcome to ResearchGenie
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Your intelligent AI Research Assistant
            powered by Retrieval-Augmented
            Generation (RAG). Upload research
            papers, books, notes or reports and
            get accurate answers grounded in your
            own documents.
          </p>
        </div>

        {/* Features */}

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-500">
            <Upload
              size={36}
              className="mb-5 text-cyan-400"
            />

            <h3 className="text-lg font-semibold">
              Upload PDFs
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Upload books, lecture notes,
              research papers, reports and
              technical documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-500">
            <Sparkles
              size={36}
              className="mb-5 text-yellow-400"
            />

            <h3 className="text-lg font-semibold">
              Ask Anything
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Ask natural language questions and
              receive contextual AI responses
              backed by your uploaded documents.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-green-500">
            <FileText
              size={36}
              className="mb-5 text-green-400"
            />

            <h3 className="text-lg font-semibold">
              Grounded Answers
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Every answer includes document
              citations so you always know where
              the information came from.
            </p>
          </div>
        </div>

        {/* Suggestions */}

        <div className="mt-16">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Try asking
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((item) => (
              <button
                key={item.text}
                onClick={() =>
                  onSuggestionClick?.(item.text)
                }
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition duration-300 hover:border-cyan-500 hover:bg-slate-800"
              >
                <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                  {item.icon}
                </div>

                <span className="font-medium text-slate-200">
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}