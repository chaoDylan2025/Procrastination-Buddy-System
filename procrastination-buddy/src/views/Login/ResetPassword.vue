<script setup>
import {useRouter} from 'vue-router'
import { ref } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'

const router = useRouter()
const default_msg = "Enter your email address to be sent a link for resetting your password"

var user_email = ref("")
var currentMsg = ref(default_msg)
var currentMsgStyle = ref("")
var error_msg_styling = "color: red;"

/**
 * Sends an email to current user for resetting their password
 */
function sendPasswordResetEmail(){
    if(user_email.value != ""){
        AuthenticationService.sendPasswordResetEmail({email: user_email.value}).then((result) => {
            moveToLoginPage(result.data)
        })
    }
    else{
        currentMsg.value = "Please enter an email"
        currentMsgStyle.value = error_msg_styling
    }
}

/**
 * Navigate to Login page if password reset email has been sent
 * 
 * @param result - Data from ExpressJS server  
 */
function moveToLoginPage(result){
    if(result == true){
        router.push('/login')
    }
}

/**
 * Reset error message styling
 */
function resetErrorMsgStyle(){
    currentMsg.value = default_msg
    currentMsgStyle.value = ""
}
</script>

<template>
    <v-app>
        <div class="mt-5">
            <h3 class="text-center"> Password Reset </h3>
            <h4 class="mt-4 mb-4 text-center" :style="currentMsgStyle"> {{ currentMsg }} </h4>

            <v-responsive class="mx-auto" max-width="500">
                <p>Email: </p>
                <v-text-field type="email" v-model="user_email" @click="resetErrorMsgStyle"></v-text-field>
            </v-responsive>

            <v-container>
                <v-row justify="center" no-gutters>
                    <v-btn size="small" to="/login" class="mx-8">
                        Back
                    </v-btn>
                    <v-btn size="small" @click="sendPasswordResetEmail()" class="mx-8">
                        Confirm
                    </v-btn>
                </v-row>
            </v-container>
        </div>
    </v-app>
</template>

<style lang="css" scoped>
label{
    display: block;
}

input[type='submit'], label {
    margin-top: 15px;
}

#sign-up{
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

#sign-up-buttons{
    margin-top: 15px;
    display: flex;
    justify-content: center;
    button{
        margin-right: 25px;
        margin-left: 25px;
    }
}

h3{
    display: flex;
    justify-content: center;
}
</style>