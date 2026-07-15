import { Send, Square } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {
  onSend: (message: string) => void;
  onStop: () => void;
  loading: boolean;
  initialMessage?: string;
}

const ChatInput = forwardRef<
  HTMLTextAreaElement,
  Props
>(
  (
    {
      onSend,
      onStop,
      loading,
      initialMessage = "",
    },
    ref
  ) => {
    const [message, setMessage] =
      useState(initialMessage);

    const textareaRef =
      useRef<HTMLTextAreaElement>(null);

    // =====================================
    // Expose textarea to parent
    // =====================================

    useImperativeHandle(
      ref,
      () => textareaRef.current!,
      []
    );

    // =====================================
    // Prefill
    // =====================================

    useEffect(() => {
      if (initialMessage === "") return;

      setMessage(initialMessage);

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }, [initialMessage]);

    // =====================================
    // Auto Resize
    // =====================================

    useEffect(() => {
      const textarea =
        textareaRef.current;

      if (!textarea) return;

      textarea.style.height = "0px";

      textarea.style.height = `${Math.min(
        textarea.scrollHeight,
        160
      )}px`;
    }, [message]);

    // =====================================
    // Send
    // =====================================

    const handleSend = () => {
      const text = message.trim();

      if (!text || loading) return;

      onSend(text);

      setMessage("");

      requestAnimationFrame(() => {
        if (!textareaRef.current) return;

        textareaRef.current.style.height =
          "58px";

        textareaRef.current.focus();
      });
    };

    return (
      <div className="border-t border-slate-800 bg-slate-950 p-5">
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            disabled={loading}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            placeholder={
              loading
                ? "ResearchGenie is generating..."
                : "Ask anything about your documents..."
            }
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                handleSend();
                return;
              }

              if (
                (e.ctrlKey ||
                  e.metaKey) &&
                e.key === "Enter"
              ) {
                e.preventDefault();
                handleSend();
                return;
              }

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
          Esc • Stop
        </p>
      </div>
    );
  }
);

ChatInput.displayName =
  "ChatInput";

export default ChatInput;