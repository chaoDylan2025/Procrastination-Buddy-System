import * as firebaseAuth from "firebase/auth"
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore"
import { db, auth } from "../firebase_setup.js"

// Contains signed-in user's email
var user_email = null

// Set session persistence for logging in
firebaseAuth.setPersistence(auth, firebaseAuth.browserLocalPersistence)
  .then(() => {
    console.log("Persistence has been set...")
    return signInWithEmailAndPassword(auth, email, password)
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

// Checks if the user is currently signed in
firebaseAuth.onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is currently logged in...")
      user_email = auth.currentUser.email
      return user_email
    } 
    else {
      console.log("User is not logged in...")
    }
})


// Retrieves all documents in 'user-info' collection
const querySnapshot = await getDocs(collection(db, "user-info"))

// Creates a user account
export async function createUser(emailId, password, confirmPassword){
  if(confirmPassword === password){
    try{
      await firebaseAuth.createUserWithEmailAndPassword(auth, emailId, password)
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
    await firebaseAuth.signInWithEmailAndPassword(auth, email, password)
    return true
  } 
  catch (error) {
    const errorMessage = error.message
    return errorMessage
  }
}

// Get the currently signed-in user
export function getSignedInUser(){
  if(user_email != null){
    return user_email
  }
  else{
    return null
  }
}

// Logging the user out
export async function logout(){
  try{
    // Calls method that signs out the user
    await firebaseAuth.signOut(auth)
    user_email = null
    return true
  }
  catch (error) {
    return error
  }
}

// Delete user account
export async function deleteUserAccount(){
  // Gets the current user
  const user = auth.currentUser

  try{
    // Calls method that deletes user account
    await firebaseAuth.deleteUser(user)
    return true
  }
  catch(error){
    console.log(error)
  }
}