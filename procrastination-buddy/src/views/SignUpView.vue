<script setup>
    import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <h3> Sign up for an account </h3>
    <div id="sign-up">
        <form action="" method="get">
        <div id="error">
        </div>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" required>
        </div>
        <div>
            <label for="email">Password:</label>
            <input id="password" name="password" type="password" required>
        </div>
        <div>
            <label for="email"> Confirm Password:</label>
            <input id="password" name="password" type="password" required>
        </div>
        </form> 
    </div>

    <div id="sign-up-buttons">
        <RouterLink to="/login">
            <button> Back </button>
        </RouterLink>
        <RouterLink to="/login">
            <button> Confirm </button>
        </RouterLink>
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