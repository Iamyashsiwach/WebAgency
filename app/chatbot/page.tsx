"use client";

import { useState } from "react";
import { Model } from "@/ai/providers";
import DirectChat from "@/components/Chatbot/directChat";

export default function ChatbotPage() {
  const [model, setModel] = useState<Model>("llama-3.3-70b-versatile");

  return (
    <main className="flex min-h-screen flex-col items-center pt-16 px-4 md:px-24">
      <div className="w-full max-w-4xl mx-auto flex-grow">
        {/* <h1 className="mb-8 text-3xl font-bold">Chat with our AI</h1> */}
        <DirectChat model={model} setModel={setModel} />
      </div>
    </main>
  );
}
