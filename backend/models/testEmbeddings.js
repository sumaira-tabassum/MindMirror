// testEmbedding.js
import { getEmbedding } from "./sentenceBert.js"; // make sure the path is correct

async function test() {
  try {
    const sampleText = "This is a test sentence for embeddings.";

    const emb = await getEmbedding(sampleText);

    console.log("Raw embedding output:", emb);
    console.log("Type of embedding:", typeof emb);

    // If it is a string, try converting it to an array
    let embArray = emb;
    if (typeof emb === "string") {
      // remove newlines and extra spaces
      embArray = emb.replace(/\n/g, "").split(",").map(Number);
    }

    console.log("Processed embedding (numeric array):", embArray);
    console.log("Is array:", Array.isArray(embArray));
    console.log("Array length:", embArray.length);
    console.log("First 10 values:", embArray.slice(0, 10));

  } catch (error) {
    console.error("❌ Error in testEmbedding.js:", error);
  }
}

test();
