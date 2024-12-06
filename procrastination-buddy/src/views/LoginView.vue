<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {useRouter} from 'vue-router'
    import router from '../router/index'
    import { ref, onMounted } from 'vue'
    import AuthenticationService from '../services/AuthenticationService'

    import { userStore } from "../stores/user";

    const user = userStore()

    const user_email = ref("")
    const user_password = ref("")
    const errorMsg = ref("")

    // Registers user in database
    async function logUser(){
        await AuthenticationService.loginUser({
            email: user_email.value,
            password: user_password.value
        }).then((result) => {
            console.log(result)
            moveToHomePage(result.data.status)
        })
    }

    function moveToHomePage(response){
         // Navigate to Home page if user is logged in
         if(response == true){
            user.isLoggedIn = true
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
            <v-text-field type="email" v-model="user_email"></v-text-field>
        </v-responsive>

        <v-responsive class="mx-auto" max-width="500">
            <p>Password:</p>
            <v-text-field type="password" v-model="user_password"></v-text-field>
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

        </v-container>
    </div>
</template>