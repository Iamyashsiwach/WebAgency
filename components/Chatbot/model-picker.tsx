"use client";
import { Model } from "@/ai/providers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ModelPickerProps {
  model: Model;
  setModel: (model: Model) => void;
}

const MODELS: Record<Model, string> = {
  "llama-3.3-70b-versatile": "Online",
  // "llama-3.3-70b-versatile-offline": "Offline",
  // "llama-3.1-8b-instant": "Llama 3 8B"
};

export const ModelPicker = ({ model, setModel }: ModelPickerProps) => {
  return (
    <div className="absolute bottom-2 left-2 flex flex-col gap-2">
      <Select value={model} onValueChange={setModel}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(MODELS).map(([modelId, modelName]) => (
              <SelectItem key={modelId} value={modelId}>
                {modelName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
