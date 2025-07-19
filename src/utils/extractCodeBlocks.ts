export function extractCodeBlocks(message: string): { lang: string; code: string }[] {
  console.log("extract Code Blocks");

  const blocks: { lang: string; code: string }[] = [];

  // Match code blocks like ```js\ncode\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let match;
  while ((match = codeBlockRegex.exec(message)) !== null) {
    const lang = match[1]?.trim() || "plaintext";
    const code = match[2].trim();
    blocks.push({ lang, code });
  }

  return blocks;
}