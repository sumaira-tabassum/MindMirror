// server.js (ESM version)
import express from "express";
import cors from "cors";
import compareRoute from "./routes/compare.js"; // Note the .js extension in ESM

const app = express();
const port = 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- ROUTES ----------
app.use("/compare", compareRoute);

// ---------- SERVER ----------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
