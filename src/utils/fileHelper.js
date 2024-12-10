import supabase from "../services/supabaseService";

const uploadFilesToSupabase = async (files) => {
    const fileUrls = [];
    const bucketName = import.meta.env.VITE_SUPABASE_BUCKET_NAME; // Ensure this is correctly set in your environment variables

    for (const file of files) {
        // Skip empty files
        if (file.size === 0) {
            console.warn(`Skipping empty file: ${file.name}`);
            continue;
        }

        const fileName = `${Date.now()}_${file.name}`; // Unique file name

        // Upload the file to Supabase storage
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(`posts/${fileName}`, file); // Path in the bucket

        if (error) {
            throw new Error(`Failed to upload ${file.name}: ${error.message}`);
        }

        // Generate the public URL
        const { data: publicUrlData, error: urlError } = supabase.storage
            .from(bucketName)
            .getPublicUrl(`posts/${fileName}`);

        if (urlError) {
            console.error(`Error generating public URL for ${fileName}:`, urlError.message);
            throw new Error(`Error generating public URL for ${fileName}`);
        }

        fileUrls.push(publicUrlData.publicUrl);
    }

    return fileUrls;
};


export {
    uploadFilesToSupabase
}