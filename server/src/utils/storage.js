// const supabase = require('../lib/supabase');

// const BUCKET = process.env.SUPABASE_BUCKET_NAME;

// /**
//  * Upload image to Supabase Storage
//  * @param {Buffer} fileBuffer
//  * @param {string} filename
//  * @returns {Promise<string>} public URL
//  */
// const uploadImage = async (fileBuffer, filename) => {
//     const { error } = await supabase.storage
//         .from(BUCKET)
//         .upload(filename, fileBuffer, {
//             cacheControl: '3600',
//             upsert: false,
//             contentType: 'image/jpeg',
//         });

//     if (error) {
//         throw new Error(`Upload failed: ${error.message}`);
//     }

//     return getPublicUrl(filename);
// };

// /**
//  * Get public URL from Supabase Storage
//  * @param {string} filename
//  * @returns {string} public URL
//  */
// const getPublicUrl = (filename) => {
//     const { publicURL } = supabase.storage.from(BUCKET).getPublicUrl(filename);
//     return publicURL;
// };

// module.exports = {
//     uploadImage,
//     getPublicUrl,
// };



// src/utils/storage.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET_NAME;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * Uploads an image to Supabase Storage.
 * @param {Buffer} fileBuffer - The image file buffer.
 * @param {string} filename - The name to save the file as.
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
// const uploadImage = async (fileBuffer, filename) => {
//     const { data, error } = await supabase.storage
//         .from(BUCKET)
//         .upload(filename, fileBuffer, {
//             cacheControl: '3600',
//             upsert: false,
//             contentType: 'image/jpeg',
//         });

//     if (error) {
//         throw new Error(`Upload failed: ${error.message}`);
//     }

//     const { data: publicUrlData } = supabase.storage
//         .from(BUCKET)
//         .getPublicUrl(filename);

//     return publicUrlData.publicUrl;
// };

const path = require('path');

const uploadImage = async (fileBuffer, originalName) => {
    const extension = path.extname(originalName); // .jpg / .png
    const baseName = path.basename(originalName, extension);
    const uniqueName = `${Date.now()}-${baseName}${extension}`;

    console.log('➡️ Final filename for upload:', uniqueName);

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(uniqueName, fileBuffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/jpeg',
        });

    if (error) {
        console.error('❌ Supabase upload error:', error.message);
        throw new Error(error.message);
    }

    const { publicURL } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(uniqueName);

    return publicURL;
};

module.exports = { uploadImage };
