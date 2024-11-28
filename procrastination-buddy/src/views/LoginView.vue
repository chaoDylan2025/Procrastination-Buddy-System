<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {useRouter} from 'vue-router'
    import { ref, onMounted } from 'vue'
    import AuthenticationService from '../services/AuthenticationService'

    const router = useRouter();

    const user_email = ref("")
    const user_password = ref("")
    const errorMsg = ref("")

    // Registers user in database
    async function logUser(){
        await AuthenticationService.loginUser({
            email: user_email.value,
            password: user_password.value
        }).then((result) => {
            console.log(result.data.status)
            moveToHomePage(result.data.status)
        })
    }

    function moveToHomePage(response){
         // Navigate to Home page if user is logged in
         if(response == "Login confirmed!"){
            router.push('/')
         }
         else{
            errorMsg.value = response
         }
    }
</script>

<template>
    <div id="login">
        <div id="error-msg">
            {{ errorMsg }}
        </div>
        <div>
            <h3> Login </h3>
            <div id="email-login">
                <label>Email:</label>
                <input type="text" id="email_login" v-model="user_email">
            </div>
            <div id="password-login">
                <label>Password:</label>
                <input type="password" id="password-login" v-model="user_password">
            </div>
            <button id="sign-in" @click="logUser">
                Sign in
            </button>
            <RouterLink to="/SignUp">
                <div id="sign-up">
                    <button id="sign_up"> Sign up </button>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="css" scoped>
    label{
        display: block;
    }

    #login{
        display: flex;
        justify-content: center;
    }

    #sign-in{
        margin-top: 15px;
    }

    #sign-up{
        margin-top: 15px;
    }

</style>