import supabase from "../services/supabaseService";

const uploadFilesToSupabase = async (files) => {
    const fileUrls = [];

    for (const file of files) {
        // Skip empty files
        if (file.size === 0) {
            console.warn(`Skipping empty file: ${file.name}`);
            continue;
        }
        
        const fileName = `${Date.now()}_${file.name}`; // Unique file name
        const { data, error } = await supabase.storage
            .from(import.meta.env.VITE_SUPABASE_BUCKET_NAME) // Replace with your bucket name
            .upload(`posts/${fileName}`, file); // Path in the bucket

        if (error) {
            throw new Error(`Failed to upload ${file.name}: ${error.message}`);
        }

        // Get public URL for the uploaded file
        const { publicUrl } = supabase.storage
            .from(import.meta.env.VITE_SUPABASE_BUCKET_NAME)
            .getPublicUrl(`posts/${fileName}`);

        fileUrls.push(publicUrl);
    }

    return fileUrls;
};

export {
    uploadFilesToSupabase
}