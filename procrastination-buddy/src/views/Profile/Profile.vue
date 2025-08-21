<script setup>
import { ref, onMounted } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'
import { userStore } from '../../stores/user'

// Importing components
import ChangeName from '../../components/Profile/ChangeName.vue'
import ChangeEmail from '../../components/Profile/ChangeEmail.vue'
import ChangePassword from '../../components/Profile/ChangePassword.vue'
import DeleteAccount from '../../components/Profile/DeleteAccount.vue'

var open_name_change_dialog = ref(false)
var open_email_change_dialog = ref(false)
var open_change_password_dialog = ref(false)
var open_delete_account_dialog = ref(false)

var current_name_displayed = ref("")

const user = userStore()

current_name_displayed.value = user.name == "" ? "Please enter a proper name" : user.name

/**
 * Change the current user's displayed name
 * 
 * @param status - Closes the dialog for changing display name
 * @param name - New display name
 */
function changeUserName(status, name){
    if(name != ""){
        AuthenticationService.updateName({name: name}).then((result) => {
            if(result){
                user.name = name, current_name_displayed.value = user.name
                open_name_change_dialog.value = status
            }
        })
    }
}

/**
 * Change the user's current password
 * 
 * @param status - Closes the dialog for changing password
 * @param current_password - Current user's original password
 * @param new_password - New password for current user
 * @param reenter_new_password - Confirms new password to change to for current user
 */
function changePassword(status, current_password, new_password, reenter_new_password){
    if(reenter_new_password != new_password){
        console.log("New passwords do not match...")
    }
    else{
        let credentials = {email: user.email, current_password: current_password, new_password: new_password}

        AuthenticationService.changePassword(credentials).then((result) => {
            if(result){
                open_change_password_dialog.value = status
            }
        })
    }
}

/**
 * Change the user's email address
 * 
 * @param status - Closes the dialog for changing current user's email
 * @param email - New email address for current user
 */
function changeEmail(status, email){
    AuthenticationService.changeEmail({email: email}).then((result) => {
        if(result.data.status){
            open_email_change_dialog.value = status
            alert("A confirmation link has been sent to your new email. Please verify to complete the change.")
        }
    })
}
</script>

<template>
    <v-container>
        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-row class="mb-4">
                    <v-row>
                        <v-col>
                            <div class="text-h6 font-weight-black">
                                Name:
                            </div>
                        </v-col>
                    </v-row>
               
                    <v-row>
                        <v-col cols="auto">
                           <div style="width: auto;">
                                {{current_name_displayed}}
                           </div> 
                        </v-col>
                        <v-col>
                            <v-btn class="ml-16" size="x-small" @click="open_name_change_dialog = true"> Change </v-btn>
                        </v-col>
                    </v-row>
                </v-row>

                <v-row>
                    <v-row>
                        <v-col>
                            <div class="text-h6 font-weight-black">
                                Email:
                            </div>
                        </v-col>
                    </v-row>
               
                    <v-row>
                        <v-col cols="auto">
                           <div style="width: auto;">
                                {{user.email}}
                           </div> 
                        </v-col>
                        <v-col>
                            <v-btn class="ml-16" size="x-small" @click="open_email_change_dialog = true"> Change </v-btn>
                        </v-col>
                    </v-row>
                </v-row>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" @click="open_change_password_dialog = true"> Change Password </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" @click="open_delete_account_dialog = true"> Delete Account </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>

    <v-container>
        <ChangeName :open_name_change_dialog="open_name_change_dialog" @close="(state) => open_name_change_dialog = state" 
            @update="changeUserName"/>
        <ChangeEmail :open_change_email_dialog="open_email_change_dialog" @close="(state) => open_email_change_dialog = state" 
            @change="changeEmail"/>
        <ChangePassword :open_change_password_dialog="open_change_password_dialog" @close="(state) => open_change_password_dialog = state" 
            @change="changePassword"/>
        <DeleteAccount :open_delete_account_dialog="open_delete_account_dialog" @close="(state) => open_delete_account_dialog = state"/>
    </v-container>
</template>