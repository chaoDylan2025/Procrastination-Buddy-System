<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import AuthenticationService from '../services/AuthenticationService'
</script>

<template>
    <v-container>
        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Change Email Address </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Change Password </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Delete Account </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Logout </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>


</template>