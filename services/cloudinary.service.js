import cloudinary from "../config/cloudinary.config.js";
import { v4 as uuidv4 } from "uuid";
import Upload from "../models/upload.model.js";
import dotenv from "dotenv";
dotenv.config();

// Generate signature
export const generateUploadSignature = async () => {
  const timestamp = Math.round(Date.now() / 1000);
  const formId = uuidv4();

  await Upload.create({ formId });

  const params = {
    timestamp,
    folder: "auction_system",
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET || process.env.cloudinary_api_secret,
  );

  return {
    ...params,
    signature,
    apiKey:
      process.env.CLOUDINARY_API_KEY || process.env.cloudinary_api_key,
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME || process.env.cloudinary_cloud_name,
    formId,
  };
};

// Save uploaded file info
export const saveUploadData = async (formId, public_id, secure_url) => {
  const upload = await Upload.findOneAndUpdate(
    { formId },
    { public_id, secure_url },
    { new: true },
  );

  if (!upload) {
    throw new Error("Invalid formId");
  }

  return upload;
};

// Mark upload as used
export const markUploadUsed = async (formId) => {
  const upload = await Upload.findOneAndUpdate(
    { formId },
    { status: "used" },
    { new: true },
  );

  if (!upload) {
    throw new Error("Upload not found");
  }

  return upload;
};
