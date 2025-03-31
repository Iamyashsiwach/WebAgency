import { Message } from "./message";
import { useScrollToBottom } from "@/libs/Chatbot-lib/hooks/use-scroll-to-bottom";

interface Message {
  id: string;
  role: 'data' | 'user' | 'assistant' | 'system';
  content: string;
}

export const Messages = ({
  messages,
  isLoading,
  status,
}: {
  messages: Message[];
  isLoading?: boolean;
  status?: string;
}) => {
  const [containerRef, endRef] = useScrollToBottom();
  return (
    <div
      className="flex-1 h-full space-y-4 overflow-y-auto py-8"
      ref={containerRef}
    >
      <div className="max-w-xl mx-auto pt-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.role === 'user' ? 'items-end' : 'items-start'
            } mb-4`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-zinc-700 text-black dark:text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div className="h-1" ref={endRef} />
      </div>
    </div>
  );
};
