"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: [
        "[SYSTEM] Documentation successfully parsed from https://react.dev",
        "[STATUS] Ready for queries",
        "[INFO] You can now ask questions about the documentation",
      ].join("\n"),
      time: "[10:01:24 PM]",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, time: `[${time}]` },
      {
        role: "system",
        content: `\n[QUERY] "${input}"\n[RESULT] Based on the documentation analysis:\n\nuseEffect is a React Hook that lets you perform side effects in functional components.\n\n[CODE EXAMPLE]\n\`\`\`javascript\nimport React, { useEffect } from 'react';\n\`\`\``,
        time: `[${time}]`,
      },
    ]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-6">
      <div className="text-center mb-6">
        <pre className="text-green-300 text-4xl leading-none">
{`
██████╗  ██████╗  ██████╗███████╗     █████╗ ██╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝    ██╔══██╗██║
██║  ██║██║   ██║██║     ███████╗    ███████║██║
██║  ██║██║   ██║██║     ╚════██║    ██╔══██║██║
██████╔╝╚██████╔╝╚██████╗███████║    ██║  ██║██║
╚═════╝  ╚═════╝  ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝
`}
        </pre>
        <p className="text-blue-400">user@documentation-assistant</p>
        <p className="text-green-500 text-sm">$ ./chat-with-docs --interactive</p>
      </div>

      <div className="max-w-4xl mx-auto border border-green-500 rounded-md bg-[#0d0d0d]">
        <div className="flex justify-between items-center border-b border-green-500 p-2">
          <span className="text-green-400">
            docs<span className="text-cyan-400">@chat-session</span>
          </span>
          <button className="bg-amber-600 hover:bg-amber-500 text-black text-xs px-3 py-1 rounded">
            ⚡ ./flashcards
          </button>
        </div>

        <div className="p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="text-sm">
              {msg.role === "system" ? (
                <div className="bg-[#0f0f0f] p-3 border-l-4 border-green-500">
                  <p className="text-green-400">
                    docs-ai<span className="text-gray-400">@system</span>
                  </p>
                  <p className="whitespace-pre-wrap mt-1">{msg.content}</p>
                  <p className="text-gray-500 text-xs mt-1">{msg.time}</p>
                </div>
              ) : (
                <div className="text-right">
                  <div className="inline-block bg-[#002244] text-blue-300 p-3 rounded-md max-w-md">
                    <p className="text-white">{msg.content}</p>
                    <p className="text-gray-400 text-xs mt-1">{msg.time}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center border-t border-green-500 p-3 gap-2">
          <span className="text-blue-300">user@docs $</span>
          <input
            type="text"
            placeholder="Enter your query here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
          />
          <button
            onClick={handleSend}
            className="text-green-500 hover:text-green-300"
            aria-label="Send"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}