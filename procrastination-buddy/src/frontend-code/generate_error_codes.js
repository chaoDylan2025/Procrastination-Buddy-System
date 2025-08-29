import { ref } from "vue"

export var current_error_msg_display = ref("")
export var error_msg_display_style = "mb-5 text-center"

/**
 * Generate an error message based on Firebase error code
 * 
 * @param errorCode - Firebase error code
 */
export function generateErrorMsg(errorCode){
    if(errorCode == "Firebase: Error (auth/invalid-credential)."){
        errorMsg.value = "Wrong Email or Password"
    }
    current_error_msg_display.value = error_msg_display_style
}

