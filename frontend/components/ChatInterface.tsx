"use client";

import { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ModelSelector from "./ModelSelector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  apiKey: string;
}

export default function ChatInterface({ apiKey }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4.1-mini");
  const [developerMessage, setDeveloperMessage] = useState<string>(
    "You are a helpful AI assistant."
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          developer_message: developerMessage,
          user_message: userMessage,
          model: selectedModel,
          api_key: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${
          error instanceof Error ? error.message : "Failed to send message"
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-platinum-200">
      {/* Header */}
      <div className="bg-navy-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat with AI</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleClearChat}
              className="text-platinum-100 hover:text-white text-sm px-3 py-1 rounded transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="border-b border-platinum-200 p-4 bg-platinum-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-500 mb-2">
              AI Model
            </label>
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-500 mb-2">
              System Message
            </label>
            <input
              type="text"
              value={developerMessage}
              onChange={(e) => setDeveloperMessage(e.target.value)}
              placeholder="You are a helpful AI assistant."
              className="w-full px-3 py-2 border-2 border-platinum-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm text-navy-500 placeholder-platinum-400 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto chat-scroll">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-platinum-200 p-4 bg-platinum-50">
        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
