import { Cloudinary } from "@cloudinary/url-gen/index";

const cloudinaryService = new Cloudinary({
    cloud: {
        cloudName: "rehocloud"
    }
})

export default cloudinaryService;