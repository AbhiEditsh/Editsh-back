const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dmvyyzzcq',
    api_key: '616668248186428',
    api_secret: '_Dt95ErcuHtKsKiWf0N5fnQHKgo'
});

const imageUploadController = async (req, res) => {
    try {
        const fileType = req.file.mimetype.split('/')[1];
        const resourceType = fileType === 'pdf' ? 'raw' : 'image';

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: resourceType
        });

        fs.unlinkSync(req.file.path);

        res.json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { imageUploadController };
