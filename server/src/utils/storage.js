
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET_NAME;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const path = require('path');

const uploadImage = async (fileBuffer, originalName) => {
    const extension = path.extname(originalName);
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

    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(uniqueName);

    console.log('✅ Uploaded successfully:', data.publicUrl);

    return data.publicUrl;
};

module.exports = { uploadImage };
