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
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center">
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex justify-center w-full">
  <pre className="min-w-max text-green-300 text-xs sm:text-base md:text-3xl lg:text-4xl leading-none whitespace-pre">
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
        <p className="text-blue-400 text-xs sm:text-base">user@documentation-assistant</p>
        <p className="text-green-500 text-xs sm:text-sm">$ ./chat-with-docs --loading...</p>
      </div>
      <div className="w-full max-w-4xl border-2 sm:border-4 border-green-300 rounded-md bg-[#0d0d0d]">
        <div className="flex justify-center items-center p-6 sm:p-8">
          <div className="animate-pulse text-green-400 text-sm sm:text-base">Initializing chat session...</div>
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
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center">
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex justify-center w-full">
  <pre className="min-w-max text-green-300 text-xs sm:text-base md:text-3xl lg:text-4xl leading-none whitespace-pre">
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
        <p className="text-blue-400 text-xs sm:text-base">user@documentation-assistant</p>
        <p className="text-green-500 text-xs sm:text-sm">$ ./chat-with-docs --interactive</p>
      </div>

      <div className="w-full max-w-4xl border border-green-300  sm:border-4 rounded-md bg-[#0d0d0d]">
        <div className="flex flex-row gap-2 bg-[#090c14] border-b border-green-300 p-4 sm:p-6">
          <span className="text-green-400 text-xs sm:text-base">
            {`>_ `}docs<span className="text-cyan-400">@chat-session</span>
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scroll-smooth pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {messages.map((msg, index) => (
            <div key={index} className="text-xs sm:text-sm">
              {msg.role === "system" ? (
                <div className="bg-[#0f0f0f] inline-block m-1 p-2 sm:p-3 border-l-2 sm:border-l-4 border-green-500 rounded">
                  <p className="text-green-400 font-semibold text-xs sm:text-sm">
                    docs-ai<span className="text-gray-400">@system</span>
                  </p>
                  <MessageBubble
                    role="system"
                    content={msg.content}
                    sources={msg.sources}
                  />
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{msg.time}</p>
                </div>
              ) : (
                <div className="text-right">
                  <div className="bg-[#0f0f0f] inline-block p-2 sm:p-3 border-r-2 sm:border-r-4 border-blue-400 rounded">
                    <p className="text-white font-semibold text-xs sm:text-sm">
                      you<span className="text-gray-400">@user</span>
                    </p>
                    <MessageBubble role="user" content={msg.content} />
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{msg.time}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center justify-between font-mono py-1 sm:py-2 w-full text-green-300 text-xs sm:text-md">
              <span className="text-green-300">{`>_ `} [PROCESSING] Analyzing Documentation</span>
              <span className="text-green-300 animate-pulse font-extrabold mr-1 sm:mr-2">|||</span>
            </div>
          )}
        </div>

      <div className="border-t border-green-300 bg-[#101725] p-3 sm:py-5">
  <div className="flex flex-row items-center gap-2 border border-green-400 rounded-xl py-2 sm:py-3 bg-[#0d1117] w-full text-xs sm:text-sm">
    <span className="text-cyan-400 font-mono whitespace-nowrap text-xs sm:text-sm ml-2">user@docs $</span>
    <input
      type="text"
      placeholder="Enter your query here..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      className="bg-transparent focus:outline-none text-gray-400 w-full font-mono text-xs sm:text-base px-2"
    />
    <button
      onClick={handleSend}
      className="text-green-500 hover:text-green-300 ml-2 mr-2"
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
