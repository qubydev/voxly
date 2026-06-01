const { CHUNK_CHAR_LIMIT } = require('./config');

function splitText(text, maxLen = CHUNK_CHAR_LIMIT) {
  const chunks = [];
  let currentIdx = 0;

  while (currentIdx < text.length) {
    let end = currentIdx + maxLen;

    if (end >= text.length) {
      chunks.push(text.slice(currentIdx).trim());
      break;
    }

    let match = text.lastIndexOf('\n', end);

    if (match <= currentIdx) match = text.lastIndexOf('. ', end);
    if (match <= currentIdx) match = text.lastIndexOf(', ', end);
    if (match <= currentIdx) match = text.lastIndexOf(' ', end);
    if (match <= currentIdx) match = end;

    chunks.push(text.slice(currentIdx, match + 1).trim());
    currentIdx = match + 1;
  }

  return chunks.filter(c => c.length > 0);
}

module.exports = { splitText };