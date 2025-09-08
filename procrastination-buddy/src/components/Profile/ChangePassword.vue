<script setup>
import { ref } from 'vue'
import { userStore } from '../../stores/user'
import AuthenticationService from '../../services/AuthenticationService'

const props = defineProps({
    open_change_password_dialog: Boolean
})

const user = userStore()

const emit = defineEmits(['close', 'change'])

var current_password = ref("")
var new_password = ref("")
var reenter_new_password = ref("")

var showCurrentPassword = ref(false)
var showNewPassword = ref(false)
var showReenteredPassword = ref(false)

var currentMsg = ref("")
var currentMsgStyle = ref("")
var error_msg_styling = "color: red;"

/**
 * Exits the dialog for changing current user's password
 */
function exitDialogModal(){
    emit('close', false)
}

/**
 * Changes the current user's password
 */
function changePassword(){
    if(current_password.value == ""){
        currentMsg.value = "Enter your current password"
        currentMsgStyle.value = error_msg_styling
    }
    else if(new_password.value == ""){
        currentMsg.value = "Enter your new password"
        currentMsgStyle.value = error_msg_styling
    }
    else if(reenter_new_password.value == ""){
        currentMsg.value = "Re-enter your new password"
        currentMsgStyle.value = error_msg_styling
    }
    else if(new_password.value != reenter_new_password.value){
        currentMsg.value = "New password and re-entered password do not match!"
        currentMsgStyle.value = error_msg_styling
    }
    else{
        AuthenticationService.changePassword({email: user.email, current_password: current_password.value, 
            new_password: new_password.value}).then((result) => {
                if(result.data == true){
                    emit('change', false)
                }
                else{
                    currentMsg.value = generateErrorMsg(result.data)
                    currentMsgStyle.value = error_msg_styling
                }
        })
    }
}

/**
 * Generate an error message based on error code
 * 
 * @param error_code - Firebase Auth Error Code
 */
function generateErrorMsg(error_code){
    if(error_code == "auth/weak-password"){
        return "New password is too weak"
    }
    else if(error_code == "auth/invalid-credential"){
        return "Wrong entered password"
    }
}

/**
 * Reset error message styling
 */
function resetErrorMsgStyle(){
    currentMsg.value = ""
    currentMsgStyle.value = ""
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_change_password_dialog"
            height="500"
            width="500"
        >
            <v-card>
                <h2 class="mt-8 text-center"> Change your current password </h2>

                <h4 class="mt-4 mb-4 text-center" :style="currentMsgStyle"> {{ currentMsg }} </h4>

                <!-- Enter current password -->
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                        class="mx-auto"
                        m-height="345"
                    >
                        <v-text-field v-model="current_password" 
                        :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click="resetErrorMsgStyle"
                        @click:append="showCurrentPassword = !showCurrentPassword"
                        label="Current password"></v-text-field>
                    </v-responsive>
                </v-row>

                <!-- Enter new password -->
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                        class="mx-auto"
                        m-height="345"
                    >
                        <v-text-field v-model="new_password" 
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNewPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click="resetErrorMsgStyle"
                        @click:append="showNewPassword = !showNewPassword"
                        label="Enter new password"></v-text-field>
                    </v-responsive>
                </v-row>

                <!-- Reenter new password -->
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                        class="mx-auto"
                        m-height="345"
                    >
                        <v-text-field 
                        v-model="reenter_new_password" 
                        :append-icon="showReenteredPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showReenteredPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click="resetErrorMsgStyle"
                        @click:append="showReenteredPassword = !showReenteredPassword"
                        label="Re-enter new password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal">Back</v-btn>
                    <v-btn @click="changePassword">Confirm</v-btn>
                </v-card-actions> 
            </v-card>
        </v-dialog>
    </v-app>
</template>