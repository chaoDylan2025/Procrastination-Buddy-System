<script setup>
import {useRouter} from 'vue-router'
import { ref } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'
import { default_imgs } from '../../frontend-code/image_functions'
import { current_error_msg_display, errorMsg, generateErrorMsg, removeErrorMsgDisplay } from "../../frontend-code/generate_error_codes"


const router = useRouter()

const user_email = ref("")
const user_password = ref("")
const confirmPassWord = ref("")

/**
 * Registers user in database
 */
async function createUser(){
    await AuthenticationService.createUser({
        email: user_email.value,
        password: user_password.value,
        confirm_password: confirmPassWord.value
    }).then((result) => {
        moveToLoginPage(result.data)
    })
}

/**
 * Navigate to Login page if account creation is valid
 * 
 * @param response - Data from ExpressJS server
 */
async function moveToLoginPage(response){
    if(response.status == true){
        await AuthenticationService.settingDefaultImages({email: response.email, default_imgs: default_imgs.value}).then(() => {
            router.push('/login')
        })
    }
    else{
        errorMsg.value = response

        generateErrorMsg(errorMsg.value)
    }
}
</script>

<template>
    <v-app>
        <div class="mt-5">
            <h3> Sign up for an account </h3>

            <!-- Signup Error Messages -->
            <div :class="current_error_msg_display" style="color: red;">
                {{ errorMsg }}
            </div>

            <v-responsive class="mx-auto" max-width="500">
                <p>Email: </p>
                <v-text-field type="email" v-model="user_email" @click="removeErrorMsgDisplay"></v-text-field>
            </v-responsive>
            
            <v-responsive class="mx-auto" max-width="500">
                <p>Password: </p>
                <v-text-field type="password" v-model="user_password" @click="removeErrorMsgDisplay"></v-text-field>
            </v-responsive>

            <v-responsive class="mx-auto" max-width="500">
                <p>Confirm Password: </p>
                <v-text-field type="password" v-model="confirmPassWord" @click="removeErrorMsgDisplay"></v-text-field>
            </v-responsive>

            <v-container>
                <v-row justify="center" no-gutters>
                    <v-btn to="/login" class="mx-8">
                        Back
                    </v-btn>
                    <v-btn @click="createUser" class="mx-8">
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