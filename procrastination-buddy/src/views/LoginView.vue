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
    <div class="mt-5">
        <div>
            {{ errorMsg }}
        </div>
        <h3 class="text-center"> Login </h3>
        
        <br>
        <v-responsive class="mx-auto" max-width="500">
            <p>Email:</p>
            <v-text-field type="email"></v-text-field>
        </v-responsive>

        <v-responsive class="mx-auto" max-width="500">
            <p>Password:</p>
            <v-text-field type="password"></v-text-field>
        </v-responsive>

        <div class="justify-center">
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
    #sign-in{
        margin-top: 15px;
    }

    #sign-up{
        margin-top: 15px;
    }

</style>