<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {useRouter} from 'vue-router'
    import { ref } from 'vue'
    import AuthenticationService from '../services/AuthenticationService'

    const router = useRouter();

    // Reactive elements
    const user_email = ref("")
    const user_password = ref("")
    const confirmPassWord = ref("")
    const errorMsg = ref("")

    // Registers user in database
    async function createUser(){
        await AuthenticationService.createUser({
            email: user_email.value,
            password: user_password.value,
            confirm_password: confirmPassWord.value
        }).then((result) => {
            moveToLoginPage(result.data.status)
        })
    }

    function moveToLoginPage(response){
         // Navigate to Login page if account creation is valid
         if(response == true){
            router.push('/login')
         }
         else{
            errorMsg.value = response
         }
    }

</script>

<template>
    <v-app>
        <h3> Sign up for an account </h3>
        <div id="error-msg">
            {{ errorMsg }}
        </div>

        <div id="sign-up" class="mt-4">
            <div>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" required v-model="user_email">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" required v-model="user_password">
                </div>
                <div>
                    <label for="confirmPassword"> Confirm Password:</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required v-model="confirmPassWord">
                </div>
            </div>
        </div> 

        <div id="sign-up-buttons">
            <RouterLink to="/login">
                <button> Back </button>
            </RouterLink>
            <button @click="createUser"> Confirm </button>
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