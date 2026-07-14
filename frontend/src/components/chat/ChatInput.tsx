import { Send, Square } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  onSend: (message: string) => void;
  onStop: () => void;
  loading: boolean;
  initialMessage?: string;
}

export default function ChatInput({
  onSend,
  onStop,
  loading,
  initialMessage = "",
}: Props) {
  const [message, setMessage] =
    useState(initialMessage);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  // ==========================
  // Prefill input
  // ==========================
  useEffect(() => {
    if (initialMessage !== "") {
      setMessage(initialMessage);

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }, [initialMessage]);

  // ==========================
  // Auto Resize
  // ==========================
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height =
      "0px";

    textareaRef.current.style.height =
      `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  // ==========================
  // Send Message
  // ==========================
  const handleSend = () => {
    if (!message.trim() || loading) return;

    onSend(message.trim());

    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height =
        "58px";
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-5">
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          disabled={loading}
          placeholder={
            loading
              ? "ResearchGenie is generating..."
              : "Ask anything about your documents..."
          }
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            // Ctrl + Enter (Windows)
            // Cmd + Enter (Mac)
            if (
              (e.ctrlKey ||
                e.metaKey) &&
              e.key === "Enter"
            ) {
              e.preventDefault();
              handleSend();
              return;
            }

            // Enter
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleSend();
              return;
            }

            // Escape
            if (
              e.key === "Escape" &&
              loading
            ) {
              e.preventDefault();
              onStop();
            }
          }}
          className="
            min-h-[58px]
            max-h-40
            flex-1
            resize-none
            overflow-y-auto
            rounded-xl
            bg-slate-800
            px-5
            py-4
            text-white
            outline-none
            transition
            placeholder:text-slate-500
            focus:ring-2
            focus:ring-cyan-500
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        {loading ? (
          <button
            onClick={onStop}
            className="
              flex
              h-[58px]
              w-[58px]
              items-center
              justify-center
              rounded-xl
              bg-red-500
              transition
              hover:bg-red-600
            "
          >
            <Square
              size={20}
              fill="white"
            />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="
              flex
              h-[58px]
              w-[58px]
              items-center
              justify-center
              rounded-xl
              bg-cyan-500
              transition
              hover:bg-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Send size={20} />
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Enter • Send &nbsp;|&nbsp;
        Shift + Enter • New line
        &nbsp;|&nbsp;
        Ctrl/Cmd + Enter • Send
        &nbsp;|&nbsp;
        Esc • Stop
      </p>
    </div>
  );
}