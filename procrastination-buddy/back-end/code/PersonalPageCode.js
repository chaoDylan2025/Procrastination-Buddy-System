import { Client, Account, Storage } from 'appwrite'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client()

client
  .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECTID)

const storage = new Storage(client)

// Default images for every users' personal motivational page
export var default_images = [
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6f7d001720a03470/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6fb6000e8d47eff0/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6f570012e02c03a9/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6f860029724a8f60/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6fa4001f7705e6a4/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6fd70003a7ebedab/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6fcf00240d5abca1/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba701d0011c7544c9e/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba7013002aa90e2cf2/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba700b0034aac1f9a7/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6ffc0025e81c929a/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
  `${process.env.APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/67ba6fdf0024377f49ba/view?project=${process.env.APPWRITE_PROJECTID}&mode=admin`,
]

// Contains every file id and source of all images
export var images_arr = []

// Collect all bucket images
await storage.listFiles(
  process.env.APPWRITE_BUCKETID
).then((list) => {
  getAllImages(list.files)
})

// Get all images from the Appwrite bucket
function getAllImages(files){
  files.forEach((e) => {
    images_arr.push({file_id: e.$id, src: storage.getFilePreview(process.env.APPWRITE_BUCKETID, e.$id)})
  })
}

// Download an image from the Appwrite bucket
export async function downloadImage(file_id){
  try{
    // Contains URL that allows download
    const result = storage.getFileDownload(process.env.APPWRITE_BUCKETID, file_id)
    return result
  }
  catch (error){
    console.log(error)
  } 
}