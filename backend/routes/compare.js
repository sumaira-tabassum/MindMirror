import express from "express";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import cosineSimilarity from "compute-cosine-similarity";
import { getEmbedding } from "../models/sentenceBert.js";
import { computeSimilarity } from "../models/fastText.js";

// ---------- FILE UPLOAD ----------
const upload = multer({ dest: "temp/" });

async function extractText(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (ext === "txt") {
    return fs.readFileSync(file.path, "utf-8");
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: file.path });
    return result.value;
  }

  if (ext === "pdf") {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length < 20) {
      throw new Error("PDF contains no readable text");
    }

    return data.text;
  }

  throw new Error("Unsupported file type");
}

// ---------- SIMPLE TEXT → VECTOR ----------
function textToVector(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .slice(0, 300);

  const vector = {};

  for (const word of words) {
    vector[word] = (vector[word] || 0) + 1;
  }

  return vector;
}

// ---------- COSINE PREP ----------
function toNumericVectors(v1, v2) {
  const allKeys = new Set([...Object.keys(v1), ...Object.keys(v2)]);

  const a = [];
  const b = [];

  for (const key of allKeys) {
    a.push(v1[key] || 0);
    b.push(v2[key] || 0);
  }

  return [a, b];
}

// ---------- ROUTE ----------
// Handles both one-to-one and reference-based comparison for Transformer & FastText
router.post(
  "/",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    try {
      const refFile = req.files?.file1?.[0];           // reference / first file
      const compFiles = req.files?.file2 || [];        // comparison files (can be 1 or more)

      if (!refFile || compFiles.length === 0) {
        return res.status(400).json({ error: "Files are required" });
      }

      const selectedModel = req.body.model;
      const isReferenceBased = compFiles.length > 1;

      // Extract reference file text once
      const refText = await extractText(refFile);

      // ---------- TRANSFORMER ----------
      if (selectedModel === "Transformer Semantic Model (Advanced)") {

        if (isReferenceBased) {
          const refEmbedding = await getEmbedding(refText);
          const results = [];

          for (const file of compFiles) {
            const compText = await extractText(file);
            const compEmbedding = await getEmbedding(compText);

            const similarity = cosineSimilarity(
              Array.from(refEmbedding),
              Array.from(compEmbedding)
            );

            results.push({
              pair: `${refFile.originalname} vs ${file.originalname}`,
              similarity: Number((similarity * 100).toFixed(2)),
            });
          }

          return res.json({ results });
        }

        // one-to-one transformer
        const embedding1 = Array.from(await getEmbedding(refText));
        const embedding2 = Array.from(await getEmbedding(await extractText(compFiles[0])));
        const similarity = cosineSimilarity(embedding1, embedding2);

        return res.json({
          pair: `${refFile.originalname} vs ${compFiles[0].originalname}`,
          similarity: Number((similarity * 100).toFixed(2)),
        });

      } 
      // ---------- FASTTEXT ----------
      else if (selectedModel === "FastText Similarity (Basic)") {
  if (isReferenceBased) {
    const results = [];
    for (const file of compFiles) {
      const compText = await extractText(file);
      const similarity = computeSimilarity(refText, compText);

      results.push({
        pair: `${refFile.originalname} vs ${file.originalname}`,
        similarity: Number((similarity * 100).toFixed(2)),
      });
    }
    return res.json({ results });
  }

  // One-to-one FastText
  const similarity = computeSimilarity(refText, await extractText(compFiles[0]));
  return res.json({
    pair: `${refFile.originalname} vs ${compFiles[0].originalname}`,
    similarity: Number((similarity * 100).toFixed(2)),
  });
}
      else {
        return res.status(400).json({ error: "Selected model not supported" });
      }

    } catch (error) {
      console.error("❌ Compare error:", error.message);
      res.status(500).json({ error: "Comparison failed: " + error.message });
    }
  }
);

// ESM Export
export default router;