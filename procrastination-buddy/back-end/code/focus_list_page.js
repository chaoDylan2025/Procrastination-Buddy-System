import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase_setup.js"
import { user_email } from "./user.js"

var docRef = ""
var docSnap = ""

export async function getRestrictedSitesList(){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "focus-list", "restricted_sites")
        docSnap = await getDoc(docRef)
        return docSnap.data()
    }
}

export async function setRestrictedSiteList(website){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "focus-list", "restricted_sites")
        docSnap = await updateDoc(docRef, website)
        return true
    }
    return false
}