"use client";

import { useChat } from "ai/react";
// import { useState } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
// import { modelProviders, defaultModel } from '@/ai/providers';

type Model = "llama-3.3-70b-versatile";

interface ChatProps {
  model: Model;
  setModel: (model: Model) => void;
}

export default function Chat({ model, setModel }: ChatProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    status,
    stop,
  } = useChat({
    maxSteps: 5,
    body: {
      model: model,
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  // const sendMessage = (input: string) => {
  //   append({ role: "user", content: input });
  // };

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="flex-1 overflow-y-auto pb-24">
        {messages.length === 0 ? (
          <div className="w-full">
            <ProjectOverview />
          </div>
        ) : (
          <Messages messages={messages} />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 w-full py-4  shadow-lg"
      >
        <div className="max-w-xl mx-auto px-4 sm:px-0">
          {/* <Input
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        /> */}

          <Textarea
            model={model}
            setModel={setModel}
            handleInputChange={handleInputChange}
            input={input}
            isLoading={isLoading}
            status={status}
            stop={stop}
          />
        </div>
      </form>
    </div>
  );
}
