import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase_setup.js"
import { user_email } from "./user.js"

// Reference and snapshot for current document
var docRef = ""
var docSnap = ""

/**
 * Get the current user's motivational images and preferred image layout
 */
export async function getImagesAndLayout(){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "personal-motivational-page", "current_images")
        docSnap = await getDoc(docRef)
        return {layout: docSnap.data().image_layout, images: docSnap.data().images}
    }
}

/**
 * Provides default motivational images for new user
 * 
 * @param images - Default motivational images 
 */
export async function setDefaultImages(email, images){
    await setDoc(doc(db, "users", email, "personal-motivational-page", "current_images"), {image_layout: 4, images: images}).then(() => {
        return true
    })
}

/**
 * Update the current user's motivational images and preferred image layout
 * 
 * @param image_layout - Current user's new preferred image layout
 * @param images - Current user's new motivational images
 */
export async function updateImagesAndLayout(image_layout, images){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "personal-motivational-page", "current_images")
        docSnap = await updateDoc(docRef, {
            image_layout: image_layout,
            images: images
        })
        return true
    }
    else{
        return false
    }
}