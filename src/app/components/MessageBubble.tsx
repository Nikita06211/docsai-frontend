"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { extractCodeBlocks } from "../../utils/extractCodeBlocks";
import { ExternalLink } from "lucide-react";

import React from "react";

interface MessageBubbleProps {
  role: "user" | "system";
  content: string;
  sources?: {id: number, url: string}[]
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, sources }) => {
  const isUser = role === "user";
  const codeBlocks = extractCodeBlocks(content);

  let currentIndex = 0;
  const parts: React.ReactNode[] = [];

  codeBlocks.forEach((block, idx) => {
    const blockStart = content.indexOf(block.code, currentIndex);
    const before = content.slice(currentIndex, blockStart);
    currentIndex = blockStart + block.code.length;

    // Push normal text
    if (before.trim()) {
      parts.push(
        <p key={`text-${idx}`} className="mb-2 whitespace-pre-wrap">
          {before.trim()}
        </p>
      );
    }

    // Push code block
    parts.push(
      <div key={`code-${idx}`} className="my-2 rounded-xl border-2 shadow-cyan-600 border-cyan-700 text-green-300 overflow-hidden">
        <div className="bg-[#1f2937] flex items-center justify-between w-full border border-cyan-700 px-4 py-2 rounded-t-md">
            <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                <span className="ml-4 text-cyan-500">{block.lang}</span>
            </div>
            <span className="text-cyan-500">{`>_`}</span>
        </div>
        <SyntaxHighlighter
          language={block.lang}
          style={{}}
          customStyle={{
            margin: 0,
            borderRadius: '0.75rem',
            padding: '1rem',
            background: 'black',
            shadow:"cyan-600"
          }}
        >
          {block.code}
        </SyntaxHighlighter>
      </div>
    );
  });

  // Push remaining content (if any)
  if (currentIndex < content.length) {
    parts.push(
      <p key={`text-final`} className="whitespace-pre-wrap">
        {content.slice(currentIndex).trim()}
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl p-4 my-2 text-sm max-w-3xl ${
        isUser ? 'ml-auto bg-[#0d0d0d] text-green-500' : 'mr-auto bg-[#0d0d0d] text-green-500'
      }`}
    >
      {parts}
      {!isUser && (
        <>
        <hr className="w-full mt-15 mb-5 border-0.1 border-green-300"></hr>
        {sources && sources.length>0 && (
          <div className="mt-2 text-sm text-green-700 space-y-1">
        <div className="font-semibold text-green-500">📚 [SOURCES]:</div>
        {sources.map((src) => (
          <a
            key={src.id}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-400 underline hover:text-gray-300"
          >
            <ExternalLink size={16} className="inline mx-2" />
            <span className="font-light text-xs">{src.url}</span>
          </a>
        ))}
      </div>
        )}
        </>
      )}
    </div>
  );
};
