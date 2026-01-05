import { pipeline } from "@xenova/transformers";

let extractor = null;

export async function getEmbedding(text) {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  let embedding = output.data;

  // ✅ Flatten if nested
  if (Array.isArray(embedding[0])) {
    embedding = embedding.flat();
  }

  // ✅ Ensure it's actually an array of numbers
  embedding = embedding.map(x => Number(x));

  return embedding; // This is now a proper numeric array
}
