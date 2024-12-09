import supabase from "../services/supabaseService";

async function uploadFilesToBucket(files) {
    const uploadPromises = Array.from(files).map(async (file) => {
        const filePath = `uploads/${file.name}`; // You can customize the folder structure
        const { data, error } = await supabase.storage
            .from(import.meta.env.VITE_SUPABASE_BUCKET_NAME)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false, // Prevent overwriting files with the same name
            });

        if (error) {
            console.error(`Error uploading ${file.name}:`, error.message);
            return { success: false, file: file.name, error: error.message };
        }

        console.log(`Uploaded ${file.name} successfully:`, data);
        return { success: true, file: file.name };
    });

    return Promise.all(uploadPromises);
}

export {
    uploadFilesToBucket
}