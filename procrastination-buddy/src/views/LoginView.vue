<script setup>
    import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div id="login">
        <div>
            <h3> Login </h3>
            <div id="email-login">
                <label>Email:</label>
                <input type="text" id="email_login">
            </div>
            <div id="password-login">
                <label>Password:</label>
                <input type="password" id="password-login">
            </div>
            <input type="submit" value="Sign in" />
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