"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";

type Model = "llama-3.3-70b-versatile";

interface ChatProps {
  model: Model;
  setModel: (model: Model) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function DirectChat({ model, setModel }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  
  const generateId = () => Math.random().toString(36).substring(2, 10);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = {
      id: generateId(),
      role: 'user' as const,
      content: input
    };
    
    setMessages((messages) => [...messages, userMessage]);
    setIsLoading(true);
    setError(null);
    setInput("");
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get response');
      }
      
      const data = await response.json();
      
      setMessages((messages) => [
        ...messages,
        {
          id: generateId(),
          role: 'assistant',
          content: data.response
        }
      ]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const status = isLoading ? "streaming" : "ready";
  
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="flex-1 overflow-y-auto pb-24">
        {messages.length === 0 ? (
          <div className="w-full">
            <ProjectOverview />
          </div>
        ) : (
          <Messages messages={messages} isLoading={isLoading} status={status} />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 w-full py-4 shadow-lg"
      >
        <div className="max-w-xl mx-auto px-4 sm:px-0">
          <Textarea
            model={model}
            setModel={setModel}
            handleInputChange={handleInputChange}
            input={input}
            isLoading={isLoading}
            status={status}
            stop={() => {}}
          />
        </div>
      </form>
    </div>
  );
} 