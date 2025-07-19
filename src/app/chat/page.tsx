"use client";

import { useState, Suspense } from "react";
import { SendHorizonal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MessageBubble } from "../components/MessageBubble";
import axios from "axios";

// Type definitions
interface Source {
  id: number;
  url: string;
}

interface Message {
  role: "system" | "user";
  content: string;
  time: string;
  sources?: Source[];
}

// Loading component for Suspense fallback
function ChatLoading() {
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
        <p className="text-green-500 text-sm">$ ./chat-with-docs --loading...</p>
      </div>
      <div className="max-w-4xl mx-auto border-4 border-green-300 rounded-md bg-[#0d0d0d]">
        <div className="flex justify-center items-center p-8">
          <div className="animate-pulse text-green-400">Initializing chat session...</div>
        </div>
      </div>
    </main>
  );
}

// Chat content component that uses useSearchParams
function ChatContent() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const sitemapurl = searchParams.get("sitemapurl") || "https://react.dev/sitemap.xml";

  const [messages, setMessages] = useState<Message[]>([
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const userMessage: Message = { role: "user", content: input, time: `[${time}]` };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.get(
        `https://cold-star-f7e1.prajjwalbh25.workers.dev/message?siteMapUrl=${encodeURIComponent(
          sitemapurl
        )}&query=${encodeURIComponent(input)}`
      );

      const botMessage: Message = {
        role: "system",
        content: res.data.answer.response || "[ERROR] No message received from docs 🤖",
        time: `[${time}]`,
        sources: res.data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: `[ERROR] Something went wrong.`,
          time: `[${time}]`,
        } as Message,
      ]);
    }

    setInput("");
    setLoading(false);
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
                  <MessageBubble 
                    role="system" 
                    content={msg.content} 
                    sources={msg.sources} 
                  />
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

          {loading && (
            <div className="flex items-center justify-between font-mono py-2 w-full text-green-300">
              <span className="text-green-300 text-md">{`>_ `} [PROCESSING] Analyzing Documentation</span>
              <span className="text-green-300 animate-pulse font-extrabold mr-2 text-md">|||</span>
            </div>
          )}
        </div>

        <div className="border-t border-green-300 bg-[#101725] px-5 py-5">
          <div className="flex items-center border border-green-400 rounded-xl px-4 py-3 bg-[#0d1117] w-full text-sm text-white">
            <div className="flex items-center gap-2 flex-grow">
              <span className="text-cyan-400 font-mono whitespace-nowrap">user@docs $</span>
              <input
                type="text"
                placeholder="Enter your query here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-transparent focus:outline-none text-gray-400 w-full font-mono"
              />
            </div>

            <button
              onClick={handleSend}
              className="text-green-500 hover:text-green-300 ml-4"
              aria-label="Send"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatContent />
    </Suspense>
  );
}