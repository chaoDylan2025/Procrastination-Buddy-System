<script>

</script>

<template>
    <div class="login">
        <div id="email-login">
            <label>Email:</label>
            <input type="text" id="email_login">
        </div>
        <div id="password-login">
            <label>Password:</label>
            <input type="password" id="password-login">
        </div>

        <input type="submit" value="Sign in" />
    </div>

    <div id="sign-up">
        <button id="sign_up"> Sign up </button>
    </div>

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
    }

</style>