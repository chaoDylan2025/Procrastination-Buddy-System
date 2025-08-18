import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase_setup.js"
import { user_email } from "./user.js"

// Reference and snapshot for current document
var docRef = ""
var docSnap = ""

/**
 * Get the current user's restricted sites list 
 */
export async function getRestrictedSitesList(){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "focus-list", "restricted_sites")
        docSnap = await getDoc(docRef)
        return docSnap.data()
    }
}

/**
 * Update the current user's restricted sites list
 * 
 * @param site_list - New restricted sites list
 */
export async function setRestrictedSiteList(site_list){
    if (user_email != null){
        docRef = doc(db, "users", user_email, "focus-list", "restricted_sites")
        docSnap = await updateDoc(docRef, site_list)
        return true
    }
    return false
}