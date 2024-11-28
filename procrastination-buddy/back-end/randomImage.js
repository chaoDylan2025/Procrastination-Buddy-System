// The ID of your GCS bucket
const bucketName = 'user_motivational_content';

// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';

// Creates a client
const storage = new Storage();

async function listFiles() {
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles();

  console.log('Files:');
  files.forEach(file => {
    console.log(file.name);
  });
}

listFiles().catch(console.error);

// File Path to images for every User
// [user_email]/images