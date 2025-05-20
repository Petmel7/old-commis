// const express = require('express');
// const multer = require('multer');
// const { uploadImage } = require('../utils/storage');

// const router = express.Router();
// const upload = multer(); // в оперативну пам’ять

// router.post('/upload-image', upload.single('image'), async (req, res) => {
//     try {
//         const { originalname, buffer } = req.file;
//         const url = await uploadImage(buffer, originalname);
//         res.status(200).json({ url });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;



// const express = require('express');
// const multer = require('multer');
// const { uploadImage } = require('../utils/storage');

// const router = express.Router();
// const upload = multer();

// router.post('/api/upload-image', upload.single('image'), async (req, res) => {
//     try {
//         const fileBuffer = req.file.buffer;
//         const filename = req.file.originalname;

//         const publicUrl = await uploadImage(fileBuffer, filename);

//         res.status(200).json({ url: publicUrl });
//     } catch (error) {
//         console.error('Upload error:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;




const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../utils/storage');

const router = express.Router();
const upload = multer();

router.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        const { buffer, originalname } = req.file;
        const url = await uploadImage(buffer, originalname);
        res.status(200).json({ url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

module.exports = router;
