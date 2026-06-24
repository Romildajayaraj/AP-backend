import express from "express";
import { getUploadSignature } from "../controllers/cloudinary.controller.js";
import { secureRoute } from "../middleware/auth.middleware.js";

const Cloudinaryrouter = express.Router();

// Upload signature is public for local dev; authentication can be enforced if needed
Cloudinaryrouter.get("/signature", getUploadSignature);

export default Cloudinaryrouter;
