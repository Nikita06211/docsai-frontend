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
    <main className="min-h-screen bg-black text-green-400 font-mono">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex justify-center w-full overflow-hidden">
            <pre className="text-green-300 text-[8px] sm:text-xs md:text-lg lg:text-xl leading-none whitespace-pre max-w-full">
{`
██████╗  ██████╗  ██████╗███████╗     █████╗ ██╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝    ██╔══██╗██║
██║  ██║██║   ██║██║     ███████╗    ███████║██║
██║  ██║██║   ██║██║     ╚════██║    ██╔══██║██║
██████╔╝╚██████╔╝╚██████╗███████║    ██║  ██║██║
╚═════╝  ╚═════╝  ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝
`}
            </pre>
          </div>
          <p className="text-blue-400 text-xs sm:text-base mt-1 sm:mt-2">user@documentation-assistant</p>
          <p className="text-green-500 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">$ ./chat-with-docs --loading...</p>
        </div>
        <div className="bg-[#0d0d0d] rounded-lg p-4 sm:p-6 md:p-8">
          <div className="flex justify-center items-center">
            <div className="animate-pulse text-green-400 text-xs sm:text-sm">Initializing chat session...</div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Chat content component
function ChatContent() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const sitemapurl = searchParams.get("sitemapurl") || "https://nextjs.org/sitemap.xml";
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: [
        `[SYSTEM] Documentation successfully parsed from ${sitemapurl}`,
        "[STATUS] Ready for queries",
        "[INFO] You can now ask questions about the documentation",
      ].join("\n"),
      time: "[--:--:--]",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
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
    <main className="min-h-screen bg-black text-green-400 font-mono">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex justify-center w-full overflow-hidden">
            <pre className="text-green-300 text-[8px] sm:text-xs md:text-lg lg:text-xl leading-none whitespace-pre max-w-full">
{`
██████╗  ██████╗  ██████╗███████╗     █████╗ ██╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝    ██╔══██╗██║
██║  ██║██║   ██║██║     ███████╗    ███████║██║
██║  ██║██║   ██║██║     ╚════██║    ██╔══██║██║
██████╔╝╚██████╔╝╚██████╗███████║    ██║  ██║██║
╚═════╝  ╚═════╝  ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝
`}
            </pre>
          </div>
          <p className="text-blue-400 text-xs sm:text-base mt-1 sm:mt-2">user@documentation-assistant</p>
          <p className="text-green-500 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">$ ./chat-with-docs --interactive</p>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex flex-row gap-2 bg-[#090c14] border-b border-green-300/30 px-3 sm:px-6 py-2 sm:py-4 rounded-t-lg">
            <span className="text-green-400 text-xs sm:text-sm">
              {`>_ `}docs<span className="text-cyan-400">@chat-session</span>
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 bg-[#0d0d0d]">
            {messages.map((msg, index) => (
              <div key={index} className="text-xs sm:text-sm">
                {msg.role === "system" ? (
                  <div className="bg-[#0f0f0f] w-full sm:inline-block p-2 sm:p-3 md:p-4 border-l-2 border-green-500/60 rounded-r-md">
                    <p className="text-green-400 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                      docs-ai<span className="text-gray-400">@system</span>
                    </p>
                    <MessageBubble
                      role="system"
                      content={msg.content}
                      sources={msg.sources}
                    />
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1 sm:mt-2">{msg.time}</p>
                  </div>
                ) : (
                  <div className="text-right">
                    <div className="bg-[#0f0f0f] w-full sm:inline-block p-2 sm:p-3 md:p-4 border-r-2 border-blue-400/60 rounded-l-md">
                      <p className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                        you<span className="text-gray-400">@user</span>
                      </p>
                      <MessageBubble role="user" content={msg.content} />
                      <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">{msg.time}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center justify-between font-mono py-2 sm:py-3 w-full text-green-300 text-xs sm:text-sm">
                <span className="text-green-300 truncate pr-2">{`>_ `} [PROCESSING] Analyzing Documentation</span>
                <span className="text-green-300 animate-pulse font-extrabold flex-shrink-0">|||</span>
              </div>
            )}
          </div>

          <div className="border-t border-green-300/30 bg-[#101725] p-2 sm:p-4 md:p-6 rounded-b-lg">
            <div className="flex flex-row items-center gap-1.5 sm:gap-2 md:gap-3 border border-green-400/40 rounded-lg py-2 sm:py-3 px-2 sm:px-3 md:px-4 bg-[#0d1117] w-full transition-all hover:border-green-400/60 focus-within:border-green-400/80">
              <span className="text-cyan-400 font-mono whitespace-nowrap text-[10px] sm:text-xs md:text-sm flex-shrink-0">user@docs $</span>
              <input
                type="text"
                placeholder="Enter your query here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-transparent focus:outline-none text-gray-300 w-full font-mono text-xs sm:text-sm px-1 sm:px-2 placeholder:text-gray-600"
              />
              <button
                onClick={handleSend}
                className="text-green-500 hover:text-green-300 transition-colors ml-1 sm:ml-2 flex-shrink-0 touch-manipulation"
                aria-label="Send"
              >
                <SendHorizonal size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
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
