import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase_setup.js"
import { user_email } from "./user.js"

var docRef = ""
var docSnap = ""

export async function getImagesAndLayout(){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "personal-motivational-page", "current_images")
        docSnap = await getDoc(docRef)
        return {layout: docSnap.data().image_layout, images: docSnap.data().images}
    }
}

export async function setDefaultImages(images){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "personal-motivational-page", "current_images")
        docSnap = await updateDoc(docRef, {
            images: images
        })
        return true
    }
    return false
}