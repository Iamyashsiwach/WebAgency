"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState<"deepseek-r1-distill-llama-70b" | "llama-3.3-70b-versatile" | "llama-3.1-8b-instant">("deepseek-r1-distill-llama-70b");
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
      selectedModel,
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  // const sendMessage = (input: string) => {
  //   append({ role: "user", content: input });
  // };

  if (error) return <div>{error.message}</div>;

  return (
    <div className="h-dvh flex flex-col justify-center w-full stretch">
      {/* <Header /> */}
      {messages.length === 0 ? (
        <div className="max-w-xl mx-auto w-full">
          <ProjectOverview />
          {/* <SuggestedPrompts sendMessage={sendMessage} /> */}
        </div>
      ) : (
        <Messages messages={messages} isLoading={isLoading} status={status} />
      )}
      <form
        onSubmit={handleSubmit}
        className="pb-8 bg-white dark:bg-black w-full max-w-xl mx-auto px-4 sm:px-0"
      >
        {/* <Input
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        /> */}

        <Textarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </div>
  );
}
