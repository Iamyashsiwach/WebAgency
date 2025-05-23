import { Model } from "@/ai/providers";
import { Textarea as ShadcnTextarea } from "@/components/Chatbot/ui/textarea";
import { ArrowUp } from "lucide-react";
import { ModelPicker } from "./model-picker";
import { ChangeEvent } from "react";

interface InputProps {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  status: string;
  stop: () => void;
  model: Model;
  setModel: (model: Model) => void;
}

export const Textarea = ({
  input,
  handleInputChange,
  isLoading,
  status,
  stop,
  model,
  setModel,
}: InputProps) => {
  return (
    <div className="relative w-full pt-4">
      <ShadcnTextarea
        className="resize-none bg-white dark:bg-zinc-800 w-full rounded-2xl pr-24 pt-4 pb-16 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        value={input}
        autoFocus
        placeholder={"Say something..."}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              const form = (e.target as HTMLElement).closest("form");
              if (form) form.requestSubmit();
            }
          }
        }}
      />
      <ModelPicker model={model} setModel={setModel} />

      {status === "streaming" || status === "submitted" ? (
        <button
          type="button"
          onClick={stop}
          className="cursor-pointer absolute right-14 bottom-2 rounded-full p-2 bg-black hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors"
        >
          <div className="animate-spin h-4 w-4">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-14 bottom-2 rounded-full p-2 bg-black hover:bg-zinc-800 disabled:bg-zinc-300 disabled:dark:bg-zinc-700 dark:disabled:opacity-80 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowUp className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
};
