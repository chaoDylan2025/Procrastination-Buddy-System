import { Client, Account, Storage } from 'appwrite'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client()

client
  .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECTID)

const storage = new Storage(client)

// To-do: Add default images to the array and replace any sensitive information with dotenv variables
// Default Images for every users' personal motivational page
var default_images = [
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

// Contains image ids
var images_arr = []
// Contains file preview images
export var images_src_arr = []

// Collect all bucket images
await storage.listFiles(
  process.env.APPWRITE_BUCKETID
).then((list) => {
  getFileIDs(list.files)
  getImageSrcs()
})

// Get all file preview images
function getImageSrcs(){
  images_arr.forEach((e) => {
    let result = storage.getFilePreview(process.env.APPWRITE_BUCKETID, e)
    images_src_arr.push(result)
  })
}

// Get all image file ids
function getFileIDs(file_list){
  file_list.forEach((e) => {
    images_arr.push(e.$id)
  })
}

// Download an image from the Appwrite bucket
function downloadImage(file_id){
  storage.getFileDownload(process.env.APPWRITE_BUCKETID, file_id);
}