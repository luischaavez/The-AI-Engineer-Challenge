"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import ApiKeyModal from "@/components/ApiKeyModal";

export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(true);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleApiKeyChange = () => {
    setShowApiKeyModal(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-platinum-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy-500 mb-2">
              AI Chat Interface
            </h1>
            <p className="text-navy-400 text-lg">
              Communicate with OpenAI models through your API
            </p>
          </header>

          {showApiKeyModal ? (
            <ApiKeyModal onSubmit={handleApiKeySubmit} />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 border border-platinum-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-navy-500 font-medium">
                    Connected to API
                  </span>
                </div>
                <button
                  onClick={handleApiKeyChange}
                  className="text-orange-600 hover:text-orange-700 text-sm underline"
                >
                  Change API Key
                </button>
              </div>

              {/* Chat Interface */}
              <div>
                <ChatInterface apiKey={apiKey} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
