const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
require("dotenv").config();

const Router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Multer storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(file.mimetype.toLowerCase());

    if (extname) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, .jpeg, and .pdf formats are allowed!"));
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

// Upload image to Cloudinary
Router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        public_id: Date.now() + "-" + req.file.originalname,
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Error uploading image to Cloudinary", error });
        }
        res.status(200).json({
          url: result.secure_url,
          public_id: result.public_id,
          message: "Image uploaded successfully",
        });
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);

  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = Router;
