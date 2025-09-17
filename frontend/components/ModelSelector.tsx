"use client";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { value: "gpt-4.1-mini", label: "GPT-4.1 Mini" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
];

export default function ModelSelector({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  return (
    <select
      value={selectedModel}
      onChange={(e) => onModelChange(e.target.value)}
      className="w-full px-3 py-2 border-2 border-platinum-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm bg-white text-navy-500"
    >
      {models.map((model) => (
        <option key={model.value} value={model.value}>
          {model.label}
        </option>
      ))}
    </select>
  );
}
