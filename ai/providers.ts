import { groq } from "@ai-sdk/groq";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

// custom provider with different model settings:
export const model = customProvider({
  languageModels: {
    // "llama-3.1-8b-instant": groq("llama-3.1-8b-instant"),
    // "deepseek-r1-distill-llama-70b": wrapLanguageModel({
    //   middleware: extractReasoningMiddleware({
    //     tagName: "think",
    //   }),
    //   model: groq("deepseek-r1-distill-llama-70b"),
    // }),
    "llama-3.3-70b-versatile": groq("llama-3.3-70b-versatile"),
  },
});

export type modelID = Parameters<(typeof model)["languageModel"]>["0"];

export type ModelID = 'llama-3.3-70b-versatile' ;

export type Model = "llama-3.3-70b-versatile" ;

export const mappings = {
  'llama-3.3-70b-versatile': model.languageModel('llama-3.3-70b-versatile'),
  // 'llama-3.1-8b-instant': model.languageModel('llama-3.1-8b-instant'),
} as const satisfies Record<ModelID, ReturnType<typeof model.languageModel>>;

export const modelProviders = {
  'llama-3.3-70b-versatile': {
    modelId: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B Versatile',
  },
  // 'llama-3.1-8b-instant': {
  //   modelId: 'llama-3.1-8b-instant',
  //   name: 'Llama 3.1 8B Instant',
  // },
  // 'deepseek-r1-distill-llama-70b': {
  //   modelId: 'deepseek-r1-distill-llama-70b',
  //   name: 'DeepSeek R1 Distill Llama 70B',
  // },
} as const;

export const defaultModel = 'llama-3.3-70b-versatile';
