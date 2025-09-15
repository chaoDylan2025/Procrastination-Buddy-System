<script setup>
import {useRouter} from 'vue-router'
import { ref, onMounted } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'
import { userStore } from '../../stores/user'

// Importing components
import ChangeName from '../../components/Profile/ChangeName.vue'
import ChangePassword from '../../components/Profile/ChangePassword.vue'
import DeleteAccount from '../../components/Profile/DeleteAccount.vue'

var open_name_change_dialog = ref(false)
var open_change_password_dialog = ref(false)
var open_delete_account_dialog = ref(false)

var current_name_displayed = ref("")

const router = useRouter()
const user = userStore()

current_name_displayed.value = user.name == "" ? "Please enter a proper name" : user.name

/**
 * Change the current user's displayed name
 * 
 * @param name - New display name
 */
function changeUserName(name){
    if(name != ""){
        AuthenticationService.updateName({name: name}).then((result) => {
            if(result.data){
                user.name = name, current_name_displayed.value = user.name
                open_name_change_dialog.value = false
            }
        })
    }
}

/**
 * Delete the user from the database and redirect them to home page
 * 
 * @param password - Current user's password
 */
 async function deleteUser(password){
    await AuthenticationService.deleteAccount({email: user.email, password: password}).then((result) => {
        open_delete_account_dialog.value = false

        // Redirect user to homepage
        if(result.data){
            user.email = null
            user.isLoggedIn = false
            router.push('/')
        }
    })
 }

/**
 * Redirect user to login page after password change
 */
async function changePassword(){
    await AuthenticationService.logoutUser().then((result) => {
        if(result.data){
            open_change_password_dialog.value = false

            user.name = ""
            user.email = null
            user.isLoggedIn = false
            
            router.push('/login')
        }
    })
}

onMounted(async () => {
    let result = await AuthenticationService.userIsLoggedIn()

    if(result.data == false){
        user.name = ""
        user.email = null
        user.isLoggedIn = false
        router.push('/')
    }
})
</script>

<template>
    <v-container>
        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <div class="mb-8">
                    <div class="mb-2">
                        <div>
                            <div class="text-h6 font-weight-black">
                                Name:
                            </div>
                        </div>
                    </div>
               
                    <div class="d-flex justify-space-between">
                        <div>
                            {{current_name_displayed}}
                        </div> 
                        <div>
                            <v-btn class="ml-16" size="x-small" @click="open_name_change_dialog = true"> Change </v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" size="small" @click="open_change_password_dialog = true"> Change Password </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" size="small" @click="open_delete_account_dialog = true"> Delete Account </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>

    <v-container v-show="false">
        <ChangeName :open_name_change_dialog="open_name_change_dialog" @close="open_name_change_dialog = false" 
            @update="changeUserName"/>
        <ChangePassword :open_change_password_dialog="open_change_password_dialog" @close="open_change_password_dialog = false" 
            @change="changePassword"/>
        <DeleteAccount :open_delete_account_dialog="open_delete_account_dialog" @close="open_delete_account_dialog = false"
            @delete="deleteUser"/>
    </v-container>
</template>