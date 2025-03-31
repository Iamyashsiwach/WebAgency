// components/Chatbot/chatComponent.tsx
import { useState } from "react";
import { handleChat } from "@/ai/rag-chat";
import { Button } from "./ui/button"; // Using existing Button component
import { Textarea } from "./ui/textarea"; // Using existing Textarea component

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await handleChat(input);
      setMessages(prev => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: response }
      ]);
      setInput("");
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 ${msg.role === "user" ? "bg-gray-100" : "bg-white"}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-2 border-t">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSend} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;