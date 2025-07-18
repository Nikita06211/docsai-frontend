export function extractCodeBlocks(message: string): { lang: string; code: string }[] {
    console.log("extract Code Blocks");
  const blocks: { lang: string; code: string }[] = [];

  const codeBlockRegex =
    /(?:^|\n)([a-zA-Z]+)\s*\n+Copy\s*\n+Edit\s*\n+([\s\S]*?)(?:\n\[\d{2}:\d{2}:\d{2} [AP]M\])?(?=\n{2,}|$)/g;

  let match;
  while ((match = codeBlockRegex.exec(message)) !== null) {
    const lang = match[1].trim();
    const code = match[2].trim();
    blocks.push({ lang, code });
  }

  console.log("🧪 Extracted code blocks:", blocks);
  return blocks;
}
