"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { useVoiceCall } from "@/hooks/useVoiceCall";

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
  
  // Voice call state 
  const { 
    isVoiceCallActive, 
    startVoiceCall, 
    endVoiceCall, 
    isMuted, 
    toggleMute, 
    callStatus, 
    containerRef,
    transcript
  } = useVoiceCall();
  
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
      {/* Voice call container */}
      {isVoiceCallActive && (
        <div className="mb-4 rounded-lg overflow-hidden">
          {callStatus === 'connecting' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="animate-pulse">Connecting your voice call...</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-2">
              <p className="text-red-600 dark:text-red-400 font-medium">Voice Call Error:</p>
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          
          <div ref={containerRef} className="w-full h-full" style={{ height: callStatus === 'connected' ? '300px' : 'auto' }} />
          
          {/* Show transcript */}
          {transcript && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Voice Input:</p>
                <button 
                  onClick={() => startVoiceCall()} 
                  className="text-xs text-blue-600 hover:text-blue-800"
                  title="Restart voice recognition"
                >
                  Restart
                </button>
              </div>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
        </div>
      )}
      
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
          <div className="relative">
            <Textarea
              model={model}
              setModel={setModel}
              handleInputChange={handleInputChange}
              input={input}
              isLoading={isLoading}
              status={status}
              stop={() => {}}
            />
            
            {/* Voice call controls in the input area */}
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              {!isVoiceCallActive ? (
                <button 
                  type="button"
                  onClick={startVoiceCall}
                  className="flex items-center justify-center p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                  title="Start voice call"
                >
                  <Phone size={16} />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`p-2 rounded-full ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-800'}`}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button 
                    type="button"
                    onClick={endVoiceCall}
                    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                    title="End call"
                  >
                    <PhoneOff size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 