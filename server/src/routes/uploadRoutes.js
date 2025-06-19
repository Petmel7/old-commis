
const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../utils/storage');

const router = express.Router();
const upload = multer();

router.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            console.log('❌ No file provided in request.');
            return res.status(400).json({ error: 'No image file provided' });
        }

        const { buffer, originalname } = req.file;
        console.log('✅ Received file:', originalname, 'Size:', buffer.length);

        const url = await uploadImage(buffer, originalname);

        console.log('✅ Uploaded successfully:', url);
        res.status(200).json({ url });
    } catch (err) {
        console.error('🔥 Upload failed:', err.message, err.stack);
        res.status(500).json({ error: 'Upload failed' });
    }
});

module.exports = router;
