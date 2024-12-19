import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'; //fs->file system , to perform crud operations on files

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary=async(localFilePath)=>{
  try{
    if(!localFilePath) return null;
    //upload the file on cloudinary
    const response=await cloudinary.uploader(localFilePath,{
      resource_type:"auto",
    });
    console.log("File uploaded on cloudinary",response.url);
    return response;

  }
  catch(error){
    fs.unlinkSync(localFilePath); //clean up the locally saved temporary files as the upload operation got failed
    console.log("Error while uploading file on cloudinary",error);
    return null;
  }
}



//direct method
// cloudinary.v2.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            },
//            function(error, result) {
//                console.log(result, error);
//            }
//        )

export {uploadOnCloudinary}