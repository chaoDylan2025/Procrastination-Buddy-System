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

    // Navigate to Login page if account creation is valid
    function moveToLoginPage(response){
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
        <div class="mt-5">
            <h3> Sign up for an account </h3>
            <div id="error-msg">
                {{ errorMsg }}
            </div>

            <v-responsive class="mx-auto" max-width="500">
                <p>Email: </p>
                <v-text-field type="email" v-model="user_email"></v-text-field>
            </v-responsive>
            
            <v-responsive class="mx-auto" max-width="500">
                <p>Password: </p>
                <v-text-field type="password" v-model="user_password"></v-text-field>
            </v-responsive>

            <v-responsive class="mx-auto" max-width="500">
                <p>Confirm Password: </p>
                <v-text-field type="password" v-model="confirmPassWord"></v-text-field>
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