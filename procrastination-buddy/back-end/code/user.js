import * as firebaseAuth from "firebase/auth"
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db, auth } from "../firebase_setup.js"

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
    } 
    else {
      console.log("User is not logged in...")
    }
})

/**
 * Creates a user account
 * 
 * @param emailId - User's email 
 * @param password - New user's password
 * @param confirm_password - Confirms new user's password before creating account
 */
export async function createUser(emailId, password, confirm_password){
  if(confirm_password === password){
    try{
      await firebaseAuth.createUserWithEmailAndPassword(auth, emailId, password)

      // Assign default data to the new user
      await setDoc(doc(db, "users", emailId), {})
      await setDoc(doc(db, "users", emailId, "focus-list", "restricted_sites"), {list: []})

      return true
    } 
    catch(error){
      const errorMessage = error.message
      return errorMessage
    }
  }
  else{
    // Return error message if confirmation password does not match password
    if(confirm_password !== password){
      return "Password and confirmation password do not match!"
    }
  }
}

/**
 * Logging in the user
 * 
 * @param email - Entered email
 * @param password - Entered password
 */
export async function login(email, password){
  let display_name = ""
  let user_email = ""

  try{
    await firebaseAuth.signInWithEmailAndPassword(auth, email, password).then(() => {
      let user = auth.currentUser

      display_name = user.displayName == null ? "" : user.displayName
      user_email = user.email

      console.log(`disiplayName: ${display_name} and email: ${email}`)
    })
    return {loggedIn: true, email: user_email, name: display_name}
  } 
  catch (error) {
    const errorMessage = error.message
    return errorMessage
  }
}

/**
 * Get the current signed-in user
 */
export function getUser(){
  if(user_email != null){
    return user_email
  }
  else{
    return null
  }
}

/**
 * Log user out
 */
export async function logout(){
  try{
    await firebaseAuth.signOut(auth)
    user_email = null
    return true
  }
  catch (error) {
    return error
  }
}

/**
 * Delete account
 * 
 * @param email - Current user's email address
 * @param current_password - Current user's password
 */
export async function deleteUserAccount(email, password){
  let authCredentials = firebaseAuth.EmailAuthProvider
  authCredentials = authCredentials.credential(email, password)

  try{
    if(authCredentials){
      let user = auth.currentUser

      // Delete user from database
      await deleteDoc(doc(db, "users", email))
      await firebaseAuth.deleteUser(user)

      return true
    }
    else{
      return false
    }
  } catch(error){
    console.log(error)
  }
}

/**
 * Send reset password email to user
 * 
 * @param email - Current user's email
 */
export function sendPasswordResetEmail(email){
  firebaseAuth.sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("Password reset email has been sent!")
  })
  .catch((error) => {
    console.log(error.code)
    console.log(error.message)
  })
}

/**
 * Changes user password if current password is entered correctly
 * 
 * @param email - Current user's email 
 * @param current_password - Current user's password 
 * @param new_password - New password for account
 */
export async function changePassword(email, current_password, new_password){
  try{
    let authCredentials = firebaseAuth.EmailAuthProvider.credential(email, current_password)
    let current_user = auth.currentUser

    await firebaseAuth.reauthenticateWithCredential(current_user, authCredentials)
    await firebaseAuth.updatePassword(current_user, new_password)

    console.log("Password has been successfully changed...")

    return true
  } catch (error) {
    return error.code
  }
}

/**
 * Change user email once user has verified email
 * 
 * @param email - New email for current user
 */
export async function changeEmail(old_email, email){
  firebaseAuth.verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
    console.log("New email has been verified...")
  })

  console.log("New email: ", email)

  let old_doc_exists= await getDoc(doc(db, "users", old_email))
  let original_focus_list_data = await getDocs(collection(db, "users", old_email, "focus-list"))
  let original_motivational_page_data = await getDocs(collection(db, "users", old_email, "personal-motivational-page")) 

  if(old_doc_exists.exists()){
    for(const docSnap of original_focus_list_data.docs){
      const data = docSnap.data()
      const new_doc_focus_list_source = doc(db, "users", email, "focus-list", docSnap.id)
      await setDoc(new_doc_focus_list_source, data)
    }
    for(const docSnap of original_motivational_page_data.docs){
      const data = docSnap.data()
      const new_doc_motivational_page_source = doc(db, "users", email, "personal-motivational-page", docSnap.id)
      await setDoc(new_doc_motivational_page_source, data)
    }

    await deleteDoc(doc(db, "users", old_email))
  }
}

/**
 * Update user's displayed name
 * 
 * @param name - New display name for current user 
 */
export function updateDisplayedName(name){
  firebaseAuth.updateProfile(auth.currentUser, {displayName: name}).then(() => {
    console.log("Displayed name has been updated!")
  })
}