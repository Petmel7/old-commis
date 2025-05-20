const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../utils/storage');

const router = express.Router();
const upload = multer(); // в оперативну пам’ять

router.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        const url = await uploadImage(buffer, originalname);
        res.status(200).json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
