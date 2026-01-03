import express from "express";
const router = express.Router();

import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import cosineSimilarity from "compute-cosine-similarity";

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
router.post(
  "/",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    try {
      const file1 = req.files?.file1?.[0];
      const file2 = req.files?.file2?.[0];

      if (!file1 || !file2) {
        return res.status(400).json({ error: "Both files are required" });
      }

      const text1 = await extractText(file1);
      const text2 = await extractText(file2);

      const vec1 = textToVector(text1);
      const vec2 = textToVector(text2);

      const [a, b] = toNumericVectors(vec1, vec2);
      const similarity = cosineSimilarity(a, b);

      res.json({
        model: "Basic Text Similarity",
        similarityScore: Number((similarity * 100).toFixed(2)),
      });

    } catch (error) {
      console.error("❌ Compare error:", error.message);
      res.status(500).json({ error: "Comparison failed" });
    }
  }
);

// ESM export
export default router;
