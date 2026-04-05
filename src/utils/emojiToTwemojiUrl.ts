export function emojiToTwemojiUrl(emojiString: string): string {
  const codePoints = Array.from(emojiString)
    .map(char => (char.codePointAt(0) ?? 0).toString(16))
    .join('-');

  // Remove FE0F (variation selector)
  const cleanedCodePoints = codePoints.replace(/-fe0f/gi, '');

  const url = `https://twemoji.maxcdn.com/2/svg/${cleanedCodePoints}.svg`;

  return url;
}
