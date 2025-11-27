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
        <p key={`text-${idx}`} className="mb-2 sm:mb-3 whitespace-pre-wrap text-green-300 leading-relaxed text-xs sm:text-sm break-words">
          {before.trim()}
        </p>
      );
    }

    // Push code block
    parts.push(
      <div key={`code-${idx}`} className="my-2 sm:my-3 rounded-lg border border-cyan-700/50 text-green-300 overflow-x-auto bg-[#0a0a0a]">
        <div className="bg-[#1a1a1a] flex items-center justify-between w-full border-b border-cyan-700/30 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></span>
                <span className="ml-2 sm:ml-3 text-cyan-400 text-[10px] sm:text-xs font-mono">{block.lang}</span>
            </div>
            <span className="text-cyan-400/60 text-[10px] sm:text-xs">{`>_`}</span>
        </div>
        <SyntaxHighlighter
          language={block.lang}
          style={{}}
          customStyle={{
            margin: 0,
            padding: '0.75rem',
            background: '#0a0a0a',
            fontSize: '0.75rem',
            lineHeight: '1.4'
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
      <p key={`text-final`} className="whitespace-pre-wrap text-green-300 leading-relaxed text-xs sm:text-sm break-words">
        {content.slice(currentIndex).trim()}
      </p>
    );
  }

  return (
    <div
      className={`rounded-lg p-2 sm:p-3 my-1 sm:my-2 text-xs sm:text-sm w-full sm:max-w-4xl ${
        isUser ? 'sm:ml-auto bg-[#0d0d0d] text-green-400' : 'sm:mr-auto bg-[#0d0d0d] text-green-400'
      }`}
    >
      {parts}
      {!isUser && (
        <>
          {sources && sources.length > 0 && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-300/20">
              <div className="text-[10px] sm:text-xs font-semibold text-green-500 mb-1.5 sm:mb-2">[SOURCES]:</div>
              <div className="space-y-1 sm:space-y-1.5">
                {sources.map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-green-400 transition-colors text-[10px] sm:text-xs touch-manipulation"
                  >
                    <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    <span className="font-light truncate break-all">{src.url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
