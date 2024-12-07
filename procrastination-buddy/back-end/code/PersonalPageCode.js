// Path to currrent user's images folder
const bucketName = 'user_motivational_content';

// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';
import path from 'node:path';

// Creates a client
const storage = new Storage();

// Retrieves images of current user
export async function getImages(prefix) {
  // Path to current user's folder
  const options = {
    prefix: prefix,
  };

  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles(options);

  // Array of image files
  var current_user_images_arr = [];

  // Iterates through each image of current user
  files.forEach(file => {
    if(file.name !== `${options.prefix}/`){
      let file_path = `https://storage.googleapis.com/${bucketName}/${file.name}`
      
      // Object to push to current user's images object
      let push_current_user_images_obj = {
        file: "",
        public_url: "" 
      }

      // Fill current image object
      push_current_user_images_obj.file = file.name
      push_current_user_images_obj.public_url = file_path

      console.log(push_current_user_images_obj)

      // Push current image's object to current user's images object
      current_user_images_arr.push(push_current_user_images_obj)
    }
  });

  // Returns array of images in current user's folder
  return current_user_images_arr
}

// Current user will be able to upload image
export async function uploadImage(){

}

// Current user will be able to delete image from their images folder
export async function deleteImage(prefix, image){
  // Path to current user's folder
  const options = {
    prefix: prefix,
  };

  await storage.bucket(bucketName).file(image).delete();

  const new_user_image_arr = await getImages(prefix)
  return new_user_image_arr
}

// getImages("dylanchao64@gmail.com")
// deleteImage("dylanchao64@gmail.com", "dylanchao64@gmail.com/ProcrastinationQuote3.png")