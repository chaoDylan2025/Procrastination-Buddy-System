// Path to currrent user's images folder
const bucketName = 'user_motivational_content';

// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';
import path from 'node:path';

// Creates a client
const storage = new Storage();

// Array of image files
var current_user_images_arr = [];

// Retrieves images of current user
export async function getImages(prefix) {
  // Path to current user's images folder
  const options = {
    prefix: prefix,
  };
  options.delimiter = "/";

  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles(options);

  console.log('Files: ');
  files.forEach(file => {
    console.log(file.name)
    if(file.name != `student01@gmail.com/images/`){
      current_user_images_arr.push(path.win32.basename(file.name))
    }
  });

  console.log(current_user_images_arr)
}

// Current user will be able to upload image
export async function uploadImage(){

}

// Current user will be able to delete image from their images folder
export async function deleteImage(){

}


getImages("student01@gmail.com/images/").catch(console.error);