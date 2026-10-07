/**
 * Estimate AI token budget for the scaffolded project.
 * Uses a simple heuristic: ~4 chars per token (GPT/Claude average for code).
 */
export function estimateBudget(dnaContent, contracts) {
  const CHARS_PER_TOKEN = 4;

  const dnaTokens = Math.ceil(dnaContent.length / CHARS_PER_TOKEN);

  let contractChars = 0;
  for (const content of Object.values(contracts)) {
    contractChars += content.length;
  }
  const contractTokens = Math.ceil(contractChars / CHARS_PER_TOKEN);

  // Estimate full codebase tokens based on typical template sizes
  const codebaseTokens = estimateCodebaseTokens(dnaTokens, contractTokens);

  return {
    dna: roundToNearest(dnaTokens, 10),
    contracts: roundToNearest(contractTokens, 10),
    codebase: roundToNearest(codebaseTokens, 100),
  };
}

function estimateCodebaseTokens(dnaTokens, contractTokens) {
  // Full codebase is typically 8-12x the size of DNA + contracts
  // This is a conservative estimate based on typical scaffolded projects
  const aiTokens = dnaTokens + contractTokens;
  return Math.max(aiTokens * 10, 3000);
}

function roundToNearest(value, nearest) {
  return Math.ceil(value / nearest) * nearest;
}
