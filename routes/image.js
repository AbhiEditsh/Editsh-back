const express = require("express");
const multer = require("multer");
const { imageUploadController } = require("../controller/imageUpload");

const Router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg, .jpeg, and .pdf formats are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

Router.post("/upload-image", upload.single("image"), imageUploadController);

module.exports = Router;
