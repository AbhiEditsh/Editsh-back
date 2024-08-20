const imageUploadController = (req, res) => {
    if (req.file) {
      return res.status(200).json({
        url: req.file.path,
        public_id: req.file.filename,
        message: "Image uploaded successfully",
      });
    } else {
      return res.status(400).json({
        message: "Failed to upload image",
      });
    }
  };
  
  module.exports = { imageUploadController };
  