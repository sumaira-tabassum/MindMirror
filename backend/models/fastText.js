import cosineSimilarity from "compute-cosine-similarity";

// Convert text → simplified "FastText-like" vector
export function getFastTextEmbedding(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .slice(0, 300);

  const vector = {};
  for (const word of words) vector[word] = (vector[word] || 0) + 1;

  return vector;
}

// Convert two vectors → numeric arrays
export function toNumericVectors(v1, v2) {
  const allKeys = new Set([...Object.keys(v1), ...Object.keys(v2)]);
  const a = [];
  const b = [];
  for (const key of allKeys) {
    a.push(v1[key] || 0);
    b.push(v2[key] || 0);
  }
  return [a, b];
}

// Compute similarity
export function computeSimilarity(text1, text2) {
  const vec1 = getFastTextEmbedding(text1);
  const vec2 = getFastTextEmbedding(text2);
  const [a, b] = toNumericVectors(vec1, vec2);
  return cosineSimilarity(a, b);
}
