import { modelID, mappings } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model: modelID,
  }: { messages: UIMessage[]; model: modelID } = await req.json();

  const languageModel = mappings[modelID];
  const result = streamText({
    model: languageModel,
    system: "You are a helpful assistant.",
    messages,
    tools: {
      getWeather: weatherTool,
    },
    experimental_telemetry: {
      isEnabled: true,
    },
  });

  return result.toDataStreamResponse({ sendReasoning: true });
}
