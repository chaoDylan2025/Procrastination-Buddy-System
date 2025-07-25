import * as firebaseAuth from "firebase/auth"
import { auth } from "../firebase_setup.js"

// Contains signed-in user's email
export var user_email = null

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
      console.log("User email: ", user_email)
    } 
    else {
      console.log("User is not logged in...")
    }
})

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
  let displayName = ""
  let user_email = ""

  try{
    await firebaseAuth.signInWithEmailAndPassword(auth, email, password).then(() => {
      let user = auth.currentUser

      displayName = user.displayName == null ? "" : user.displayName
      user_email = user.email

      console.log(`disiplayName: ${displayName} and email: ${email}`)
    })
    return {loggedIn: true, email: user_email, name: displayName}
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

// Send password reset email to user
export function sendPasswordResetEmail(email){
  firebaseAuth.sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("Password reset email has been sent!")
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
}

// Update user's displayed name
export function updateDisplayedName(name){
  firebaseAuth.updateProfile(auth.currentUser, {displayName: name}).then(() => {
    console.log("Displayed name has been updated!")
  })
}