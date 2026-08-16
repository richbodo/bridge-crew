export const MAX_SPOKEN_SENTENCES = 10;

export interface SpeechSplit {
  spoken: string;
  overflow: string;
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
}

/**
 * The spoken layer is short and list-free. Everything past the cap becomes
 * written overflow that lands in the full brief instead.
 */
export function enforceSpeechCap(text: string, cap = MAX_SPOKEN_SENTENCES): SpeechSplit {
  const flattened = text
    .split("\n")
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, ""))
    .join(" ");
  const sentences = splitSentences(flattened);
  if (sentences.length <= cap) {
    return { spoken: sentences.join(" "), overflow: "" };
  }
  return {
    spoken: sentences.slice(0, cap).join(" "),
    overflow: sentences.slice(cap).join(" "),
  };
}
