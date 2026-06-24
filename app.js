import express from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import {
  authRoutes,
  userRoutes,
  auctionRoutes,
  contactRoutes,
  adminRoutes,
  cloudinaryRoutes,
} from "./routes/index.js";

import  connectDB  from "./config/db.config.js";
import cron from "node-cron";
import { cleanupUnusedUploads } from "./jobs/cleanupUploads.js";

export const app = express();

// Middleware
const allowedOrigins = [
process.env.ORIGIN,
"http://localhost:5173",
"http://localhost:5174",
"https://biddingnest.netlify.app"
].filter(Boolean);

app.use(cors({
origin: function (origin, callback) {
// Allow requests with no origin (Postman, mobile apps)
if (!origin) return callback(null, true);

if (allowedOrigins.includes(origin)) {
  return callback(null, true);
}

console.log("❌ Blocked by CORS:", origin); // debug
return callback(new Error("CORS not allowed"));

},
credentials: true,
}));

app.use(cookieParser());
app.use(compression());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auction API is running...");
});

// ❌ REMOVE this block (not needed now)
// if (process.env.VERCEL) {
//   app.use(async (req, res, next) => {
//     await connectDB();
//     next();
//   });
// }

// Cron job
let isRunning = false;

cron.schedule("0 0 * * *", async () => {
  if (isRunning) return;

  isRunning = true;

  try {
    await cleanupUnusedUploads();
  } catch (err) {
    console.error(err);
  } finally {
    isRunning = false;
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", cloudinaryRoutes);

export default app;