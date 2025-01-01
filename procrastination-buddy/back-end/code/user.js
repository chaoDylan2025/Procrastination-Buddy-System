import dotenv from 'dotenv'
dotenv.config()

import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, onAuthStateChanged, setPersistence } from "firebase/auth"
import { addDoc, collection, doc, getFirestore, getDocs, setDoc } from "firebase/firestore"

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
const firebase = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebase)

// Accesses authentication code
const auth = getAuth()

// Retrieves all documents in 'user-info' collection
const querySnapshot = await getDocs(collection(db, "user-info"))

// Creates a user account
export async function createUser(emailId, password, confirmPassword){
  if(confirmPassword === password){
    try{
      await createUserWithEmailAndPassword(auth, emailId, password)
      return true
    } 
    catch(error){
      const errorMessage = error.message
      return errorMessage
    }
  }

  else{
    // Return error message if confirmation password does not match password
    if(confirmPassword !== password){
      return "Password and confirmation password do not match!"
    }
  }
}

// Logging in the user
export async function userLogin(email, password){
  try{
    await signInWithEmailAndPassword(auth, email, password)
    return true
  } 
  catch (error) {
    const errorMessage = error.message
    return errorMessage
  }
}

// Get the currently signed-in user
export function getSignedInUser(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user.email
    } 
    else {
      return "User is signed out"
    }
  })
}

// Logging the user out
export async function userLogOut(){
  try{
    await signOut(auth)
    return true
  }
  catch (error) {

  }
}

// Delete user account
export async function deleteUserAccount(){
  // Gets the current user
  const user = auth.currentUser

  try{
    await deleteUser(user)
  }
  catch (error){

  }
}