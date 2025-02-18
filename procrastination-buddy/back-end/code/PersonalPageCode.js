import { Client, Account, Storage } from 'appwrite'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client()

client
  .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECTID)

const storage = new Storage(client)

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