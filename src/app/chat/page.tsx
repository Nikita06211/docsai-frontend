"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {MessageBubble} from "../components/MessageBubble";
import axios from "axios";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const sitemapurl = searchParams.get("sitemapurl") || "https://react.dev/sitemap.xml";

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: [
        "[SYSTEM] Documentation successfully parsed from https://react.dev",
        "[STATUS] Ready for queries",
        "[INFO] You can now ask questions about the documentation",
      ].join("\n"),
      time: "[--:--:--]",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const userMessage = { role: "user", content: input, time: `[${time}]` };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.get(
        `https://falling-glade-5e06.prajjwalbh25.workers.dev/message?sitemapurl=${encodeURIComponent(
          sitemapurl!
        )}&query=${encodeURIComponent(input)}`
      );

      const botMessage = {
        role: "system",
        content: res.data.answer || "[ERROR] No message received from docs 🤖",
        time: `[${time}]`,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: "system",
        content: `[ERROR] Something went wrong.`,
        time: `[${time}]`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  // console.log("👀 Rendering ChatPage with messages:", messages.map(m => m.content));

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

      <div className="max-w-4xl mx-auto border-4 border-green-300 rounded-md bg-[#0d0d0d]">
        <div className="flex justify-between items-center bg-[#090c14] border-b border-green-300 p-6">
          <span className="text-green-400">
            {`>_ `}docs<span className="text-cyan-400">@chat-session</span>
          </span>
          <button className="bg-amber-600 hover:bg-amber-500 text-black text-xs px-3 py-1 rounded">
            ⚡ ./flashcards
          </button>
        </div>

      <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto scroll-smooth pr-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent scrollbar-thumb-rounded-full">

    {messages.map((msg, index) => (
      <div key={index} className="text-sm">
        {msg.role === "system" ? (
          <div className="bg-[#0f0f0f] p-3 border-l-4 border-green-500 rounded">
            <p className="text-green-400 font-semibold">
              docs-ai<span className="text-gray-400">@system</span>
            </p>
            <MessageBubble role="system" content={msg.content} />
            <p className="text-gray-500 text-xs mt-1">{msg.time}</p>
          </div>
        ) : (
          <div className="text-right">
            <div className="bg-[#0f0f0f] inline-block p-3 border-r-4 border-blue-400 rounded">
              <p className="text-white font-semibold">
                you<span className="text-gray-400">@user</span>
              </p>
              <MessageBubble role="user" content={msg.content} />
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
