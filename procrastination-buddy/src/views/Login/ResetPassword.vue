<script setup>
    import {useRouter} from 'vue-router'
    import { ref } from 'vue'
    import AuthenticationService from '../../services/AuthenticationService'

    const router = useRouter()

    // Reactive elements
    const user_email = ref("")
    const errorMsg = ref("")

    function sendPasswordResetEmail(){
        if(user_email != ""){
            errorMsg.value = ""
            AuthenticationService.sendPasswordResetEmail({email: user_email.value}).then((result) => {
                moveToLoginPage(result.data.status)
            })
        }
        else{
            errorMsg.value = "Please enter an email"
        }
    }

    // Navigate to Login page if password reset email has been sent
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
            <h3 class="text-center"> Password Reset </h3>
            <h4 class="mt-4 mb-4 text-center"> Enter your email address to be sent a link for resetting your password </h4>
            <div class="mt-4 mb-4 text-center" id="error-msg">
                {{ errorMsg }}
            </div>

            <v-responsive class="mx-auto" max-width="500">
                <p>Email: </p>
                <v-text-field type="email" v-model="user_email"></v-text-field>
            </v-responsive>

            <v-container>
                <v-row justify="center" no-gutters>
                    <v-btn to="/login" class="mx-8">
                        Back
                    </v-btn>
                    <v-btn @click="sendPasswordResetEmail()" class="mx-8">
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