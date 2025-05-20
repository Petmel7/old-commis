const supabase = require('../lib/supabase');

const BUCKET = process.env.SUPABASE_BUCKET_NAME;

/**
 * Upload image to Supabase Storage
 * @param {Buffer} fileBuffer
 * @param {string} filename
 * @returns {Promise<string>} public URL
 */
const uploadImage = async (fileBuffer, filename) => {
    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filename, fileBuffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/jpeg',
        });

    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    return getPublicUrl(filename);
};

/**
 * Get public URL from Supabase Storage
 * @param {string} filename
 * @returns {string} public URL
 */
const getPublicUrl = (filename) => {
    const { publicURL } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return publicURL;
};

module.exports = {
    uploadImage,
    getPublicUrl,
};

