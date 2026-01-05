import express from "express";
import cors from "cors";
import compareRoute from "./routes/compare.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/compare", compareRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
