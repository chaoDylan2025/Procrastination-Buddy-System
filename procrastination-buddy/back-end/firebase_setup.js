import dotenv from 'dotenv'
dotenv.config()

import { initializeApp } from "firebase/app"
import * as firebaseAuth from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebase)

// Accesses authentication code
export const auth = firebaseAuth.getAuth()