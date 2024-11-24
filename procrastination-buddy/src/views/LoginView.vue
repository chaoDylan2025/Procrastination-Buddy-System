<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const email_id = ref("")
    const user_password = ref("")

    function userEmailEntered() {
        console.log("Current email entered: " + email_id)
    }
</script>

<template>
    <div id="login">
        <div>
            <h3> Login </h3>
            <div id="email-login">
                <label>Email:</label>
                <input type="text" id="email_login" v-model="email_id"/>
            </div>
            <div id="password-login">
                <label>Password:</label>
                <input type="password" id="password-login" v-model="user_password">
            </div>
            <input type="submit" value="Sign in" />
            <RouterLink to="/SignUp">
                <div id="sign-up">
                    <button id="sign_up"> Sign up </button>
                </div>
            </RouterLink>
        </div>
    </div>
    <button @click="userEmailEntered">{{ email_id }}</button>
</template>

<style lang="css" scoped>
    label{
        display: block;
    }

    input[type='submit'], label {
        margin-top: 15px;
    }

    #login{
        display: flex;
        justify-content: center;
    }

    #sign-up{
        margin-top: 15px;
    }

</style>