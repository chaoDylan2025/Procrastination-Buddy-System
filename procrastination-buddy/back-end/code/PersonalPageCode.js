// Path to Cloud Storage bucket
const bucketName = 'user_motivational_content'

// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage'

// Creates a client
const storage = new Storage()

// Array of image files
var current_images_arr = []

// Retrieves images of current user
export async function getImages() {
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles()

  // Fill up array if it is empty
  if(current_images_arr.length == 0){
    // Iterates through each image of current user
    files.forEach(file => {
      let file_path = `https://storage.googleapis.com/${bucketName}/${file.name}`
      current_images_arr.push(file_path)
    });
  }
  return current_images_arr
}