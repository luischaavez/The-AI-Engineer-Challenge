"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function MessageInput({
  onSendMessage,
  disabled,
}: MessageInputProps) {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!message.trim() || disabled) return;

    onSendMessage(message.trim());
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex space-x-2">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 border-2 border-platinum-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none transition-all duration-200 disabled:bg-platinum-100 disabled:cursor-not-allowed text-navy-500 placeholder-platinum-400 bg-white"
          rows={1}
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            className="p-2 bg-orange-500 hover:bg-orange-600 disabled:bg-platinum-300 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
