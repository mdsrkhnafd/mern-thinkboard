import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// Routes (rate limiter sirf API par)
app.use("/api", ratelimiter);
app.use("/api/auth", authRoutes); // /api/notes wali line se pehle
app.use("/api/notes", noteRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server ONLY after MongoDB connects
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
