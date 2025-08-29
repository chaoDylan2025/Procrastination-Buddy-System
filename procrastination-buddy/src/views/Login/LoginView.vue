<script setup>
import router from '../../router/index'
import { ref, onMounted } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'
import { userStore } from "../../stores/user"
import { current_error_msg_display, error_msg_display_style, generateErrorMsg } from "../../frontend-code/generate_error_codes"

const user = userStore()

const user_email = ref("")
const user_password = ref("")
const errorMsg = ref("")

/**
 * Registers user in database
 */
async function logUser(){
    await AuthenticationService.loginUser({
        email: user_email.value,
        password: user_password.value
    }).then((result) => {
        moveToHomePage(result.data)
    })
}

/**
 * Navigate to Home Page if user is logged in
 * 
 * @param result - Data from ExpressJS server
 */
function moveToHomePage(result){
    if(result.status == true){
        user.email = result.email
        user.name = result.name
        user.isLoggedIn = true
        router.push('/')
    }
    else{
        errorMsg.value = result

        generateErrorMsg(errorMsg.value)
    }
}

/**
 * Generate an error message based on Firebase error code
 * 
 * @param errorCode - Firebase error code
 */
function generateErrorMsg(errorCode){
    if(errorCode == "Firebase: Error (auth/invalid-credential)."){
        errorMsg.value = "Wrong Email or Password"
    }
    current_error_msg_display.value = error_msg_display_style
}

/**
 * Remove styling for error message display area
 */
function removeErrorMsgDisplay(){
    errorMsg.value = ""
    current_error_msg_display.value = ""
}
</script>

<template>
    <div class="mt-5">
        <h3 class="text-center"> Login </h3>
        <br>

        <!-- Login error message -->
        <div :class="current_error_msg_display" style="color: red">
            {{ errorMsg }}
        </div>

        <v-responsive class="mx-auto" max-width="500">
            <p>Email:</p>
            <v-text-field type="email" v-model="user_email" @click="removeErrorMsgDisplay"></v-text-field>
        </v-responsive>

        <v-responsive class="mx-auto" max-width="500">
            <p>Password:</p>
            <v-text-field type="password" v-model="user_password" @click="removeErrorMsgDisplay"></v-text-field>
        </v-responsive>

        <v-container>
            <v-row justify="center" no-gutters>
                <v-btn @click="logUser">
                    Sign in
                </v-btn>
            </v-row>
            
            <v-row class="mt-10" justify="center" no-gutters>
                <v-btn to="/SignUp">
                    Sign up
                </v-btn>
            </v-row>

            <v-row class="mt-10" justify="center" no-gutters>
                <v-btn to="/Password-reset">
                    Reset Password
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>