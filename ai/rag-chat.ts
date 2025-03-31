import { createRAGChain } from "./rag.js";
import { model } from "./providers";

export const handleChat = async (message: string): Promise<string> => {
  try {
    const context = await fetchRelevantContext(message);
    return await generateResponse(message, context);
  } catch (error) {
    console.error("Error handling chat:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};

const fetchRelevantContext = async (message: string): Promise<string> => {
  try {
    const ragChain = await createRAGChain();
    const relevantDocs = await ragChain.search(message);
    return relevantDocs.length
      ? relevantDocs
          .map((doc) => {
            if (Array.isArray(doc)) {
              return doc[0].pageContent;
            }
            return doc.pageContent;
          })
          .join("\n\n")
      : "";
  } catch (error: unknown) {
    console.error("Error fetching context:", error);
    return `Error retrieving context: ${error instanceof Error ? error.message : String(error)}`;
  }
};

const generateResponse = async (message: string, context: string): Promise<string> => {
  try {
    const systemPrompt = context
      ? `You are a helpful assistant. Always try to answer questions using the following knowledge first:\n\n${context}\n\nIf the question isn't directly addressed in the knowledge provided, you should still provide a helpful response based on your general knowledge, but clearly indicate when you're not using the provided documents.`
      : `You are a helpful assistant. The query doesn't match any documents in our knowledge base, but please provide a helpful response based on your general knowledge.`;

    const llm = model.languageModel("llama-3.3-70b-versatile");

    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: message
      }
    ];

    try {
      const response = await llm.doGenerate({
        inputFormat: "messages",
        mode: { type: "regular" },
        prompt: messages as any
      });

      if (!response || typeof response !== "object") {
        throw new Error("Invalid response received from LLM");
      }

      if (!response.text) {
        console.error("LLM response details:", JSON.stringify(response, null, 2));
        throw new Error("Response object has no 'text' property");
      }

      return response.text;
    } catch (llmError: unknown) {
      console.error("LLM error details:", {
        error: llmError,
        messages,
        systemPrompt,
        message
      });
      return "Failed to process message due to an internal error.";
    }
  } catch (error: unknown) {
    console.error("Error generating response:", {
      error,
      context,
      message
    });
    return `Sorry, I encountered an error generating a response. Details: ${error instanceof Error ? error.message : String(error)}`;
  }
};