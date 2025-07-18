'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState("https://react.dev");
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/chat?sitemapurl=${encodeURIComponent(url)}`);
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-6">
      <pre className="text-green-300 text-3xl leading-none text-center whitespace-pre-wrap">
{`
  ██████╗  ██████╗  ██████╗███████╗     █████╗ ██╗
  ██╔══██╗██╔═══██╗██╔════╝██╔════╝    ██╔══██╗██║
  ██║  ██║██║   ██║██║     ███████╗    ███████║██║
  ██║  ██║██║   ██║██║     ╚════██║    ██╔══██║██║
  ██████╔╝╚██████╔╝╚██████╗███████║    ██║  ██║██║
  ╚═════╝  ╚═════╝  ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝
`}
      </pre>

      <p className="text-blue-400 text-lg mt-2">user@documentation-assistant</p>
      <p className="text-green-400 text-sm">$ ./chat-with-docs --interactive</p>

      <div className="mt-8 w-full max-w-2xl border border-green-500 rounded-md bg-[#0d0d0d]">
        <div className="px-4 py-2 text-green-400 border-b border-green-600">
          <span className="text-green-300">$</span> initialize-docs-chat
        </div>

        <div className="px-4 py-4 text-sm">
          <p className="text-gray-400">Loading documentation parser module...</p>

          <div className="mt-4">
            <p className="text-green-400">
              <span className="text-gray-400">URL:</span> target_documentation_source
            </p>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-[#1a1a1a] w-full p-3 mt-1 rounded-md text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleNavigate}
            className="mt-6 bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 text-sm"
          >
            🧠 ./execute --start-chat
          </button>
        </div>
      </div>
    </main>
  );
}
